
// $.extend(true, $.autoCombo, {
// 	defaultConfig: {
// 		view: {
// 			isSelectedFirstRow: false
// 		}
// 	}
// });


/**
 * denpendence: [AutoCombobox]
 */
var App = App || {}, AutoComboboxUtil = {

    /**
     * 下拉框简单配置
     */
    selectSimpleConfig: {
        view: {
            colModels: [
                {name: "name", label: "", align: "left"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                //联想控件输入框 和 "三个点"，被父<label>包着。
                //下拉层的定位参照 是父<label>
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            }
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**
     * 选择渠道联想控件配置
     */
    selPartnerConfig: {
        view: {
            colModels: [
                {name: "name", label: "名称", width: 70, align: 'left'}
            ],
            height: 200,
            singleColumnNotHead: true,
            positionRefer: function () {
                //联想控件输入框 和 "三个点"，被父<label>包着。
                //下拉层的定位参照 是父<label>
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            }
        },
        async: {
            url: App["contextPath"] + "/vop/pnm/partner/partnerSelectExcludeManage.json"
        }
    },

    /**
     * 会计账期联想控件配置
     */
    acctDateConfig: {
        view: {
            colModels: [
                {name: "text", align: 'left', label: "账期"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                //联想控件输入框 和 "三个点"，被父<label>包着。
                //下拉层的定位参照 是父<label>
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            },
            height: 265,
            isSelectedFirstRow: false
        },
        async: {
            //dataSourceType: "local"
            url: App["contextPath"] + "/vop/tsk/autoCombox/getAcctDates.json",
            dataSourceType: "onceRemote"
        }
    },



    /**
     * 记账企业 的联想控件配置
     * @param glDateNameExpression 会计账期名称 元素jQuery表达式（例："#_glDate"）
     * @param afterSelectRowCallback 选中行后的回调方法
     * @returns {{view: {colModels: *[], singleColumnNotHead: boolean, positionRefer: Function}, async: {url: string, dataSourceType: string}, callback: {afterSelectRow: Function, afterInput: Function}}}
     */
    getGlCorpConfig: function (glDateNameExpression, afterSelectRowCallback) {
        return {
            view: {
                colModels: [
                    {name: "corpName", label: "名称", align: 'left'}
                ],
                singleColumnNotHead: true,
                showPager: false,
                positionRefer: function () {
                    //联想控件输入框 和 "三个点"，被父<label>包着。
                    //下拉层的定位参照 是父<label>
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).outerWidth() - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/os/vop/common/enterAcctCorpList.json"/*,
                 dataSourceType: "onceRemote"*/
            },
            callback: {
                afterSelectRow: function (rowData) {
                    var $this = $(this);
                    //验证是否与旧值一样，不一样需清空下级选项
                    if($this.attr('data')!=rowData.corpId){
                        $(glDateNameExpression).attr('data','');
                        $(glDateNameExpression).val('');
                    }
                    //名称 赋值到控件
                    $this.val(rowData.corpName);
                    //异步加载 市 下拉数据
                    AutoComboboxUtil._loadGlDateAutoComboboxData(glDateNameExpression, rowData.corpId, true);
                    //回调
                    if ($.isFunction(afterSelectRowCallback)) {
                        afterSelectRowCallback.call($this, rowData);
                    }
                },
                afterInput: function (event) {
                    var $target = $(event.target);
                    //【重点】当清空值要将填充的值清空
                    if ($target.val().length == 0) {
                        //清空 账期
                        $(glDateNameExpression).val("");
                        $(glDateNameExpression).attr("data","");
                    }
                    if (event.keyCode == 13) {//按回车
                        $(glDateNameExpression).focus();
                    }
                }
            }
        };
    },

    /**
     * （私有）加载 企业账期 数据
     * @param glDateNameExpression
     * @param corpId
     * @param async
     * @private
     */
    _loadGlDateAutoComboboxData: function (glDateNameExpression, corpId, async) {
        //查询 下拉数据
        $.ajax({
            async: async,
            type: "POST",
            url: App["contextPath"] + "/os/vop/common/enterAcctPeriodList.json",
            data: {"corpId": corpId},
            dataType: "json",
            success: function (data) {
                //清空 后再触发下拉动作
                $(glDateNameExpression).AutoCombobox("setLocalData", data).AutoCombobox("triggerAction");
            }
        });
    },

    /**
     * 企业账期 的联想控件配置
     *
     * @param glCorpNameExpression 企业名称 元素jQuery表达式（例："#_glCorp"）
     * @param afterSelectRowCallback 选中行后的回调方法
     * @returns {{view: {colModels: *[], singleColumnNotHead: boolean, page: boolean, positionRefer: Function}, async: {dataSourceType: string}, callback: {beforeAction: Function, afterSelectRow: Function}}}
     */
    getGlDateConfig: function (glCorpNameExpression, afterSelectRowCallback) {
        return {
            view: {
                colModels: [
                    {name: "yearMonth", label: "名称", align: 'left'}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    //联想控件输入框 和 "三个点"，被父<label>包着。
                    //下拉层的定位参照 是父<label>
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth() - 2;
                }
            },
            async: {
                dataSourceType: "local"
            },
            callback: {
                beforeAction: function (event) {
                    var $this = $(this);
                    //如果 企业 是空
                    if ($(glCorpNameExpression).val()) {
                        //并且 账期 的数据也是空
                        if ($this.AutoCombobox("getLocalData").length < 1) {
                            //同步加载 账期 下拉数据
                            AutoComboboxUtil._loadGlDateAutoComboboxData($this, $(glCorpNameExpression).attr('data'), false);
                        }
                        return true;
                    } else {
                        //触发 企业
                        $(glCorpNameExpression).AutoCombobox("triggerAction");
                        return false;
                    }
                },
                afterSelectRow: function (rowData) {
                    var $this = $(this);
                    //名称 赋值到控件
                    $this.val(rowData.yearMonth);
                    //回调
                    if ($.isFunction(afterSelectRowCallback)) {
                        afterSelectRowCallback.call($this, rowData);
                    }
                },
                afterInput: function (event) {
                    var $target = $(event.target);
                    //【重点】当清空值要将填充的值清空
                    if ($target.val().length == 0) {
                        //清空 账期
                        $target.val("");
                        $target.attr("dataYear","");
						$target.attr("dataMonth","");
                    }
                }
            }
        };
    },


    /**
     * 单选框国别下拉控件
     * created by huanglb at 20161103
     */
    areaSingleConfig: {
        view: {
            colModels: [
                {name: "code", align: 'left', label: "Code"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            },
            height: 265,
            isSelectedFirstRow: true,
            isAllowEmpty: false
        },
        async: {
            url: App["contextPath"] + "/vop/bdm/area/getArea.json",
            dataSourceType: "onceRemote"
        }
    },




    /** 币别联想控件配置*/
    currencyAutoComboboxConfig: {
        view: {
            forceHideHead: true,
            isRememberValue: true,
            colModels: [
                {name: "id", isHide: true},
                {name: "currCode", label: $.autoCombo.labelI18n.currCode, align: "left"},
                {name: "currName", label: $.autoCombo.labelI18n.currName, align: "left", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent().parent("div");
            },
            widthRefer: function () {
                return $(this).parent().parent("div").outerWidth(true) - 2;
            }
        },
        async: {
            dataSourceType: "onceRemote",
            url: App["contextPath"] + "/acct/setup/getCurrencyAutoComboData.json"
        }
    },


    /** 科目体系联想控件配置*/
    acctRuleAutoComboboxConfig: {
        view: {
            forceHideHead: true,
            isRememberValue: true,
            singleColumnNotHead: true,
            colModels: [
                {name: "id", isHide: true},
                {name: "code", label: $.autoCombo.labelI18n.codeCol},
                {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left"}
            ],
            positionRefer: function () {
                return $(this).parent().parent("div");
            },
            widthRefer: function () {
                return $(this).parent().parent("div").outerWidth(true) - 2;
            }
        },
        async: {
            dataSourceType: "onceRemote",
            url: App["contextPath"] + "/acct/setup/getAcctRuleAutoComboData.json"
        }
    },

    /** 会计科目联想控件配置()*/
    acctSubjectAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "id", isHide: true},
                {name: "subjectTypeItemStr", label: $.autoCombo.labelI18n.AcctSubjectType , align: "left", width: 100},
                {name: "subjectCode", label: $.autoCombo.labelI18n.AcctSubjectCode, align: "left", width: 150},
                {name: "subjectName", label: $.autoCombo.labelI18n.AcctSubjectName, align: "left", width: 250}
            ],
            positionRefer: function () {
                return $(this).parent().parent("div");
            },
            height : 360
            /*,
             widthRefer: function () {
             return $(this).parent().parent("div").outerWidth(true) - 2;
             }*/
        },
        async: {
            url: App["contextPath"] + "/acct/voucher/getAcctSubjectAutoComboData.json"
        }
    },

	/**
	 * 会计科目联想控件配置()
	 * billType 单据类型
	 **/
	acctSubjectAutoComboboxByBillTypeConfig: function(billType){
		return {
			view: {
				colModels: [
					{name: "id", isHide: true},
					{name: "subjectTypeItemStr", label: $.autoCombo.labelI18n.AcctSubjectType , align: "left", width: 100},
					{name: "subjectCode", label: $.autoCombo.labelI18n.AcctSubjectCode, align: "left", width: 150},
					{name: "subjectName", label: $.autoCombo.labelI18n.AcctSubjectName, align: "left", width: 200}
				],
				positionRefer: function () {
					return $(this).parent().parent("div");
				},
				height : 360
			},
			async: {
				url: App["contextPath"] + "/acct/voucher/getAcctSubjectAutoComboData.json",
				requestData: {
					billType: billType
				}
			}
		}
	},

    /**
     * 会计科目联想控件配置()
     * ruleId 科目体系ID
     **/
    acctSubjectAutoComboboxByRuleIdConfig: function(ruleId){
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "subjectTypeItemStr", label: $.autoCombo.labelI18n.AcctSubjectType , align: "left", width: 100},
                    {name: "subjectCode", label: $.autoCombo.labelI18n.AcctSubjectCode, align: "left", width: 150},
                    {name: "subjectName", label: $.autoCombo.labelI18n.AcctSubjectName, align: "left", width: 200}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                height : 350
            },
            async: {
                url: App["contextPath"] + "/acct/voucher/getAcctSubjectAutoComboData.json",
                requestData: {
                	ruleId: ruleId
				}
            }
        }
    },

    /**
     * 期末结转科目联想控件配置
     * ruleId 科目体系ID
     * subjectType 科目类型
     **/
    acctSubjectAutoComboboxBySubjectTypeConfig: function(ruleId, subjectType){
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "subjectCode", label: $.autoCombo.labelI18n.AcctSubjectCode, align: "left", width: 150},
                    {name: "subjectName", label: $.autoCombo.labelI18n.AcctSubjectName, align: "left", width: 200}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                height : 350
            },
            async: {
                url: App["contextPath"] + "/acct/setup/getCostOfSaleAutoComboData.json",
                requestData: {ruleId: ruleId, subjectType: subjectType}
            }
        }
    },

    /**
     * 查询库存期末设置列表数据
     **/
    acctSubjectAutoComboboxByCSSConfig: function(){
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 150},
                    {name: "closingStockSubjectName", label: $.autoCombo.labelI18n.AcctClosingStockSubjectId, align: "left", width: 220}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                height : 350
            },
            async: {
                url: App["contextPath"] + "/acct/setup/getQueryGridOfCSS.json"
            }
        }
    },

    /**
     * 物料组会计科目联想控件配置()
     * height 弹窗高度
     * ruleId 科目体系ID
     * add by kehuang   2017/01/24
     **/
    acctSubjectAutoComboboxByHeightConfig: function(ruleId,height,subjectIds){
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "subjectTypeItemStr", label: $.autoCombo.labelI18n.AcctSubjectType , align: "left", width: 100},
                    {name: "subjectCode", label: $.autoCombo.labelI18n.AcctSubjectCode, align: "left", width: 150},
                    {name: "subjectName", label: $.autoCombo.labelI18n.AcctSubjectName, align: "left", width: 200}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                height : height?height:350
            },
            async: {
                url: App["contextPath"] + "/acct/voucher/getAcctSubjectAutoComboData.json",
                requestData: {
                	ruleId: ruleId,
					subjectIds:subjectIds
                }
            }
        }
    },

    /**
     * 银行名称联想控件配置
     * 从数据字典表获取的数据（即将废弃20161202)
     * created by huanglb at 2015-12-10
     */
    acctBankAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "id", isHide: true},
                {name: "codeValue", label: $.autoCombo.labelI18n.codeCol,align: "left", width: 150},
                {name: "codeName", label: $.autoCombo.labelI18n.nameCol, align: "left", width: 300}
            ],
            positionRefer: function () {
                return $(this).closest("div");
            },
            height:350,
            isRememberValue: false
        },
        async: {
            url: App["contextPath"] + "/acct/setup/getAcctBankAutoComboData.json?codeType=02"
        }
    },

    /**
     * “新的”银行名称联想控件配置
     * 从银行资料表获取的数据（改用这个)
     * created by huanglb at 20161202
     */
    newAcctBankAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "id", isHide: true},
                {name: "code", label: $.autoCombo.labelI18n.codeCol,align: "left", width: 150},
                {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left", width: 300}
            ],
            positionRefer: function () {
                return $(this).closest("div");
            },
            height:350,
            isRememberValue: false
        },
        async: {
            url: App["contextPath"] + "/acct/setup/getNewAcctBankAutoComboData.json"
        }
    },

    /** 员工部门名称联想控件配置*/
    acctDepartmentAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "id", isHide: true},
                {name: "code", label: $.autoCombo.labelI18n.codeCol},
                {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left"}
            ],
            positionRefer: function () {
                return $(this).parent().parent("div");
            },
            widthRefer: function () {
                return $(this).parent().parent("div").outerWidth(true) - 2;
            }
        },
        async: {
            url: App["contextPath"] + "/acct/partner/getAcctDepartmentAutoComboData.json"
        }
    },

    /** 建账页面中fiscalYear时间控件*/
    getFiscalYearDate: {
        view: {
            colModels: [
                {name: "text", label: "Date"},
                {name: "year", isHide: true},
                {name: "month", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent().parent("div");
            },
            widthRefer: function () {
                return $(this).parent().parent("div").outerWidth(true) - 2;
            }
        },
        async: {
            dataSourceType: "local"
        }
    },

    /** 年结页面中结束账期时间控件*/
    getFinancialYearEndDate: {
        view: {
            colModels: [
                {name: "text", label: "Date"},
                {name: "year", isHide: true},
                {name: "month", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent().parent("div");
            },
            widthRefer: function () {
                return $(this).parent().parent("div").outerWidth(true) - 2;
            }
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**
     * 税码联想控件
     * 参数= 1：采购，2：销售，0：销售+采购
     * deleteFlag是否删除  "0"否   "1"是  "all" 查全部  不传、空串、null,默认原来的查询，没有删除 add by lzs on 20170509
     * taxRateValue 区分零值和非零值税码税率   0,零值税率    1，非零值税率     不传、空串、null，默认原来查询（即零值和非零值都有查询）
     * @param taxReportType
     * @returns {{view: {isRememberValue: boolean, colModels: *[], positionRefer: Function, widthRefer: Function}, async: {dataSourceType: string, url: string, data: {taxReportType: *}}}}
     */
    taxRateConfig: function (taxReportType, deleteFlag, taxRateValue,currDate, acctYear,acctMonth) {
        return {
            view: {
                forceHideHead: true,
                isRememberValue: true,
				showPager: false,
                colModels: [
                    {name: "id", isHide: true},
                    {name: "taxCode", label: $.autoCombo.labelI18n.AcctTaxCode, align: "center"},
                    {name: "taxRate", label: $.autoCombo.labelI18n.AcctTaxRate, align: "left", isHide: true},
                    {name: "taxRateStr", label: $.autoCombo.labelI18n.AcctTaxRate, align: "center"}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent("div").outerWidth(true) - 2;
                }
            },
            async: {
                // dataSourceType: "onceRemote",
                url: App["contextPath"] + "/acct/gst/getTaxRateAutoCombobox.json",
                requestData: {
                    taxReportType: taxReportType,
                    deleteFlag: deleteFlag,
                    taxRateValue: taxRateValue,
					currDate: currDate,
					acctYear:acctYear,
					acctMonth: acctMonth
                }
            }
        }
    },

	/**
	 * 企业启用税码场景,add by hongjinqiu 2018.05.03
	 * 参数= 1：采购，2：销售，0：销售+采购
	 * deleteFlag是否删除  "0"否   "1"是  "all" 查全部  不传、空串、null,默认原来的查询，没有删除 add by lzs on 20170509
	 * taxRateValue 区分零值和非零值税码税率   0,零值税率    1，非零值税率     不传、空串、null，默认原来查询（即零值和非零值都有查询）
	 * @param taxReportType
	 * @param deleteFlag
	 * @param taxRateValue
	 * @param taxCodeType
	 * @returns {{view: {forceHideHead: boolean, isRememberValue: boolean, colModels: [null,null,null,null], positionRefer: view.positionRefer, widthRefer: view.widthRefer}, async: {dataSourceType: string, url: string, requestData: {taxReportType: *, deleteFlag: *, taxRateValue: *, taxCodeType: *}}}}
	 */
	taxRateSceneConfig: function (taxReportType, deleteFlag, taxRateValue, taxCodeType, forceHideHead) {
		var hideHead = false;
		if (forceHideHead) {
			hideHead = true;
		}
		return {
			view: {
				forceHideHead: hideHead,
				isRememberValue: true,
				colModels: [
					{name: "id", isHide: true},
					{name: "taxSourceStr", label: $.autoCombo.labelI18n.AcctTaxSource, align: "center", isHide: hideHead},
					{name: "taxCode", label: $.autoCombo.labelI18n.AcctTaxCode, align: "center"},
					{name: "taxRate", label: $.autoCombo.labelI18n.AcctTaxRate, align: "left", isHide: true},
					{name: "taxRateStr", label: $.autoCombo.labelI18n.AcctTaxRate, align: "center"}
				],
				positionRefer: function () {
					return $(this).parent().parent("div");
				},
				widthRefer: function () {
					return $(this).parent().parent("div").outerWidth(true) - 2;
				}
			},
			async: {
				dataSourceType: "onceRemote",
				url: App["contextPath"] + "/acct/gst/getTaxRateAutoComboboxScene.json",
				requestData: {
					taxReportType: taxReportType,
					deleteFlag: deleteFlag,
					taxRateValue: taxRateValue,
					taxCodeType: taxCodeType
				}
			}
		}
	},

    /**
     * 录分录中的税码
     * 税码来源,税码,税率
     */
    otherDetailTaxRateConfig: function (currDate,taxReportType) {
        return {
            view: {
				showPager: false,
                isRememberValue: true,
                colModels: [
                    {name: "id", isHide: true},
                    {name: "taxSourceStr", label: $.autoCombo.labelI18n.AcctTaxSource, align: "center"},
                    {name: "taxCode", label: $.autoCombo.labelI18n.AcctTaxCode, align: "center"},
                    {name: "taxRate", label: $.autoCombo.labelI18n.AcctTaxRate, align: "left", isHide: true},
                    {name: "taxRateStr", label: $.autoCombo.labelI18n.AcctTaxRate, align: "center"}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent("div").outerWidth(true) - 2  ;
                }
            },
            async: {
                // dataSourceType: "onceRemote",
                url: App["contextPath"] + "/acct/gst/getTaxRateAutoCombobox.json",
				requestData: {
					orderBySourceType: taxReportType,
					currDate: currDate
				}
            }
        }
    },

    /**参数页面中是否启用的控件**/
    isUseSelect: {
        view: {
            colModels: [
                {name: "selectName", label: "selectName"},
                {name: "selectValue", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [{selectValue: '1', selectName: 'Use'}, {selectValue: '0', selectName: 'Disable'}]
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**参数页面中字符长度的控件**/
    isSnLength: {
        view: {
            colModels: [
                {name: "snLength", label: "snLength"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {snLength: '1'}, {snLength: '2'},
                {snLength: '3'}, {snLength: '4'},
                {snLength: '5'}, {snLength: '6'},
                {snLength: '7'}, {snLength: '8'},
                {snLength: '9'}, {snLength: '10'}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**
     * 参数页面中凭证状态的控件
     * created by huanglb at 2015-12
     */
    acctVoucherStatusAutoComboboxConfig: function(containsAll) {
        var billStatusEnum = enumUtil.getEnum("billStatusEnum");
        for(var i = 0 ; i < billStatusEnum.length ; i ++){
            //排除暂存和关账状态 mod by zhangyx on 2017-04-21
            if(billStatusEnum[i] != null && ($.trim(billStatusEnum[i]["value"]) == 0 || $.trim(billStatusEnum[i]["value"]) == 5)){
                billStatusEnum.splice(i, 1);
            }
        }
        if (containsAll) {
            billStatusEnum = billStatusEnum.slice(0);
            billStatusEnum.unshift({value:null,name:$.autoCombo.labelI18n.AcctAll});
        }
        return {
            view: {
                colModels: [
                    {name: "name", label: "name"},
                    {name: "value", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) + 12;
                },
                localData: billStatusEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

    /**
     * 单据状态控件
     * created by zhangyx at 2017-07-14
     */
    billStatusAutoComboboxConfig: function(containsAll) {
        var billStatusEnum = enumUtil.getEnum("billStatusEnum");
        for(var i = 0 ; i < billStatusEnum.length ; i ++){
            //排除关账状态
            if(billStatusEnum[i] != null && $.trim(billStatusEnum[i]["value"]) == 5){
                billStatusEnum.splice(i, 1);
            }
        }
        if (containsAll) {
            billStatusEnum = billStatusEnum.slice(0);
            billStatusEnum.unshift({value:null,name:$.autoCombo.labelI18n.AcctAll});
        }
        return {
            view: {
                colModels: [
                    {name: "name", label: "name"},
                    {name: "value", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) + 12;
                },
                localData: billStatusEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

    periodStatusAutoComboboxConfig: function() {

        var periodEnum = enumUtil.getEnum("acctPeriodStatusEnum");

        var indexLocked = Number(periodEnum.length) - 1;
        for(var i =0 ; i < periodEnum.length ; i ++){
            if(periodEnum[i] != null && $.trim(periodEnum[i]["value"]) == "2"){
                indexLocked = i;
            }
        }
        periodEnum.splice(indexLocked, 1);
        return {
            view: {
                colModels: [
                    {name: "name", label: "name"},
                    {name: "value", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).closest("td");
                },
                //width: 80,
                widthRefer: function () {
                    return $(this).closest("td").outerWidth(true) + 5;
                },
                localData: periodEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

    /**
     * 参数页面中凭证类型的控件
     * created by huanglb at 2015-12
     */
    acctVoucherTypeAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "selectName", label: "selectName"},
                {name: "selectValue", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {selectValue: '', selectName: $.autoCombo.labelI18n.AcctAll},
                {selectValue: '1', selectName: $.autoCombo.labelI18n.AcctVoucherTypeNormal},
                {selectValue: '2', selectName: $.autoCombo.labelI18n.AcctVoucherTypeWrong},
                {selectValue: '4', selectName: $.autoCombo.labelI18n.AcctVoucherTypeHasWriteOff},
                {selectValue: '5', selectName: $.autoCombo.labelI18n.AcctVoucherTypeWriteOff}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**
     * 日志模块类型下拉框控件
     * 林志胜 2016-4-5
     */
    acctTransTypeAutoComboboxConfig: function(containsAll){
        var bizEnum = enumUtil.getEnum("bizEnum");   //获得枚举类型
        //添加“全部”选项
        if (containsAll) {
            bizEnum = bizEnum.slice(0);
            bizEnum.unshift({key:"all",name:$.autoCombo.labelI18n.AcctAll});
        }

        return{
            view:{
                colModels:[
                    {name: "name", label: "name"},
                    {name: "key", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                },
                localData: bizEnum
            },
            async:{
                dataSourceType: "local"
            }
        }
    },

    /**
     * 来源单据类型的控件
     * created by huanglb at 2015-12
     */
    acctSourceBillTypeAutoComboboxConfig: function(containsAll) {
        var sourceBillTypeEnum = enumUtil.getEnum("sourceBillTypeEnum");
        if (containsAll) {
            sourceBillTypeEnum = sourceBillTypeEnum.slice(0);
            sourceBillTypeEnum.unshift({value:0,name:$.autoCombo.labelI18n.AcctAll});
        }
        return {
            view: {
                colModels: [
                    {name: "name", label: "name"},
                    {name: "value", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 3;
                },
                localData: sourceBillTypeEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

	/**
	 * 资产负债表的 [This Fiscal Year], [This Month vs Last Month], [This Quarter vs Last Quarter], [This Year vs Last Year]
	 */
	reportCompareTypeAutoComboboxConfig: function(){
		var rEnum = enumUtil.getEnum("reportCompareTypeEnum");   //获得枚举类型
		//添加“全部”选项
		rEnum = rEnum.slice(0);
		rEnum.unshift({key:"",name:""});

		return{
			view:{
				colModels:[
					{name: "name", label: "name"},
					{name: "key", isHide: true},
					{name: "value", isHide: true}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData: rEnum
			},
			async:{
				dataSourceType: "local"
			}
		}
	},

    /** 会计期间表中的账期*/
    acctPeriodAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "acctPeriodValue", isHide: true},
                {name: "acctPeriodText", label: "acctPeriodText"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent();
            },
            widthRefer: function () {
                return $(this).parent().outerWidth(true) - 2;
            }
        },
        async: {
            url: App["contextPath"] + "/acct/period/getAcctPeriodAutoComboData.json",
            dataSourceType: "onceRemote"
        }
    },

    /** gst有效区间的账期  add by lzs on 20170828*/
    gstPeriodAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "acctPeriodValue", isHide: true},
                {name: "acctPeriodText", label: "acctPeriodText"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent();
            },
            widthRefer: function () {
                return $(this).parent().outerWidth(true) - 2;
            }
        },
        async: {
            url: App["contextPath"] + "/acct/period/getGstPeriodAutoComboData.json",
            dataSourceType: "onceRemote"
        }
    },

	/** sst有效区间的账期*/
	sstPeriodAutoComboboxConfig: {
		view: {
			colModels: [
				{name: "acctPeriodValue", isHide: true},
				{name: "acctPeriodText", label: "acctPeriodText"}
			],
			singleColumnNotHead: true,
			positionRefer: function () {
				return $(this).parent();
			},
			widthRefer: function () {
				return $(this).parent().outerWidth(true) - 2;
			}
		},
		async: {
			url: App["contextPath"] + "/acct/period/getSstPeriodAutoComboData.json",
			dataSourceType: "onceRemote"
		}
	},

    /** 会计财年表中的财年*/
    acctfiscalYearAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "value", isHide: true},
                {name: "name", label: "name"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent();
            },
            widthRefer: function () {
                return $(this).parent().outerWidth(true) - 2;
            }
        },
        async: {
            url: App["contextPath"] + "/acct/fa/getPeriodForFiscalYear.json",
            dataSourceType: "onceRemote"
        }
    },

    /**
     * 合作伙伴-往来单位
     * PARTNER_TYPE 1：供应商 2 客户 3：客户兼供应商
     * 往来单位类型
     */
    getAcctPartnerConfig: function (billDate) {
        return {
            view: {
                forceHideHead: true,
                // isRememberValue: false,
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, isHide: true},
                    {name: "currId", label: $.autoCombo.labelI18n.currName , isHide: true},
                    {name: "currName", label: $.autoCombo.labelI18n.currName , isHide: true},
                    {name: "currCode", label: $.autoCombo.labelI18n.currCode , isHide: true},
                    {name: "supplierTaxCodeAndRate", label: "supplierTaxCodeAndRate" , isHide: true},
                    {name: "customerTaxCodeAndRate", label: "customerTaxCodeAndRate" , isHide: true},
                    {name: "customerTaxCode", label: "customerTaxCode" , isHide: true},
                    {name: "supplierTaxCode", label: "supplierTaxCode" , isHide: true},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left"},
                    {name: "rateAdjust", label: $.autoCombo.labelI18n.AcctAdjustRate, isHide: true},
                    {name: "defaultAddress", label: "defaultAddress", isHide: true},
                    {name: "areaName", label: "areaName", isHide: true},
                    {name: "gstStatus", label: "gstStatus", isHide: true},
                    {name: "agentName", label: "agentName", isHide: true}
                ],
                positionRefer: function () {
                    return $(this).closest("div");
                },
                widthRefer: function () {
                    return $(this).closest("div").width() - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/biz/findAcctPartner.json",
				requestData: {"billDate": billDate}
            }
        };
    },

    /**
     * 录分录表格中的联想控件的取值以及赋值
     * @returns {{view: {forceHideHead: boolean, isRememberValue: boolean, colModels: [*,*,*,*,*,*,*,*], positionRefer: view.positionRefer, widthRefer: view.widthRefer}, async: {url: string}}}
     */
    getAcctPartnerConfigForOtherBill: function () {
        return {
            view: {
                forceHideHead: true,
                isRememberValue: false,
                colModels: [
                    {name: "id", isHide: true},
                    {name: "supplierTaxCodeAndRate", label: "supplierTaxCodeAndRate" , isHide: true},
                    {name: "customerTaxCodeAndRate", label: "customerTaxCodeAndRate" , isHide: true},
                    {name: "customerTaxCode", label: "customerTaxCode" , isHide: true},
                    {name: "supplierTaxCode", label: "supplierTaxCode" , isHide: true},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left"},
                    {name: "rateAdjust", label: $.autoCombo.labelI18n.AcctAdjustRate, isHide: true},
                    {name: "gstStatus", label: "gstStatus", isHide: true}
                ],
                positionRefer: function () {
                    return $(this).closest("div");
                },
                widthRefer: function () {
                    return $(this).closest("div").width() - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/partner/findAcctPartnerForOtherBill.json"
            }
        };
    },

    getSelfSupplierConfig: function () {
        return {
            view: {
                forceHideHead: true,
                isRememberValue: false,
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, isHide: true},
                    {name: "currId", label: $.autoCombo.labelI18n.currName , isHide: true},
                    {name: "supplierTaxCode", label: "supplierTaxCode" , isHide: true},
                    {name: "partnerId", isHide: true},
                    {name: "partnerName", label: $.autoCombo.labelI18n.nameCol ,align: "left"},
                    {name: "address", label: "defaultAddress", isHide: true},
                    {name: "gstStatus", label: "gstStatus", isHide: true},
                    {name: "areaId", label: "agentName", isHide: true},
                    {name: "agentId", label: "agentName", isHide: true}
                ],
                positionRefer: function () {
                    return $(this).closest("div");
                },
                widthRefer: function () {
                    return $(this).closest("div").width() - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/gst/getSelfBilledSupplierAutoComboData.json"
            }
        };
    },
    /**
     * 合作伙伴-往来单位
     * PARTNER_TYPE 1：供应商 2 客户 3：客户兼供应商
     * 往来单位类型
     */
    getAcctfaClassConfig: function () {
        return {
            view: {
                forceHideHead: true,
                isRememberValue: false,
                colModels: [
                    {name: "id", isHide: true},
                    {name: "name", label: "name"}
                ],
                positionRefer: function () {
                    return $(this).closest("div");
                },
                widthRefer: function () {
                    return $(this).closest("div").width() - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/fa/comboBoxFaClass2.json"
            }
        };
    },

    /**
     * 获得本地数据下拉框配置
     */
    getSelectConfig: function (localData, colModels, selectFun) {
        return {
            view: {
                forceHideHead: true,
                isRememberValue: true,
                isAllowEmpty: false,
                colModels: colModels,
                localData: localData,
                positionRefer: function () {
                    return $(this).closest("div");
                },
                widthRefer: function () {
                    return $(this).closest("div").width() - 2;
                }
            },
            async: {
                /** 数据来源方式：remote = 远程、local = 本页面、onceRemote = 一次远程 */
                dataSourceType: "local"
            },

            callback: {
                afterSelectRow: function (rowData) {
                    selectFun.apply(this, [rowData]);
                }
            }
        }
    },

    /**
     * 获得本地数据下拉框配置
     *
     */
    getSelectConfig2: function (extendConfig) {
        return $.extend(true, AutoComboboxUtil.getSelectConfig([], [], null), extendConfig);
    },

    /** 关账页面中时间控件*/
    getFiscalEndYearDate: {
        view: {
            colModels: [
				{name: "id", isHide: true},
				{name: "fiscalYear", isHide: true},
				{name: "fiscalPeriod", isHide: true},
				{name: "fiscalYearEnd", isHide: true},
				{name: "fiscalPeriodEnd", isHide: true},
                {name: "year", label: "Date"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent();
            },
            widthRefer: function () {
                return $(this).parent().outerWidth(true) - 2;
            }
        },
        async: {
            dataSourceType: "local"
        }
    },

    /** GST上报纳税人的联想控件*/
    taxPayerAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "icNo", label: "icNo", isHide: true},
                {name: "oicNo", label: "oicNo", isHide: true},
                {name: "sign", label: "sign", isHide: true},
                {name: "signDate", label: "signDate", isHide: true},
                {name: "nationlity", label: "nationlity", isHide: true},
                {name: "passportNo", label: "passportNo", isHide: true},
                {name: "name", label: "name"}
            ],
            isRememberValue: false,
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent().parent("div");
            },
            widthRefer: function () {
                return $(this).parent().parent("div").outerWidth(true) - 2;
            }
        },
        async: {
            url: App["contextPath"] + "/acct/gst/getTaxPayerAutoComboData.json"
        }
    },

    /**
     * 销售类型控件
     * created by huanglb at 2015-12-18
     */
    getSaleTypeConfig: function (containsAll) {

        var saleTypeEnum = enumUtil.getEnum("saleTypeEnum");

        if (containsAll) {
            saleTypeEnum = saleTypeEnum.slice(0);
            saleTypeEnum.unshift({value:0,name:$.autoCombo.labelI18n.AcctAll});
        }

        return {
            view: {
                colModels: [
                    {name: "value", label: "value", isHide: true},
                    {name: "name", label: "name", isHide: false}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                },
                localData:saleTypeEnum
            }
            ,
            async: {
                dataSourceType: "local"
            }
        }
    },

    /**
     * 费用单类型控件
     * created by zhangyx on 2016-08-12
     */
    getExpenceTypeConfig: function (containsAll) {

        var expenceTypeEnum = enumUtil.getEnum("expenceTypeEnum");

        if (containsAll) {
            expenceTypeEnum = expenceTypeEnum.slice(0);
            expenceTypeEnum.unshift({value:0,name:$.autoCombo.labelI18n.AcctAll});
        }

        return {
            view: {
                colModels: [
                    {name: "value", label: "value", isHide: true},
                    {name: "name", label: "name", isHide: false}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                },
                localData:expenceTypeEnum
            }
            ,
            async: {
                dataSourceType: "local"
            }
        }
    },

	/**
	 * 库存调整单类型,调增,调减
	 * @param containsAll
	 */
	getAdjustmentTypeConfig: function (containsAll) {
		var adjustmentTypeEnum = enumUtil.getEnum("adjustmentTypeEnum");

		if (containsAll) {
			adjustmentTypeEnum = adjustmentTypeEnum.slice(0);
			adjustmentTypeEnum.unshift({value:0,name:$.autoCombo.labelI18n.AcctAll});
		}

		return {
			view: {
				colModels: [
					{name: "value", label: "value", isHide: true},
					{name: "name", label: "name", isHide: false}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData:adjustmentTypeEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

	getPurchaseTypeConfig: function (containsAll) {
		var purchaseTypeEnum = enumUtil.getEnum("purchaseTypeEnum");

		if (containsAll) {
			purchaseTypeEnum = purchaseTypeEnum.slice(0);
			purchaseTypeEnum.unshift({value:0,name:$.autoCombo.labelI18n.AcctAll});
		}

		return {
			view: {
				colModels: [
					{name: "value", label: "value", isHide: true},
					{name: "name", label: "name", isHide: false}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData:purchaseTypeEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

	/**
	 * 添加 银行对账单明细日志类型 下拉框
	 * add by hongjq 2017.10.19
	 */
	getBankItemOperateConfig: function (containsAll) {
		var bankItemOperateEnum = enumUtil.getEnum("bankItemOperateEnum");

		if (containsAll) {
			bankItemOperateEnum = bankItemOperateEnum.slice(0);
			bankItemOperateEnum.unshift({value:"",name:$.autoCombo.labelI18n.AcctAll});
		}

		return {
			view: {
				colModels: [
					{name: "value", label: "value", isHide: true},
					{name: "name", label: "name", isHide: false}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData:bankItemOperateEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

    /**
     * 报表科目显示层级控件
     * created by shcai at 2015-12-28
     */
    reportLevelAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "selectName", label: "selectName"},
                {name: "selectValue", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {selectValue: '', selectName: ' '},
                {selectValue: '1', selectName: '1'},
                {selectValue: '2', selectName: '2'},
                {selectValue: '3', selectName: '3'},
                {selectValue: '4', selectName: '4'},
                {selectValue: '5', selectName: '5'}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**
     * 行业代码(只限本公司)
     */
    industryCodeConfig: {
        view: {
            colModels: [
                {name: "code", label: "code"}
            ],
            showPager: false,
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            }
        },
        async: {
            url: App["contextPath"] + "/acct/setup/getIndustryCodeList.json"
        }
    },

    /**
     * 获取币种及当前账期汇率控件
     * created by huanglb at 2015-12-18
     */
    getCurrencyAndRateConfig: function (acctYear, acctPeriod) {
        return {
            view: {
                colModels: [
                    {name: "adjustRate", isHide: true},
                    {name: "currCode", label: $.autoCombo.labelI18n.currCode},
                    {name: "currName", isHide: true}
                ],
                showPager: false,
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent();
                },
                widthRefer: function () {
                    return $(this).parent().outerWidth(true) - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/setup/getCurrencyAndRateAutoComboData.json",
                requestData: {"acctYear": acctYear, "acctPeriod": acctPeriod}
            }
        };
    },

    /**
     * 获得影像类型
     * @param selectFun
     * @param containsAll
     * @returns {*|{view, async, callback}}
     */
    getTypeDescConfig: function (selectFun, containsAll) {
        var typeDescEnum= enumUtil.getEnum("typeDescEnum");

        if (containsAll) {
            typeDescEnum = typeDescEnum.slice(0);
            typeDescEnum.unshift({
                imageType: "",
                typeDescription: "",
                description: $.autoCombo.labelI18n.AcctAll
            });
        }

        return $.extend({minWidth: 250},AutoComboboxUtil.getSelectConfig(
            typeDescEnum,
            [
                {name: "value", isHide: true},
                {name: "imageType", label: "影像类型", width: 100, isHide: true},
                {name: "typeDescription", label: "影像描述", width: 140, isHide: true},
                {name: "description", label: "影像描述", width: 301, isHide: false}
            ],
            selectFun
        ));
    },
    /**
     * 获得影像类型（以发票编码后三位开头）
     * @param selectFun
     * @param containsAll
     * @returns {*|{view, async, callback}}
     */
    getTypeDescConfig2: function (selectFun, containsAll) {
        var typeDescEnum= enumUtil.getEnum("typeDescEnum");

        if (containsAll) {
            typeDescEnum = typeDescEnum.slice(0);
            typeDescEnum.unshift({
                imageType: "",
                typeDescription: "",
                description: $.autoCombo.labelI18n.AcctAll,
                descriptionExt: $.autoCombo.labelI18n.AcctAll
            });
        }

        return $.extend({minWidth: 250},AutoComboboxUtil.getSelectConfig(
            typeDescEnum,
            [
                {name: "value", isHide: true},
                {name: "imageType", label: "影像类型", width: 100, isHide: true},
                {name: "typeDescription", label: "影像描述", width: 140, isHide: true},
                {name: "description", label: "影像描述", width: 301, isHide: true},
                {name: "descriptionExt", label: "影像描述", width: 301, isHide: false}
            ],
            selectFun
        ));
    },

    /**
     * 根据用户ID获取可以选择的企业
     * @returns {{}}
     */
    getVopCorpSwitchConfig: function () {
        return {
            view: {
                colModels: [
                    {name: "corpId", isHide: true},
                    {name: "corpName", isHide: false},
                    {name: "taskVoList", isHide: true}
                ],
                singleColumnNotHead: true,
				showPager: false,
                positionRefer: function () {
                    return $(this).parent();
                },
                widthRefer: function () {
                    return $(this).parent().outerWidth() - 2;
                }
            },
            async: {
                dataSourceType: "local"
            }
        };
    },

    /**
     * 凤巢账期的选择
     * @returns {{}}
     */
    getVopPeriodSwitchConfig: function () {
        return {
            view: {
                colModels: [
                    {name: "taskId", isHide: true},
                    {name: "corpId", isHide: true},
                    {name: "yearMonth", isHide: false}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent();
                },
                widthRefer: function () {
                    return $(this).parent().outerWidth() - 2;
                }
            },
            async: {
                dataSourceType: "local"
            }
        };
    },

    /**
     * 结算方式联想控件配置
     * created by huanglb at 20151223
     */
    settleAutoComboboxConfig:function(billCurrId) {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "settleType", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left"}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent("div").outerWidth(true) - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/setup/getSettleAutoComboData.json",
                requestData: {
                    billCurrId: billCurrId
                }
            }
        }
    },

    /**
     * 结算方式,银行对账单清单,表格选择,联想控件配置,
     * created by hongjq at 20151223
     */
    settleForBankingStatementAutoComboboxConfig:function() {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "bankName", isHide: true},
                    {name: "accountNo", label: $.autoCombo.labelI18n.AccountNo, width: 100, align: "left"},
					{name: "currCode", label: $.autoCombo.labelI18n.AcctCurr, align: "left",width: 80},
					{name: "accountType", label: i18n["acct.common.bank.account.accountType"], align: "left", isHide: true},
					{name: "accountTypeName", label: i18n["acct.common.bank.account.accountType"], align: "left",width: 120}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                }
            },
            async: {
                url: App["contextPath"] + "/acct/setup/getSettleForBankingStatementAutoComboboxData.json"
            }
        }
    },

    /**
     * 销售单据分录中来源单据信息
     *
     * @param billTypes（单据类型)
     * @param acctPartnerId（对应的客户or供应商Id）
     * @param billIds（表体中已存在的单据ids)
     * @param billDate
     */
    saleRefBillConfig: function (billTypes, acctPartnerId, billIds, billDate) {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "billType", label: "billType", isHide: true},
                    {name: "billTypeName", label: $.autoCombo.labelI18n.AcctBillType,align:"left",width:130},
                    {name: "strBillDate", label: $.autoCombo.labelI18n.AcctBillDate,align:"center",width:110},
                    {name: "refNo", label: $.autoCombo.labelI18n.AcctRefNo , align: "left",width:110},
                    {name: "journalNo", label: $.autoCombo.labelI18n.AcctJournalNo , align: "left",width:110},
                    {name: "totalOriginTaxAmt", label: $.autoCombo.labelI18n.AcctOriginTaxAmt, align: "right",width:130,
                        isHide:userInfoUtil.getGstEnabled() != true,//GST Amt启用GST才显示，不启用不显示；add by kehuang   2017/3/13
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "finishOriginAmt", label: $.autoCombo.labelI18n.AcctFinishOriginAmt, align: "right", isHide: true},
                    {
                        name: "unFinishAmt", label: $.autoCombo.labelI18n.AcctUnFinishAmt, align: "right",width:150,
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "exchangeRate", label: $.autoCombo.labelI18n.AcctExchangeRate, align: "right",width:120,
                        formatter: {
                            name: "currency",
                            decimalPlaces: 4,//取参数表的 汇率小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "currCode", label: $.autoCombo.labelI18n.AcctCurr ,width:110, align: "left"}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                width: 880,
                height: 300
            },
            async: {
                url: App["contextPath"] + "/acct/sales/saleInvoice/getSaleRefBillAutoCombobox.json",
                requestData: {
                    billTypes: billTypes,
                    acctPartnerId: acctPartnerId,
                    billIds: billIds,
                    billDate: billDate
                }
            }
        };
    },

    /**
     * 采购红字，追加发票获取上游来源单据信息
     *
     * @param billTypes（单据类型)
     * @param acctPartnerId（对应的客户or供应商Id）
     * @param billIds（表体中已存在的单数ids)
     * @param billDate 日期
     */
    purchaseRefBillConfig: function (billTypes, acctPartnerId, billIds, billDate) {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "billType", label: $.autoCombo.labelI18n.AcctBillType, isHide: true},
                    {name: "billTypeName", label: $.autoCombo.labelI18n.AcctBillType,align:"left",width:150},
                    {name: "strBillDate", label: $.autoCombo.labelI18n.AcctBillDate,align:"center",width:130},
                    {name: "refNo", label: $.autoCombo.labelI18n.AcctRefNo , align: "left",width:130},
                    {name: "journalNo", label: $.autoCombo.labelI18n.AcctJournalNo, align: "left",width:110},
                    {name: "totalOriginTaxAmt", label: $.autoCombo.labelI18n.AcctOriginTaxAmt, align: "right",width:110,
                        isHide:userInfoUtil.getGstEnabled() != true,  //GST Amt启用GST才显示，不启用不显示；add by kehuang   2017/3/13

                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "finishOriginAmt", label: $.autoCombo.labelI18n.AcctFinishPaymentAmt, align: "right", isHide: true},
                    {name: "unFinishAmt", label: $.autoCombo.labelI18n.AcctUnFinishPaymentAmt, align: "right",width:140,
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "exchangeRate", label: $.autoCombo.labelI18n.AcctExchangeRate, align: "right",width:120,
                        formatter: {
                            name: "currency",
                            decimalPlaces: 4,//取参数表的 汇率小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "currCode", label: $.autoCombo.labelI18n.AcctCurr, align: "left",width:110}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                width: 880,
                height: 300
            },
            async: {
                url: App["contextPath"] + "/acct/purchase/purchaseInvoice/getPurchaseRefBillAutoCombobox.json",
                requestData: {
                    billTypes: billTypes,
                    acctPartnerId: acctPartnerId,
                    billIds: billIds,
                    billDate: billDate
                }
            }
        };
    },

    /**
     * 销售单据分录中来源单据信息
     *
     * @param billTypes（单据类型)
     * @param acctPartnerId（对应的客户or供应商Id）
     * @param billIds（表体中已存在的单据ids)
     * @param billDate 日期
     * @param projectId 项目Id
     */
    getRefBillForReceivableAndPaymentConfig: function (billTypes, acctPartnerId, billIds,billDate,projectId) {
        return {
            view: {
                colModels: [
                    {name: "acctType", isHide: true},
                    {name: "lastBillId", isHide: true},
                    {name: "lastBillType", label: $.autoCombo.labelI18n.AcctBillType, isHide: true},
                    {name: "LastBillVersion", label: $.autoCombo.labelI18n.AcctLastBillVersion, isHide: true},
                    {name: "invoiceCurrId", label: $.autoCombo.labelI18n.AcctInventoryCurr , isHide: true},
                    {name: "invoiceExchangeRate", label: $.autoCombo.labelI18n.AcctInventoryExchangeRate , isHide: true},
                    {name: "refNo", label: $.autoCombo.labelI18n.AcctInventoryRefNo , align: "left"},
                    {name: "lastBillNo", label: $.autoCombo.labelI18n.AcctInventoryLastBillNo , align: "left"},
                    {name: "invoiceBillDate", label: $.autoCombo.labelI18n.AcctBillDate, formatter: {name: "date",dateFormat:i18n["acct.common.format.date"]},align: "center"},
                    {name: "invoiceTotalOriginAmt", label: $.autoCombo.labelI18n.AcctInvoiceTotalOriginAmt, align: "right",
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "writeOffOriginAmt", label: $.autoCombo.labelI18n.AcctInvoiceWriteOffOriginAmt,  isHide: true},
                    {name: "receivedOriginAmt", label: $.autoCombo.labelI18n.AcctInvoiceReceivedOriginAmt, align: "right",
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        },isHide:true
                    },
                    {name: "outstandingOriginAmt", label: $.autoCombo.labelI18n.AcctInvoiceOutstandingOriginAmt , align: "right",
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    }
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                width: 850,
                height: 300
            },
            async: {
                url: App["contextPath"] + "/acct/sales/saleReceivables/getRefBillForSaleAndPurcharseAutoCombobox.json",
                requestData: {
					billTypes: billTypes,
					acctPartnerId: acctPartnerId,
					billIds: billIds.join(','),
					billDate: billDate,
					projectId: projectId
                }
            }
        };
    },

	/**
	 * 核销应付
	 *
	 * @param billTypes
	 * @param acctPartnerId
	 * @param billIds
	 * @param billDate
	 * @param projectId
	 */
    getRefBillForPaymentConfig: function (billTypes, acctPartnerId, billIds,billDate,projectId) {
        return {
            view: {
                colModels: [
                    {name: "acctType", isHide: true},
                    {name: "lastBillId", isHide: true},
                    {name: "lastBillType", label: $.autoCombo.labelI18n.AcctBillType, isHide: true},
                    {name: "LastBillVersion", label: $.autoCombo.labelI18n.AcctLastBillVersion, isHide: true},
                    {name: "invoiceCurrId", label: $.autoCombo.labelI18n.AcctInventoryCurr , isHide: true},
                    {name: "invoiceExchangeRate", label: $.autoCombo.labelI18n.AcctInventoryExchangeRate , isHide: true},
                    {name: "refNo", label: $.autoCombo.labelI18n.AcctInventoryRefNo  , align: "left"},
                    {name: "lastBillNo", label: $.autoCombo.labelI18n.AcctInventoryLastBillNo , align: "left"},
                    {name: "invoiceBillDate", label: $.autoCombo.labelI18n.AcctBillDate,formatter: {name: "date",dateFormat:i18n["acct.common.format.date"]}, align: "center"},
                    {name: "invoiceTotalOriginAmt", label: $.autoCombo.labelI18n.AcctInvoiceTotalOriginAmt, align: "right",
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "writeOffOriginAmt", label: $.autoCombo.labelI18n.AcctInvoiceWriteOffOriginAmt,  isHide: true},
                    {name: "receivedOriginAmt", label: $.autoCombo.labelI18n.AcctInvoiceReceivedOriginAmt, align: "right",
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        },isHide:true
                    },
                    {name: "outstandingOriginAmt", label: $.autoCombo.labelI18n.AcctInvoiceOutstandingOriginAmt , align: "right",
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    }
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                width: 850,
                height: 300
            },
            async: {
                url: App["contextPath"] + "/acct/purchase/purchaseApPayment/getRefBillForPurcharseAutoCombobox.json",
                requestData: {
					billTypes: billTypes,
					acctPartnerId: acctPartnerId,
					billIds: billIds.join(','),
					billDate: billDate,
					projectId: projectId
                }
            }
        };
    },

    /**
     * 银行付款单新增页面的Type下拉控件
     * created by huanglb at 20151230
     */
    bankPaymentTypeAutoComboboxConfig: {
        view: {
            forceHideHead: true,
            isRememberValue: true,
            singleColumnNotHead: true,
            colModels: [
                {name: "selectName", label: "selectName"},
                {name: "selectValue", isHide: true}
            ],
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            }
        },
        async: {
            async: false,
            dataSourceType: "local"
        }
    },

    /**
     * 银行付款单新增页面的Payer下拉控件(根据type值动态加载下拉框数据)
     * 【Type】字段:下拉选择 【Expense】、【EPF/Socso】、【Salary】
     * 【Expense】、【EPF/Socso】:【Payee】关联《往来单位T_ML_GL_PARTNER》
     * 【Salary】：【Payee】关联《职员表T_ML_GL_PARTNER_EMPLOYEE》
     * 0-员工（T_ML_GL_PARTNER_EMPLOYEE表数据），1-合作伙伴（T_ML_GL_PARTNER表数据）
     * created by huanglb at 20151230
     */
    bankPaymentPayerAutoComboboxConfig: function (typeValue) {
        return {
            view: {
                forceHideHead: true,
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, isHide: true},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left"}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent("div").outerWidth(true) - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/biz/findAcctPartnerOrEmployee.json",
                requestData: {
                    typeValue: typeValue
                }
            }
        }
    },

    /**
     * 银行付款单单据往来对象下拉框
     * 获取T_ML_GL_PARTNER表数据（供应商和客户兼供应商两种）
     * created by huanglb at 2016-01-27
     */
    bankPaymentPartnerAutoComboboxConfig:function(billDate) {
    	return{
			view: {
				isRememberValue: false,
				colModels: [
					{name: "id", isHide: true},
					{name: "code", label: $.autoCombo.labelI18n.codeCol},
					{name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left"},
					{name: "gstNo", isHide: true},
					{name: "ssmNo", isHide: true},
					{name: "supplierSubjectId", isHide: true},
					{name: "supplierSubjectCode", isHide: true},
					{name: "supplierSubjectName", isHide: true},
					{name: "supplierTaxCode", isHide: true},
					{name: "supplierTaxRate", isHide: true},
					{name: "gstStatus", label: "gstStatus", isHide: true},
					{name: "supplierTaxRateStr", isHide: true}
				],
				positionRefer: function () {
					return $(this).parent().parent("div");
				},
				widthRefer: function () {
					return $(this).parent().parent("div").outerWidth(true) - 2;
				}
			},
			async: {
				url: App["contextPath"] + "/acct/partner/findAcctPartnerFromBankPayment.json",
				requestData: {
					billDate: billDate
				}
			}
		}

    },

    getYesNoConfig: function (selectFun, containsAll) {
        var yesNoEnum = enumUtil.getEnum("yesNo");

        if (containsAll) {
            yesNoEnum = yesNoEnum.slice(0);
            yesNoEnum.unshift({value: "",name:$.autoCombo.labelI18n.AcctAll});
        }

        return AutoComboboxUtil.getSelectConfig(
            yesNoEnum,
            [
                {name: "value", isHide: true},
                {name: "name", label: "name", isHide: false}
            ],
            selectFun
        );
    },

    /**
     * 影像状态下拉框
     * @param selectFun 选择回调函数
     * @param containsAll 是否有包函所有
     */
    getImageFlagConfig: function (selectFun, containsAll) {
        var imageFlagEnum = enumUtil.getEnum("imageFlagEnum"),
            config;

        if (containsAll) {
            imageFlagEnum = imageFlagEnum.slice(0);
            imageFlagEnum.unshift({
                code: "",
                name: $.autoCombo.labelI18n.AcctAll,
                description: $.autoCombo.labelI18n.AcctAll
            });
        }

        config = AutoComboboxUtil.getSelectConfig(
            imageFlagEnum,
            [
                {name: "code", isHide: true},
                {name: "name", label: "name", isHide: true},
                {name: "description", label: "description", isHide: false}
            ],
            selectFun
        );

        config.view.widthRefer = function () {
            return 130;
        };

        return config;
    },
	/**
	 * OCR 识别状态
	 * @param selectFun
	 * @param containsAll
	 * @returns {*|{view, async, callback}}
	 */
    getOcrBillStatusConfig: function (selectFun, containsAll) {
        var billErrorEnum = enumUtil.getEnum("billErrorEnum"),
            config;

        if (containsAll) {
            billErrorEnum = billErrorEnum.slice(0);
            billErrorEnum.unshift({
                code: "",
                name: $.autoCombo.labelI18n.AcctAll
            });
        }

        config = AutoComboboxUtil.getSelectConfig(
            billErrorEnum,
            [
                {name: "code", isHide: true},
                {name: "name", label: "name", isHide: false}
            ],
            selectFun
        );
        return config;
    },

    /**
     * 红冲,追加发票中的"理由"
     */
    reasonAutoComboboxConfig: function (typeValue) {
        return {
            view: {
                isRememberValue: false,
                singleColumnNotHead: true,
                showPager: false,
                colModels: [
                    {name: "id", isHide: true},
                    {name: "codeValue", label: $.autoCombo.labelI18n.codeCol,isHide: true},
                    {name: "codeName", label: $.autoCombo.labelI18n.AcctReason}
                ],
                positionRefer: function () {
                    return $(this).parent("div");
                },
                widthRefer: function () {
                    return $(this).parent("div").outerWidth(true) +10;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/system/findDictValueAutoComboByDictType.json",
                requestData: {
                    typeValue: typeValue
                }
            }
        }
    },

	/**
	 * 往来单位票据导入 往来单位类型
	 * @returns {{view: {colModels: *[], singleColumnNotHead: boolean, positionRefer: Function, widthRefer: Function, localData: *}, async: {dataSourceType: string}}}
	 */
	getPartnerTypeConfig: function () {
		var partnerTypeEnum = enumUtil.getEnum("partnerTypeEnum");

		return {
			view: {
				colModels: [
					{name: "value", label: "value", isHide: true},
					{name: "name", label: "name", isHide: false}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData:partnerTypeEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

	/**
	 * 往来单位票据导入 往来单位类型,
	 *  应收账款期初、销售发票：默认显示”Customer“，下拉可选：客户，其他客户
	 * 应付账期期初、采购发票：默认显示”Supplier“，下拉可选：供应商、其他供应商
	 * @param salePurchaseType 销售采购类型,0:销售,1:采购
	 * add by hongjinqiu 2018.05.29
	 */
	getPartnerTypeConfigForBillImport: function(salePurchaseType) {
		var partnerTypeEnum = null;
		if (salePurchaseType == "0") {
			partnerTypeEnum = enumUtil.getEnum("partnerTypeEnumForSale");
		} else {
			partnerTypeEnum = enumUtil.getEnum("partnerTypeEnumForPurchase");
		}

		return {
			view: {
				colModels: [
					{name: "value", label: "value", isHide: true},
					{name: "name", label: "name", isHide: false}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData:partnerTypeEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

	/**
	 * 往来单位票据导入 往来单位类型
	 * @returns {{view: {colModels: *[], singleColumnNotHead: boolean, positionRefer: Function, widthRefer: Function, localData: *}, async: {dataSourceType: string}}}
	 */
	getInvoiceTypeConfig: function () {
		var invoiceTypeEnum = enumUtil.getEnum("invoiceTypeEnum");

		return {
			view: {
				colModels: [
					{name: "value", label: "value", isHide: true},
					{name: "name", label: "name", isHide: false}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData:invoiceTypeEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

	/**
	 * 打印模板配置清单状态枚举
	 */
	getPrintTemplateStatusConfig: function () {
		var printTemplateStatusEnum = enumUtil.getEnum("printTemplateStatusEnum");
		printTemplateStatusEnum.unshift({
			value: "",
			name: $.autoCombo.labelI18n.AcctAll
		});

		return {
			view: {
				colModels: [
					{name: "value", label: "value", isHide: true},
					{name: "name", label: "name", isHide: false}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData:printTemplateStatusEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

    /**
     * 查分录页面单据类型选择下拉框
     * created by zhangyx at 2016-04-22
     */
    openBillTypeConfig: function (sourceBillType, isRestore, isUnWriteOff) {
        var billTypeArr = enumUtil.getEnum("billTypeEnum");
        var billTypeObj = enumUtil.enumArray2EnumObject(billTypeArr, "code", "key");

        var localData = [ {code: 'OB', name: $.autoCombo.labelI18n.AcctJournalEntry}];
        if(isRestore && isUnWriteOff){
			localData.push({code: 'OBU', name: $.autoCombo.labelI18n.UnWriteOff});
		}else if(isRestore && (sourceBillType == 'SI' || sourceBillType == 'SC' ||sourceBillType == 'SD')){
            localData.push({code: 'SR', name: $.autoCombo.labelI18n.AcctSaleReceivePayments});
        }else if(isRestore && (sourceBillType == 'PI' || sourceBillType == 'PC' ||sourceBillType == 'PD'
				|| sourceBillType == 'SB' || sourceBillType == 'BE' || sourceBillType == 'K1')){
            localData.push( {code: 'PP', name: $.autoCombo.labelI18n.AcctPurchaseMakePayment});
        }
        localData.push({code: sourceBillType, name: $.autoCombo.labelI18n[billTypeObj[sourceBillType]]});

        return {
            view: {
                colModels: [
                    {name: "code", isHide: true},
                    {name: "name", label: "billType"}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                },
                localData: localData
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

    /*******************************固定资产 s***********************************************/
    /**固定资产卡片的联想控件*/
    faCardAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "id", label: "id", isHide: true},
                {name: "code", label: $.autoCombo.labelI18n.codeCol, width: 150},
                {name: "name", label: $.autoCombo.labelI18n.nameCol, width: 300}

            ],
            singleColumnNotHead: true,
            positionRefer: function(){
                return $(this).parent();
            }
        },
        async: {
            url: App["contextPath"] + "/acct/fa/faCardAutoCombobox.json"
        }
    },

    /**
     * 固定资产折旧方法
     * add by shuang
     */
    getFaCardDeprMethodConfig: function () {
        var faCardDeprMethodEnum= enumUtil.getEnum("faCardDeprMethodEnum");

        return {
            view: {
                colModels: [
                    {name: "value", isHide: true},
                    {name: "name", label: "Name"}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                },
                localData: faCardDeprMethodEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

    /**
     *资产类别
     * add by shuang
     */
    faClassConfig: function () {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.AcctTypeCode},
                    {name: "name", label: $.autoCombo.labelI18n.AcctTypeName, align: "left"},
                    {name: "faDebitSubjectIdName", label: "faDebitSubjectIdName", isHide: true},
                    {name: "faCreditSubjectIdName", label: "faCreditSubjectIdName", isHide: true},
                    {name: "deprCreditSubjectIdName", label: "deprCreditSubjectIdName", isHide: true},
                    {name: "deprDebitSubjectIdName", label: "deprDebitSubjectIdName", isHide: true},
                    {name: "faDebitSubjectId", label: "faDebitSubjectId", isHide: true},
                    {name: "faCreditSubjectId", label: "faCreditSubjectId", isHide: true},
                    {name: "deprDebitSubjectId", label: "deprDebitSubjectId", isHide: true},
                    {name: "deprCreditSubjectId", label: "deprCreditSubjectId", isHide: true}
                ],
                positionRefer: function () {
                    return $(this).parent();
                },
                widthRefer: function () {
                    return $(this).parent().width() + ($(this).siblings('em.icon').width() || 0);
                }
            },
            async: {
                url: App["contextPath"] + "/acct/fa/faClassAutoComboData.json"
            }
        }
    },
    faClassDeprMethodConfig:{
        view: {
            colModels: [
                {name: "selectName", label: "selectName"},
                {name: "selectValue", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            },
            localData: [
                {selectValue: '1', selectName: $.autoCombo.labelI18n.AcctStraightLine},
                {selectValue: '2', selectName: $.autoCombo.labelI18n.AcctDecliningBalance}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**
     * 固资状态
     */
    FaStatusConfig: function(isShowAll) {

        var faCardStatusEnum = enumUtil.getEnum("faCardStatusEnum");

        if (isShowAll) {
            faCardStatusEnum = faCardStatusEnum.slice(0);
            faCardStatusEnum.unshift({value:null,name:$.autoCombo.labelI18n.AcctAll});
        }
        return {
            view: {
                colModels: [
                    {name: "name", label: "name"},
                    {name: "value", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent();
                },
                widthRefer: function () {
                    return $(this).parent().width() + ($(this).siblings('em.icon').width() || 0);
                },
                localData: faCardStatusEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

    /**
     * 分期付款状态
     */
    FaPayStatusConfig: function(isShowAll) {

        var faPayCardStatusEnum = enumUtil.getEnum("faPayCardStatusEnum");

        if (isShowAll) {
            faPayCardStatusEnum = faPayCardStatusEnum.slice(0);
            faPayCardStatusEnum.unshift({value:null,name:$.autoCombo.labelI18n.AcctAll});
        }
        return {
            view: {
                colModels: [
                    {name: "name", label: "name"},
                    {name: "value", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent();
                },
                widthRefer: function () {
                    return $(this).parent().width() + ($(this).siblings('em.icon').width() || 0);
                },
                localData: faPayCardStatusEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

    /*******************************固定资产 e***********************************************/

    /**
     * 单选框国别下拉控件包含全部选项
     * created by huanglb at 20161201
     */
    areaSingleConfigContainAll: {
        view: {
            colModels: [
                {name: "code", align: 'left', label: "Code"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            },
            height: 265,
            isSelectedFirstRow: true,
            isAllowEmpty: false
        },
        async: {
            url: App["contextPath"] + "/vop/bdm/area/getAreaContainAll.json",
            dataSourceType: "onceRemote"
        }
    },


    /**
     * gaf查询类型下拉控件
     * add by lzs 2016.12.1
     */
    gafTypeConfig: function(containsAll){
        var gafTypeEnum = enumUtil.getEnum("gafTypeEnum");   //获得枚举类型
        //添加“全部”选项
        if (containsAll) {
            gafTypeEnum = gafTypeEnum.slice(0);
            gafTypeEnum.unshift({key:0 ,name:"All"});
        }

        return{
            view:{
                colModels:[
                    {name: "name", label: "name"},
                    {name: "key", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                },
                localData: gafTypeEnum,
                isAllowEmpty: false
            },
            async:{
                dataSourceType: "local"
            }
        }
    },

    /**
     * 物料联想控件配置()
     **/
    inventoryConfig: function(stockControl,billType) {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 100},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left", width: 200},
                    {name: "invclassName", label: $.autoCombo.labelI18n.AcctStockGroup, align: "left", width: 150},
					{
						name: "stockControl",
						label: $.autoCombo.labelI18n.stockControlCol,
						align: "center", width: 200,
						formatter:{name:"checkbox"},
						isHide: userInfoUtil.getInvoicingEnabled() || ($.trim(stockControl)!="" ? true : false)
					}
				],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().width() + ($(this).siblings('em.icon').width() || 0);
                }
            },
            async: {
                url: App["contextPath"] + "/acct/stock/getInventoryAutoComboData.json",
				data: {
					stockControl: $.trim(stockControl)!="" ? stockControl: null,
					billType: $.trim(billType)!="" ? billType: null
				}
            }
        }
    },

    /**
     * 代理人下拉控件
     * add by huangs 2016/12/29
     */
    agentConfig: function(closed) {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 70},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left", width: 70}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent().width() ;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/bd/getAgenComboDatas.json",
				requestData: {
					closed: closed
				}
            }
        }
    },

    /**
     * 仓库
     * @returns {{view: {colModels: *[], positionRefer: view.positionRefer, height: number}, async: {url: string}}}
     */
    warehouseConfig: function() {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 70},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left", width: 100}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent().width() ;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/bd/getAcctWarehouseAutoComboData.json"
            }
        }
    },

    projectConfig: function() {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 70},
                    {name: "name", label: $.autoCombo.labelI18n.displayCode, align: "left", width:100, wordBreak: "break-word"},
					{name: "remark1", label: $.autoCombo.labelI18n.projectName, align: "left", width: 150, wordBreak: "break-word"}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return 350;
                }

            },
            async: {
                url: App["contextPath"] + "/acct/bd/getProjectAutoComboDatas.json"
            }
        }
    },

    /**
     *
     * @returns {{view: {colModels: *[], positionRefer: view.positionRefer, height: number}, async: {url: string}}}
     */
    partnerAddressConfig: function(partnerId) {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "addressName", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 200}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent().width() ;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/partner/getPartnerAddressDatas.json",
                requestData: {
                    partnerId: partnerId
                }
            }
        }
    },

    /**
     * 员工
     * add by kehuang 2016/01/03
     */
    employeeConfig: function() {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 70},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left", width: 70}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent().width() ;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/partner/getEmployeeAutoComboData.json"
            }
        }
    },

    /**
     * 结算方式的联想控件
     * add by huangs
     * @returns {{view: {colModels: *[], singleColumnNotHead: boolean, positionRefer: view.positionRefer, widthRefer: view.widthRefer, localData: *}, async: {dataSourceType: string}}}
     */
    costingMethodAutoComboboxConfig: function() {

        var costingMethodEnum = enumUtil.getEnum("costingMethodEnum");

        return {
            view: {
                colModels: [
                    {name: "name", label: "name"},
                    {name: "value", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true);
                },
                localData: costingMethodEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

    /**
     * 计量单位
     * add by huangs
     * @returns {{view: {colModels: *[], singleColumnNotHead: boolean, positionRefer: view.positionRefer, widthRefer: view.widthRefer}, async: {url: string}}}
     */
    measdocConfig: function() {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 70, isHide: true},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left", width: 70}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent().width() ;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/bd/getUomComboDatas.json"
            }
        }
    },

    //物料组联想控件
    invclassConfig: function() {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 70},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left", width: 70}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                widthRefer: function () {
                    return $(this).parent().parent().width() ;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/bd/getAcctInvclassAutoComboData.json"
            }
        }
    },

    /**
     *closingStock 联想控件
     *add by kehuang 2016/01/18
     **/
    acctClosingStockAutoComboboxByConfig: function(ruleId){
        return {
            view: {
                colModels: [
                    {name: "closingStockSubjectId", isHide: true},
                    {name: "closingStockSubjectCode", label: $.autoCombo.labelI18n.AcctSubjectCode, align: "left", width: 150},
                    {name: "closingStockSubjectName", label: $.autoCombo.labelI18n.AcctSubjectName, align: "left", width: 200}
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                }
                ,height : 350
            },
            async: {
                url: App["contextPath"] + "/acct/setup/getAcctClosingStockAutoComboData.json",
                requestData: {ruleId: ruleId}
            }
        }
    },

    /**
     *closingStock 联想控件
     **/
    finishStatusAutoComboboxByConfig: function(){
        var finishStatusEnum = enumUtil.getEnum("finishStatusEnum");

        finishStatusEnum = finishStatusEnum.slice(0);
        finishStatusEnum.unshift({value:null,name:$.autoCombo.labelI18n.AcctAll});
        return {
            view: {
                colModels: [
                    {name: "name", label: "name"},
                    {name: "value", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) + 12;
                },
                localData: finishStatusEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },
    /**
     * 单据付款状态下拉
     **/
    billFinishStatusAutoComboboxByConfig: function(){
        var finishStatusEnum = enumUtil.getEnum("billFinishStatusEnum");

        finishStatusEnum = finishStatusEnum.slice(0);
        finishStatusEnum.unshift({value:null,name:$.autoCombo.labelI18n.AcctAll});
        return {
            view: {
                colModels: [
                    {name: "name", label: "name"},
                    {name: "value", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) + 12;
                },
                localData: finishStatusEnum
            },
            async: {
                dataSourceType: "local"
            }
        }
    },

	/**
	 * 单据生成方式 联想控件
	 * add by zhangyx on 2017-11-08
	 **/
	generalMethodAutoComboboxByConfig: function(){
		var generalMethodEnum = enumUtil.getEnum("generalMethodEnum");

		generalMethodEnum = generalMethodEnum.slice(0);
		generalMethodEnum.unshift({value:null,name:$.autoCombo.labelI18n.AcctAll});
		return {
			view: {
				colModels: [
					{name: "name", label: "name"},
					{name: "value", isHide: true}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) + 12;
				},
				localData: generalMethodEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

	/**
	 * 单据生成方式(带复制类型) 联想控件
	 * add by zhangyx on 2018-06-04
	 **/
	generalMethodWithCopyAutoComboboxByConfig: function(){
		var generalMethodEnum = enumUtil.getEnum("generalMethodEnumWithCopy");

		generalMethodEnum = generalMethodEnum.slice(0);
		generalMethodEnum.unshift({value:null,name:$.autoCombo.labelI18n.AcctAll});
		return {
			view: {
				colModels: [
					{name: "name", label: "name"},
					{name: "value", isHide: true}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) + 12;
				},
				localData: generalMethodEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},


	/**参数设置邮件发送发票模板
     * add by kehuang    2017-4-12
     **/
    emailFormat: {
        view: {
            colModels: [
                {name: "SEPF001index", label: ""},
                {name: "SEPF001", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {"SEPF001index": "Simple", "SEPF001": "0"},
                {"SEPF001index": "Standard", "SEPF001": "1"},
                {"SEPF001index": "Classic", "SEPF001": "2"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**
     * 查询所有代理商单选控件 add by lzs on 20170414
     */
    resellerConfig: function(isActive) {
        return {
            view: {
                colModels: [
                    {name: "resellerName", label: ""},
                    {name: "id", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/vop/rnm/reseller/resellerAutoCombobox.json",
                requestData: {isActive : isActive}
            }
        }
    },

    /**
     * 代理商销售人员 add by lzs on 20170418
     */
    salesmanConfig: function(isActive) {
        return {
            view: {
                colModels: [
                    {name: "salesmanName", label: ""},
                    {name: "id", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/vop/rnm/salesman/salesmanAutoCombobox.json",
                requestData: {isActive : isActive}
            }
        }
    },

    /**
     * 查询代理商的渠道 add by lzs on 20170420
     */
    resellerPartnerConfig: function(isActive) {
        return {
            view: {
                colModels: [
                    {name: "name", label: ""},
                    {name: "id", isHide: true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                }
            },
            async: {
                url: App["contextPath"] + "/vop/rnm/resellerPartner/resellerPartnerAutoCombobox.json",
                requestData: {isActive : isActive}
            }
        }
    },

    /**
     * 启用或禁用状态下拉框
     * add by kehuang    2017-4-19
     **/
    statusConfig: {
        view: {
            colModels: [
                {name: "status001", label: ""},
                {name: "status", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {"status001": i18n["vop.rnm.status3"], "status": ""},
                {"status001": i18n["vop.rnm.status0"], "status": "0"},
                {"status001": i18n["vop.rnm.status1"], "status": "1"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**
     * isClosed启用、禁用下拉控件
     * @author huanglb
     */
    isClosedConfig: {
        view: {
            colModels: [
                {name: "text", label: "状态", align: "left"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            },
            localData: [
                {"text": i18n["application.common.label.isClosed.all"], "value": ""},
                {"text": i18n["application.common.label.isClosed.enable"], "value": "0"},
                {"text": i18n["application.common.label.isClosed.disable"], "value": "1"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },


    /**
     * 用户启用、禁用下拉控件
     * 竟然都没人抽出一个通用的？
     * @author huanglb
     */
    userStatusConfig: {
        view: {
            colModels: [
                {name: "text", label: "状态", align: "left"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            },
            localData: [
                {"text": i18n["application.common.label.isClosed.all"], "value": ""},
                {"text": i18n["application.common.label.isClosed.enable"], "value": "1"},
                {"text": i18n["application.common.label.isClosed.disable"], "value": "0"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

	/**
	 * 用户状态列表，复制一个，采用不同的国际化值
	 * @author lbhuang
	 */
    userStatusConfig2: {
        view: {
            colModels: [
                {name: "text", label: "状态", align: "left"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            },
            localData: [
                {"text": i18n["application.common.label.isClosed.all"], "value": ""},
                {"text": i18n["application.common.label.active"], "value": "1"},
                {"text": i18n["application.common.label.inactive"], "value": "0"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

	/**
	 * 用户类型下拉框
	 * 全部、会计师、区域管理员、终端用户
	 * @author lbhuang
	 */
	userTypeConfig: {
		view: {
			colModels: [
				{name: "text", label: "用户类型", align: "left"}
			],
			singleColumnNotHead: true,
			positionRefer: function () {
				return $(this).parent("label");
			},
			widthRefer: function () {
				return $(this).parent("label").outerWidth() - 2;
			},
			localData: [
				{"text": i18n["application.common.label.isClosed.all"], "value": ""},
				{"text": i18n["vop.ssm.entity.user.userType.partnerAdmin"], "value": "03"},
				{"text": i18n["vop.ssm.entity.user.userType.regAcc"], "value": "04"},
				{"text": i18n["vop.ssm.entity.user.userType.areaAdmin"], "value": "14"},
				{"text": i18n["vop.ssm.entity.user.userType.endUser"], "value": "15"}
			]
		},
		async: {
			dataSourceType: "local"
		}
	},

    /**参数设置excel导出格式
     * add by kehuang    2017-5-17
     **/
    excelExportTemplate: {
        view: {
            colModels: [
                {name: "EET001index", label: ""},
                {name: "EET001", isHide: true}
            ],
            singleColumnNotHead: true,
            isAllowEmpty:false,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {"EET001index": "ImageAccount Format ", "EET001": "0"},
                {"EET001index": "SQL Format", "EET001": "1"}
                //{"EET001index": "UBS Format", "EET001": "2"},
                //{"EET001index": "Autocount Format", "EET001": "3"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },
    /**参数设置打印字体设置
     * add by kehuang    2017-6-30
     **/
    printFontsTemplate: {
        view: {
            colModels: [
                {name: "PF001index", label: ""},
                {name: "PF001", isHide: true}
            ],
            singleColumnNotHead: true,
            isAllowEmpty:false,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {"PF001index": "Arial", "PF001": "0"},
                {"PF001index": "Times New Roman(Not support Chinese)", "PF001": "1"},
                {"PF001index": "Calibri (Not support Chinese)", "PF001": "2"},
                {"PF001index": "Century (Not support Chinese)", "PF001": "3"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    /****************************K1 FORM*************************************/
    /**
     * 采购发票税码为IM 的供K1 form选择使用
     *
     */
    getPurchaseTaxIMConfig: function () {
        return {
            view: {
                colModels: [
                    {name: "type", isHide: true},
                    {name: "supplierId", isHide: true},
                    {name: "currId", isHide: true},
                    {name: "billDate", isHide: true},
                    {name: "k1FormGst", isHide: true},
                    {name: "k1FormTaxRate", isHide: true},
                    {name: "recordVersion", isHide: true},
                    {name: "typeName", label: $.autoCombo.labelI18n.AcctBillType, width: 130},
                    {name: "supplierName", label: $.autoCombo.labelI18n.Supplier, width: 130},
                    {name: "strInvoiceDate", label: $.autoCombo.labelI18n.AcctBillDate,align: "center", width: 120},
                    {name: "refNo", label: $.autoCombo.labelI18n.RefNo , align: "left", width: 120},
                    {name: "journalNo", label:  $.autoCombo.labelI18n.AcctJournalNo  , align: "left", width: 120},
                    {name: "totalAmt", label: $.autoCombo.labelI18n.LocalAmt , align: "left", width: 100,
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "currCode", label: $.autoCombo.labelI18n.InventoryCurr  , align: "left", width: 90},
                    {name: "totalOriginAmt", label: $.autoCombo.labelI18n.OriginAmt, align: "right", width: 120,
                        formatter: {
                            name: "currency",
                            decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    },
                    {name: "exchangeRate", label: $.autoCombo.labelI18n.ExchangeRate, align: "right", width: 100,
                        formatter: {
                            name: "currency",
                            decimalPlaces: 4,//取参数表的 金额小数位数
                            thousandsSeparator: ","
                        }
                    }
                ],
                positionRefer: function () {
                    return $(this).parent().parent("div");
                },
                width: 850,
                height: 300
            },
            async: {
                url: App["contextPath"] + "/acct/purchase/purchaseInvoice/getPurcharseInvoiceTaxIMGDSAutoCombobox.json"
            }
        };
    },

    /**
     * 获取往来单位供应商
     * partnerType 往来单位类型(1-供应商,2-客户,3-客户兼供应商)
     * @author huanglb
     */
    getAcctSupplierPartnerConfig: {
        view: {
            forceHideHead: true,
            isRememberValue: false,
            colModels: [
                {name: "id", isHide: true},
                {name: "code", label: $.autoCombo.labelI18n.codeCol, isHide: true},
                {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left"}
            ],
            positionRefer: function () {
                return $(this).closest("div");
            },
            widthRefer: function () {
                return $(this).closest("div").width() - 2;
            }
        },
        async: {
            url: App["contextPath"] + "/acct/partner/getAcctSupplierPartner.json"
        }
    },
    //其他人员联想控件
    otherPartnerConfig: function() {
        return {
            view: {
                colModels: [
                    {name: "id", isHide: true},
                    {name: "code", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 70},
                    {name: "name", label: $.autoCombo.labelI18n.nameCol, align: "left", width: 70},
                    {name: "icNo", label: "icNo", isHide:true}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).closest("label");
                },
                widthRefer: function () {
                    return $(this).closest("label").width() ;
                }
            },
            async: {
                url: App["contextPath"] + "/acct/partner/getOtherPartnerAutoComboData.json"
            }
        }
    },

    /**
     * 用户启用、禁用下拉控件
     * 竟然都没人抽出一个通用的？
     * @author huanglb
     */
    handleStatusConfig: {
        view: {
            colModels: [
                {name: "text", label: "状态", align: "left"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            },
            localData: [
                {"text": i18n["application.common.label.isClosed.all"], "value": ""},
                {"text": i18n["application.common.label.handleStatus.unhandle"], "value": "0"},
                {"text": i18n["application.common.label.handleStatus.manualHandle"], "value": "1"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    presetEmailDomainConfig: {
        view: {
            colModels: [
                {name: "selectName", label: "selectName"},
                {name: "selectValue", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {selectValue: 'onlyou.com', selectName: 'onlyou.com'},
                {selectValue: 'gmail.com', selectName: 'gmail.com'},
                {selectValue: 'yahoo.com', selectName: 'yahoo.com'},
                {selectValue: 'live.com', selectName: 'live.com'},
                {selectValue: i18n["application.common.label.customize"], selectName: i18n["application.common.label.customize"]}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    sendStatusAutoComboboxConfig: {
        view: {
            colModels: [
                {name: "text", label: "状态", align: "left"}
            ],
                singleColumnNotHead: true,
                positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            },
            localData: [
                {"text": i18n["acct.bill.grid.emailSendStatus.All"], "value": ""},
                {"text": i18n["acct.bill.grid.emailSendStatus.NotSend"], "value": "0"},
                {"text": i18n["acct.bill.grid.emailSendStatus.Sent"], "value": "1"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },

    /**
     * 发送邮件类型下拉框控件
     * kehuang 2017-8-18
     */
    emailTypeAutoComboboxConfig: function (containsAll) {
        var emailBizEnum = enumUtil.getEnum("emailBizEnum");   //获得枚举类型
        //添加“全部”选项
        if (containsAll) {
            emailBizEnum = emailBizEnum.slice(0);
            emailBizEnum.unshift({name:"All"});
        }
        return{
            view:{
                colModels:[
                    {name: "name", label: "name"}
                ],
                singleColumnNotHead: true,
                positionRefer: function () {
                    return $(this).parent("label");
                },
                widthRefer: function () {
                    return $(this).parent("label").outerWidth(true) - 2;
                },
                localData: emailBizEnum
            },
            async:{
                dataSourceType: "local"
            }
        }
    },
    /**
     * 发送邮件状态：成功、失败
     * add by kehuang    2017-8-18
     **/
    sendStatusConfig: {
        view: {
            colModels: [
                {name: "statusName", label: ""},
                {name: "status", isHide: true}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {"statusName": "Failed", "status": 0},
                {"statusName": "Succeed", "status": 1}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    },
    /** 模板类型功能枚举 **/
	tplTypeFuncTypeConfig: {
        view: {
            colModels: [
                {name: "name", label: "", align: 'left'}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                //联想控件输入框 和 "三个点"，被父<label>包着。
                //下拉层的定位参照 是父<label>
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            }
        },
        async: {
			url: App["contextPath"] + "/vop/enum/reportFuncType.json",
			dataSourceType: "onceRemote"
        }
    },
    /** 模板类型归属枚举 **/
    tplTypeBelongConfig: {
        view: {
            colModels: [
                {name: "name", label: "", align: 'left'}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                //联想控件输入框 和 "三个点"，被父<label>包着。
                //下拉层的定位参照 是父<label>
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            }
        },
        async: {
            url: App["contextPath"] + "/vop/enum/reportBelong.json",
			dataSourceType: "onceRemote"
        }
    },
    /** 模板类型查询 **/
	reportTypeConfig: {
        view: {
            colModels: [
                {name: "name", label: "", align: 'left'}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                //联想控件输入框 和 "三个点"，被父<label>包着。
                //下拉层的定位参照 是父<label>
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth() - 2;
            }
        },
        async: {
			url: App["contextPath"] + "/vop/tpm/type/autoCombox.json"
        }
    },

    /*****************************************************************/

    /** 凭证create mode  add by lzs on 20171031*/
    voucherCreateModeConfig: function() {
		var voucherCreateModeEnum = enumUtil.getEnum("voucherCreateModeEnum");
		return{
			view:{
				colModels:[
					{name: "code", isHide: true},
					{name: "name", label: "name"}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData: voucherCreateModeEnum
			},
			async:{
				dataSourceType: "local"
			}
		}
	},

	//公告状态 已发布 未发布 add by lzs on 20171123
	noticeStatusConfig: {
		view: {
			colModels: [
				{name: "name", label: ""},
				{name: "code", isHide: true}
			],
			singleColumnNotHead: true,
			positionRefer: function () {
				return $(this).parent("label");
			},
			widthRefer: function () {
				return $(this).parent("label").outerWidth(true) - 2;
			},
			localData: [
				{"name": i18n["ssm.page.notice.allStatus"], "code": ""},
				{"name": i18n["ssm.page.notice.noPublish"], "code": "0"},
				{"name": i18n["ssm.page.notice.hasPublish"], "code": "1"},
				{"name": i18n["ssm.page.notice.publishSuccess"], "code": "2"}
			]
		},
		async: {
			dataSourceType: "local"
		}
	},

	/*****************************凤巢改造js扩展开始huangs******************************************************/

	billUploadStatusEnumConfig: function(){
		return{
			view:{
				colModels:[
					{name: "value", isHide: true},
					{name: "name", label: "name"}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("div");
				},
				widthRefer: function () {
					return $(this).parent("div").outerWidth(true) - 2;
				}
			},
			async: {
				url: App["contextPath"] + "/vop/enum/getBillUploadStatusEnum.json",
				dataSourceType: "onceRemote"
			}
		}
	},
	ocrIdentificationConfig: function(){
		var rowDatas = [
			{value:"",name:i18n["vop.bil.upload.imageType.all"]},
			{value:"1",name:i18n["vop.bil.upload.ocrIdentification.yes"]},
			{value:"0",name:i18n["vop.bil.upload.ocrIdentification.no"]}
		];
		return{
			view:{
				colModels:[
					{name: "value", isHide: true},
					{name: "name", label: "name"}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("div");
				},
				widthRefer: function () {
					return $(this).parent("div").outerWidth(true) - 2;
				},
				localData: rowDatas
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

	/**
	 * 渠道管理中的财务设置固定资产折旧方法
	 * add by shuang
	 */
	getPartnerFaCardDeprMethodConfig: function () {

		return {
			view: {
				colModels: [
					{name: "value", isHide: true},
					{name: "name", label: "Name"}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				}
			},
			async: {
				url: App["contextPath"] + "/vop/enum/getPartnerFaCardDeprMethodConfig.json",
				dataSourceType: "onceRemote"
			}
		}
	},

	/**
	 * 渠道管理员中的会计科目联想控件配置()
	 * ruleId 科目体系ID
	 **/
	partnerAcctSubjectAutoComboboxByRuleIdConfig: function(ruleId){
		return {
			view: {
				colModels: [
					{name: "id", isHide: true},
					{name: "subjectTypeItemStr", label: $.autoCombo.labelI18n.AcctSubjectType , align: "left", width: 100},
					{name: "subjectCode", label: $.autoCombo.labelI18n.AcctSubjectCode, align: "left", width: 150},
					{name: "subjectName", label: $.autoCombo.labelI18n.AcctSubjectName, align: "left", width: 200}
				],
				positionRefer: function () {
					return $(this).parent();
				},
				height : 350
			},
			async: {
				url: App["contextPath"] + "/os/vop/bdm/getAcctSubjectAutoComboData.json",
				requestData: {ruleId: ruleId}
			}
		}
	},

	//科目体系下拉框配置
	partnerAcctRuleAutoComboboxConfig:function(){
		return{
			view: {
				colModels: [
					{name: "id", isHide: true},
					{name: "orgType", isHide: true},
					{name: "code", label: "code", width: 25},
					{name: "name", label: "name", align: "left"},
					{name: "countryCode", label: "countryCode", align: "left", width: 25, isHide: pageObj.isEdit ? pageObj.isEdit : true}
				],
				singleColumnNotHead: true,
				forceHideHead: true,
				positionRefer: function () {
					return $(this).parent();
				},
				widthRefer: function () {
					return $(this).parent().outerWidth();
				}
			},
			async: {
				url:  App["contextPath"] + "/os/vop/bdm/getAcctRuleAutoComboData.json",
				dataSourceType: "onceRemote"
			}
		}

	},
	/*****************************凤巢改造js扩展结束huangs******************************************************/

	//gst税码类型 1采购  2销售   add by lzs
	gstTaxSource: {
		view:{
			colModels:[
				{name: "value", isHide: true},
				{name: "name", label: "name"}
			],
			singleColumnNotHead: true,
			positionRefer: function () {
				return $(this).parent().parent("div");
			},
			widthRefer: function () {
				return $(this).parent().parent("div").outerWidth(true) - 2;
			},
			localData: [
				{value:"1",name:i18n["acct.gst.taxRateEntity.taxSource.purchase"]},
				{value:"2",name:i18n["acct.gst.taxRateEntity.taxSource.sale"]}
			]
		},
		async: {
			dataSourceType: "local"
		}
	},

	//获取超管的标准税码 add by lzs on 20171215
	standardGstCode: function(taxSource, ruleId) {
		return {
			view: {
				colModels: [
					{name: "id", isHide: true},
					{name: "taxSourceStr", label: $.autoCombo.labelI18n.AcctTaxSource, align: "center"},
					{name: "taxCode", label: $.autoCombo.labelI18n.AcctTaxCode, align: "center"},
					{name: "taxRate", label: $.autoCombo.labelI18n.AcctTaxRate, align: "left", isHide: true},
					{name: "taxRateStr", label: $.autoCombo.labelI18n.AcctTaxRate, align: "center"}
				],
				positionRefer: function () {
					return $(this).parent().parent("div");
				},
				widthRefer: function () {
					return $(this).parent().parent("div").outerWidth();
				},
				height : 350
			},
			async: {
				url: App["contextPath"] + "/acct/gst/getSuperAdminTaxRateAutoCombobox.json",
				dataSourceType: "onceRemote",
				requestData: {taxSource: taxSource, ruleId: ruleId}
			}
		}
	},

	//获取影像日志类型 add by lzs on 20180118
	imageBillLogType: function(containsAll){
		var logEnum = enumUtil.getEnum("imageLogEnum");   //获得枚举类型
		//添加“全部”选项
		if (containsAll) {
			logEnum = logEnum.slice(0);
			logEnum.unshift({code:"all",name:$.autoCombo.labelI18n.AcctAll});
		}

		return{
			view:{
				colModels:[
					{name: "name", label: "name"},
					{name: "code", isHide: true}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData: logEnum
			},
			async:{
				dataSourceType: "local"
			}
		}
	},

	//仪表盘日期条件选择下拉框 add by lzs on 20180402
	dashBoardTimeCombobox: function(needWeek){
		var data = [
			{name: "This Month", value: "1", unit: "(Week)"},
			{name: "Last Month", value: "2", unit: "(Week)"},
			{name: "This Year", value: "3", unit: "(Quarter)"},
			{name: "This Quarter", value: "4", unit: "(Month)"}
		];
		if (needWeek) {
			data.unshift({name: "This Week", value: "0", unit: "(Day)"});
		}

		return {
			view: {
				colModels: [
					{name: "name", label: ""},
					{name: "value", isHide: true},
					{name: "unit", isHide: true}
				],
				singleColumnNotHead: true,
				isAllowEmpty:false,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 10;
				},
				localData: data
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

	/**账务迁移状态下拉控件
	 * add by kehuang    2018-7-13
	 **/
	moveTransactionStatus: {
		view: {
			colModels: [
				{name: "Statusindex", label: ""},
				{name: "Status", isHide: true}
			],
			singleColumnNotHead: true,
			isAllowEmpty:false,
			positionRefer: function () {
				return $(this).parent("label");
			},
			widthRefer: function () {
				return $(this).parent("label").outerWidth(true) - 2;
			},
			localData: [
				{"Statusindex": "Moveable", "Status": "0"},
				{"Statusindex": "Bank Reconciled", "Status": "1"},
				{"Statusindex": "Period Lock", "Status": "2"},
				{"Statusindex": "Year End", "Status": "3"},
				{"Statusindex": "All", "Status": ""}
			]
		},
		async: {
			dataSourceType: "local"
		}
	},

	/**
	 * 结算方式账户类型下拉
	 * @author hongjinqiu 2018.09.11
	 */
	getBankAccountTypeConfig: function (containsAll) {
		var bankAccountTypeEnum = enumUtil.getEnum("bankAccountTypeEnum");

		if (containsAll) {
			bankAccountTypeEnum = bankAccountTypeEnum.slice(0);
			bankAccountTypeEnum.unshift({value:0,name:$.autoCombo.labelI18n.AcctAll});
		}

		return {
			view: {
				colModels: [
					{name: "value", label: "value", isHide: true},
					{name: "name", label: "name", isHide: false}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent("label");
				},
				widthRefer: function () {
					return $(this).parent("label").outerWidth(true) - 2;
				},
				localData:bankAccountTypeEnum
			},
			async: {
				dataSourceType: "local"
			}
		}
	},

	sstTaxRateConfig: function (billType) {
		return {
			view: {
				isRememberValue: true,
				colModels: [

					{name: "id", isHide: true},
					{name: "taxCode", label: $.autoCombo.labelI18n.sstCode, align: "center"},
					{name: "taxRateStr", label: $.autoCombo.labelI18n.sstRate, align: "left"},
					{name: "taxRate", label: $.autoCombo.labelI18n.sstRate, align: "left", isHide: true},
					{name: "type", label: $.autoCombo.labelI18n.AcctBillType, align: "center", isHide: true},
					{name: "typeStr", label: $.autoCombo.labelI18n.AcctBillType, align: "center"}

				],
				positionRefer: function () {
					return $(this).parent().parent("div");
				},
				widthRefer: function () {
					return $(this).parent().parent("div").outerWidth(true) - 2;
				}
			},
			async: {
				dataSourceType: "onceRemote",
				url: App["contextPath"] + "/acct/sst/getSSTTaxRateAutoCombobox.json",
				requestData: {
					billType: billType
				}
			}
		}
	},

	tariffCodeConfig: function (nullLine) {
		return {
			view: {
				colModels: [
					{name: "id", isHide: true},
					{name: "typeStr", label:  $.autoCombo.labelI18n.tariffType, align: "left", width: 80},
					{name: "code", label:  $.autoCombo.labelI18n.tariffCode, align: "left", width: 100},
					{name: "description", label:  $.autoCombo.labelI18n.tariffDescription, align: "left", width: 220, wordBreak: "break-word"}
				],
				positionRefer: function () {
					return $(this).parent().parent("div");
				},
				widthRefer: function () {
					return $(this).parent().parent("div").outerWidth(true) - 2;
				}
			},
			async: {
				url: App["contextPath"] + "/acct/sst/getTariffCodeComboDatas.json",
				requestData:{
					nullLine: nullLine
				}
			}
		}
	},

	/** GST上报纳税人的联想控件*/
	SSTtaxPayerAutoComboboxConfig: {
		view: {
			colModels: [
				{name: "icNo", label: "icNo", isHide: true},
				{name: "sign", label: "sign", isHide: true},
				{name: "signDate", label: "signDate", isHide: true},
				{name: "name", label: "name"}
			],
			isRememberValue: false,
			singleColumnNotHead: true,
			positionRefer: function () {
				return $(this).parent().parent("div");
			},
			widthRefer: function () {
				return $(this).parent().parent("div").outerWidth(true) - 2;
			}
		},
		async: {
			url: App["contextPath"] + "/acct/sst/getSSTTaxPayerAutoComboData.json"
		}
	},

	//==================================极简开票===================================================//
	smAddressConfig: function() {
		return {
			view: {
				colModels: [
					{name: "id", isHide: true},
					{name: "address", label: $.autoCombo.labelI18n.codeCol, align: "left", width: 290}
				],
				singleColumnNotHead: true,
				positionRefer: function () {
					return $(this).parent();
				},
				widthRefer: function () {
					return 300;
				}
			},
			async: {
				url: App["contextPath"] + "/acct/smAddress/getSmAddressAutoComboDatas.json"
			}
		}
	},

	/**
	 * 渲染所有联想控件
	 */
	render: function () {
		//
		$("input[componentType='auto-combobox']").each(function (index, inputEl) {
			var $inputEl = $(inputEl),
				componentConfigName = $inputEl.attr("componentConfig"),
				componentConfigArg = $inputEl.attr("componentConfigArg"),
				componentConfigExt = $inputEl.attr("componentConfigExt"),
				bindFill = $inputEl.attr('bindFill') ? JSON.parse($inputEl.attr('bindFill')) : {},
				componentConfig = {};
			if (!componentConfig) {
				return;
			}
			if ($.isFunction(AutoComboboxUtil[componentConfigName]) && componentConfigArg && $.isArray($.parseJSON(componentConfigArg))) {
				componentConfig = AutoComboboxUtil[componentConfigName].apply(AutoComboboxUtil, $.parseJSON(componentConfigArg));
			} else if ($.isFunction(AutoComboboxUtil[componentConfigName])) {
				componentConfig = AutoComboboxUtil[componentConfigName].call(AutoComboboxUtil);
			} else if ($.isPlainObject(AutoComboboxUtil[componentConfigName])) {
				componentConfig = AutoComboboxUtil[componentConfigName];
			}
			if ($.isFunction(eval(componentConfigExt))) {
				componentConfig = $.extend(true, {}, componentConfig, {view: {"bindFill": bindFill}}, eval(componentConfigExt)());
			} else {
				componentConfig = $.extend(true, {}, componentConfig, {view: {"bindFill": bindFill}}, eval(componentConfigExt));
			}
			//渲染控件
			$inputEl.AutoCombobox(componentConfig);
		});
		$("[componentType='auto-combobox-trigger']").each(function (index, elm) {
			var $elm = $(elm),
				triggerElementId = $elm.attr("triggerElementId");
			if (triggerElementId) {
				$elm.bind("click", function (event) {
					$("#" + triggerElementId).AutoCombobox("triggerAction", event);
				});
			} else {
				alert("没有配置triggerElementId");
			}
		});
	}
};