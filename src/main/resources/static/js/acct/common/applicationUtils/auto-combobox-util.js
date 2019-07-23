// /**
//  * denpendence: [AutoCombobox]
//  */
// var App = App || {}, AutoComboboxUtil = {
//
//     /** 凤巢所属行业联想控件配置*/
//     vopCodeEntityAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "id", isHide: true},
//                 {name: "code", label: i18n["acct.autoCombobox.colName.code"]},
//                 {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left"}
//             ],
//             pageSize: 10,
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             widthRefer: function () {
//                 return $(this).parent().parent("div").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             url: App["contextPath"] + "/acct/partner/getVopCodeEntityData.json"
//         }
//     },
//
//     /** 币别联想控件配置*/
//     currencyAutoComboboxConfig: {
//         view: {
//             forceHideHead: true,
//             isRememberValue: true,
//             colModels: [
//                 {name: "id", isHide: true},
//                 {name: "currCode", label: i18n["acct.setup.CurrencyEntity.currCode"], align: "left"},
//                 {name: "currName", label: i18n["acct.setup.CurrencyEntity.currName"], align: "left", isHide: true}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             widthRefer: function () {
//                 return $(this).parent().parent("div").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             dataSourceType: "onceRemote",
//             url: App["contextPath"] + "/acct/setup/getCurrencyAutoComboData.json"
//         }
//     },
//
//     /** 是否赤字控制联想控件配置*/
//     deficitAutoComboboxConfig: {
//         view: {
//             singleColumnNotHead: true,
//             colModels: [
//                 {name: "code", label: i18n["acct.autoCombobox.colName.code"], isHide: true},
//                 {name: "name", label:i18n["acct.autoCombobox.colName.name"], align: "left"}
//             ],
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             widthRefer: function () {
//                 return $(this).parent().parent("div").outerWidth(true) - 2;
//             },
//             localData: [{code: 1, name: i18n["acct.setup.AcctSubjectVo.NonControl"]},{code: 2, name: i18n["acct.setup.AcctSubjectVo.Remind"]},{code: 3, name: i18n["acct.setup.AcctSubjectVo.Control"]}]
//         },
//         async: {dataSourceType: "local"}
//     },
//
//     /** 科目体系联想控件配置*/
//     acctRuleAutoComboboxConfig: {
//         view: {
//             forceHideHead: true,
//             isRememberValue: true,
//             singleColumnNotHead: true,
//             colModels: [
//                 {name: "id", isHide: true},
//                 {name: "code", label: i18n["acct.autoCombobox.colName.code"]},
//                 {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left"}
//             ],
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             widthRefer: function () {
//                 return $(this).parent().parent("div").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             dataSourceType: "onceRemote",
//             url: App["contextPath"] + "/acct/setup/getAcctRuleAutoComboData.json"
//         }
//     },
//
//     /** 会计科目联想控件配置()*/
//     acctSubjectAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "id", isHide: true},
//                 {name: "subjectTypeItemStr", label: i18n["acct.setup.AcctSubjectEntity.subjectTypeName"] , align: "left", width: 100},
//                 {name: "subjectCode", label: i18n["acct.setup.AcctSubjectEntity.subjectCode"], align: "left", width: 150},
//                 {name: "subjectName", label: i18n["acct.setup.AcctSubjectEntity.subjectName"], align: "left", width: 200}
//             ],
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             height : 350
//             /*,
//              widthRefer: function () {
//              return $(this).parent().parent("div").outerWidth(true) - 2;
//              }*/
//         },
//         async: {
//             url: App["contextPath"] + "/acct/voucher/getAcctSubjectAutoComboData.json"
//         }
//     },
//     /**
//      * 会计科目联想控件配置()
//      * ruleId 科目体系ID
//      **/
//     acctSubjectAutoComboboxByRuleIdConfig: function(ruleId){
//        return {
//            view: {
//                colModels: [
//                    {name: "id", isHide: true},
//                    {name: "subjectTypeItemStr", label: i18n["acct.setup.AcctSubjectEntity.subjectTypeName"] , align: "left", width: 100},
//                    {name: "subjectCode", label: i18n["acct.setup.AcctSubjectEntity.subjectCode"], align: "left", width: 150},
//                    {name: "subjectName", label: i18n["acct.setup.AcctSubjectEntity.subjectName"], align: "left", width: 200}
//                ],
//                positionRefer: function () {
//                    return $(this).parent().parent("div");
//                },
//                height : 350
//            },
//            async: {
//                url: App["contextPath"] + "/acct/voucher/getAcctSubjectAutoComboData.json",
//                data: {ruleId: ruleId}
//            }
//        }
//     },
//
//     /**
//      * 期末结转科目联想控件配置
//      * ruleId 科目体系ID
//      * subjectType 科目类型
//      **/
//     acctSubjectAutoComboboxBySubjectTypeConfig: function(ruleId, subjectType){
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "subjectCode", label: i18n["acct.setup.AcctSubjectEntity.subjectCode"], align: "left", width: 150},
//                     {name: "subjectName", label: i18n["acct.setup.AcctSubjectEntity.subjectName"], align: "left", width: 200}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 height : 350
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/setup/getCostOfSaleAutoComboData.json",
//                 data: {ruleId: ruleId, subjectType: subjectType}
//             }
//         }
//     },
//
//     /**
//      * 查询库存期末设置列表数据
//      **/
//     acctSubjectAutoComboboxByCSSConfig: function(){
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.stock.StockTransferEntity.code"], align: "left", width: 150},
//                     {name: "closingStockSubjectName", label: i18n["acct.stock.StockTransferEntity.closingStockSubjectId"], align: "left", width: 220}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 height : 350
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/setup/getQueryGridOfCSS.json"
//             }
//         }
//     },
//
//     /**
//      * 物料组会计科目联想控件配置()
//      * height 弹窗高度
//      * ruleId 科目体系ID
//      * add by kehuang   2017/01/24
//      **/
//     acctSubjectAutoComboboxByHeightConfig: function(ruleId,height){
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "subjectTypeItemStr", label: i18n["acct.setup.AcctSubjectEntity.subjectTypeName"] , align: "left", width: 100},
//                     {name: "subjectCode", label: i18n["acct.setup.AcctSubjectEntity.subjectCode"], align: "left", width: 150},
//                     {name: "subjectName", label: i18n["acct.setup.AcctSubjectEntity.subjectName"], align: "left", width: 200}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 height : height?height:350
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/voucher/getAcctSubjectAutoComboData.json",
//                 data: {ruleId: ruleId}
//             }
//         }
//     },
//
//     /**
//      * 银行名称联想控件配置
//      * 从数据字典表获取的数据（即将废弃20161202)
//      * created by huanglb at 2015-12-10
//      */
//     acctBankAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "id", isHide: true},
//                 {name: "codeValue", label: i18n["acct.autoCombobox.colName.code"],align: "left", width: 150},
//                 {name: "codeName", label: i18n["acct.autoCombobox.colName.name"], align: "left", width: 300}
//             ],
//             positionRefer: function () {
//                 return $(this).closest("div");
//             },
//             height:350,
//             isRememberValue: false
//         },
//         async: {
//             url: App["contextPath"] + "/acct/setup/getAcctBankAutoComboData.json?codeType=02"
//         }
//     },
//
//     /**
//      * “新的”银行名称联想控件配置
//      * 从银行资料表获取的数据（改用这个)
//      * created by huanglb at 20161202
//      */
//     newAcctBankAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "id", isHide: true},
//                 {name: "code", label: i18n["acct.autoCombobox.colName.code"],align: "left", width: 150},
//                 {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left", width: 300}
//             ],
//             positionRefer: function () {
//                 return $(this).closest("div");
//             },
//             height:350,
//             isRememberValue: false
//         },
//         async: {
//             url: App["contextPath"] + "/acct/setup/getNewAcctBankAutoComboData.json"
//         }
//     },
//
//     /** 员工部门名称联想控件配置*/
//     acctDepartmentAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "id", isHide: true},
//                 {name: "code", label: i18n["acct.autoCombobox.colName.code"]},
//                 {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left"}
//             ],
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             widthRefer: function () {
//                 return $(this).parent().parent("div").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             url: App["contextPath"] + "/acct/partner/getAcctDepartmentAutoComboData.json"
//         }
//     },
//
//     /** 建账页面中fiscalYear时间控件*/
//     getFiscalYearDate: {
//         view: {
//             colModels: [
//                 {name: "text", label: "Date"},
//                 {name: "year", isHide: true},
//                 {name: "month", isHide: true}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             widthRefer: function () {
//                 return $(this).parent().parent("div").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             dataSourceType: "local"
//         }
//     },
//
//     /** 年结页面中结束账期时间控件*/
//     getFinancialYearEndDate: {
//         view: {
//             colModels: [
//                 {name: "text", label: "Date"},
//                 {name: "year", isHide: true},
//                 {name: "month", isHide: true}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             widthRefer: function () {
//                 return $(this).parent().parent("div").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             dataSourceType: "local"
//         }
//     },
//
//     /**
//      * 税码联想控件
//      * 参数= 1：采购，2：销售，0：销售+采购
//      * @param taxReportType
//      * @returns {{view: {isRememberValue: boolean, colModels: *[], positionRefer: Function, widthRefer: Function}, async: {dataSourceType: string, url: string, data: {taxReportType: *}}}}
//      */
//     taxRateConfig: function (taxReportType) {
//         return {
//             view: {
//                 forceHideHead: true,
//                 isRememberValue: true,
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "taxCode", label: i18n["acct.autoCombobox.colName.taxCode"], align: "center"},
//                     {name: "taxRate", label: i18n["acct.autoCombobox.colName.Rate"], align: "left", isHide: true},
//                     {name: "taxRateStr", label: i18n["acct.autoCombobox.colName.Rate"], align: "center"}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent("div").outerWidth(true) - 2;
//                 }
//             },
//             async: {
//                 dataSourceType: "onceRemote",
//                 url: App["contextPath"] + "/acct/gst/getTaxRateAutoCombobox.json",
//                 data: {taxReportType: taxReportType}
//             }
//         }
//     },
//
//     /**
//      * 录分录中的税码
//      * 税码来源,税码,税率
//      * @returns {{view: {isRememberValue: boolean, colModels: *[], positionRefer: view.positionRefer, widthRefer: view.widthRefer}, async: {dataSourceType: string, url: string, data: {taxReportType: *}}}}
//      */
//     otherDetailTaxRateConfig: function () {
//         return {
//             view: {
//                 isRememberValue: true,
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "taxSourceStr", label: i18n["acct.autoCombobox.colName.taxSource"], align: "center"},
//                     {name: "taxCode", label: i18n["acct.autoCombobox.colName.taxCode"], align: "center"},
//                     {name: "taxRate", label: i18n["acct.autoCombobox.colName.Rate"], align: "left", isHide: true},
//                     {name: "taxRateStr", label: i18n["acct.autoCombobox.colName.Rate"], align: "center"}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent("div").outerWidth(true) - 2  ;
//                 }
//             },
//             async: {
//                 dataSourceType: "onceRemote",
//                 url: App["contextPath"] + "/acct/gst/getTaxRateAutoCombobox.json"
//             }
//         }
//     },
//
//     /**参数页面中是否启用的控件**/
//     isUseSelect: {
//         view: {
//             colModels: [
//                 {name: "selectName", label: "selectName"},
//                 {name: "selectValue", isHide: true}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent("label");
//             },
//             widthRefer: function () {
//                 return $(this).parent("label").outerWidth(true) - 2;
//             },
//             localData: [{selectValue: '1', selectName: 'Use'}, {selectValue: '0', selectName: 'Disable'}]
//         },
//         async: {
//             dataSourceType: "local"
//         }
//     },
//
//     /**参数页面中字符长度的控件**/
//     isSnLength: {
//         view: {
//             colModels: [
//                 {name: "snLength", label: "snLength"}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent("label");
//             },
//             widthRefer: function () {
//                 return $(this).parent("label").outerWidth(true) - 2;
//             },
//             localData: [
//                 {snLength: '1'}, {snLength: '2'},
//                 {snLength: '3'}, {snLength: '4'},
//                 {snLength: '5'}, {snLength: '6'}
//             ]
//         },
//         async: {
//             dataSourceType: "local"
//         }
//     },
//
//     /**
//      * 参数页面中凭证状态的控件
//      * created by huanglb at 2015-12
//      */
//     acctVoucherStatusAutoComboboxConfig: function(containsAll) {
//
//         var billStatusEnum = enumUtil.getEnum("billStatusEnum");
//
//         if (containsAll) {
//             billStatusEnum = billStatusEnum.slice(0);
//             billStatusEnum.unshift({value:null,name:i18n["acct.common.AutoCombobox.option.all"]});
//         }
//         var indexLocked = Number(billStatusEnum.length) - 1;
//         for(var i =0 ; i < billStatusEnum.length ; i ++){
//             if(billStatusEnum[i] != null && $.trim(billStatusEnum[i]["name"]) == "Locked"){
//                 indexLocked = i;
//             }
//         }
//         billStatusEnum.splice(indexLocked, 1);
//         return {
//             view: {
//                 colModels: [
//                     {name: "name", label: "name"},
//                     {name: "value", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) + 12;
//                 },
//                 localData: billStatusEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     periodStatusAutoComboboxConfig: function() {
//
//         var periodEnum = enumUtil.getEnum("acctPeriodStatusEnum");
//
//         var indexLocked = Number(periodEnum.length) - 1;
//         for(var i =0 ; i < periodEnum.length ; i ++){
//             if(periodEnum[i] != null && $.trim(periodEnum[i]["value"]) == "2"){
//                 indexLocked = i;
//             }
//         }
//         periodEnum.splice(indexLocked, 1);
//         return {
//             view: {
//                 colModels: [
//                     {name: "name", label: "name"},
//                     {name: "value", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).closest("td");
//                 },
//                 //width: 80,
//                 widthRefer: function () {
//                     return $(this).closest("td").outerWidth(true) + 5;
//                 },
//                 localData: periodEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /**
//      * 参数页面中凭证类型的控件
//      * created by huanglb at 2015-12
//      */
//     acctVoucherTypeAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "selectName", label: "selectName"},
//                 {name: "selectValue", isHide: true}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent("label");
//             },
//             widthRefer: function () {
//                 return $(this).parent("label").outerWidth(true) - 2;
//             },
//             localData: [
//                 {selectValue: '', selectName: i18n["acct.common.AutoCombobox.option.all"]},
//                 {selectValue: '1', selectName: i18n["acct.voucher.VoucherEntity.voucherType1"]},
//                 {selectValue: '2', selectName: i18n["acct.voucher.VoucherEntity.voucherType2"]},
//                 {selectValue: '4', selectName: i18n["acct.voucher.VoucherEntity.voucherType4"]},
//                 {selectValue: '5', selectName: i18n["acct.voucher.VoucherEntity.voucherType5"]}
//             ]
//         },
//         async: {
//             dataSourceType: "local"
//         }
//     },
//
//     /**
//      * 日志模块类型下拉框控件
//      * 林志胜 2016-4-5
//      */
//     acctTransTypeAutoComboboxConfig: function(containsAll){
//         var bizEnum = enumUtil.getEnum("bizEnum");   //获得枚举类型
//         //添加“全部”选项
//         if (containsAll) {
//             bizEnum = bizEnum.slice(0);
//             bizEnum.unshift({key:"all",name:i18n["acct.common.AutoCombobox.option.all"]});
//         }
//
//         return{
//             view:{
//                 colModels:[
//                     {name: "name", label: "name"},
//                     {name: "key", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) - 2;
//                 },
//                 localData: bizEnum
//             },
//             async:{
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /**
//      * 来源单据类型的控件
//      * created by huanglb at 2015-12
//      */
//     acctSourceBillTypeAutoComboboxConfig: function(containsAll) {
//         var sourceBillTypeEnum = enumUtil.getEnum("sourceBillTypeEnum");
//         if (containsAll) {
//             sourceBillTypeEnum = sourceBillTypeEnum.slice(0);
//             sourceBillTypeEnum.unshift({value:0,name:i18n["acct.common.AutoCombobox.option.all"]});
//         }
//         return {
//             view: {
//                 colModels: [
//                     {name: "name", label: "name"},
//                     {name: "value", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) - 3;
//                 },
//                 localData: sourceBillTypeEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /** 会计期间表中的账期*/
//     acctPeriodAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "acctPeriodValue", isHide: true},
//                 {name: "acctPeriodText", label: "acctPeriodText"}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent();
//             },
//             widthRefer: function () {
//                 return $(this).parent().outerWidth(true) - 2;
//             }
//         },
//         async: {
//             url: App["contextPath"] + "/acct/period/getAcctPeriodAutoComboData.json",
//             dataSourceType: "onceRemote"
//         }
//     },
//
//     /** 会计财年表中的财年*/
//     acctfiscalYearAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "value", isHide: true},
//                 {name: "name", label: "name"}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent();
//             },
//             widthRefer: function () {
//                 return $(this).parent().outerWidth(true) - 2;
//             }
//         },
//         async: {
//             url: App["contextPath"] + "/acct/fa/getPeriodForFiscalYear.json",
//             dataSourceType: "onceRemote"
//         }
//     },
//
//     /**
//      * 合作伙伴-往来单位
//      * PARTNER_TYPE 1：供应商 2 客户 3：客户兼供应商
//      * @param {Array} types 往来单位类型
//      */
//     getAcctPartnerConfig: function () {
//         return {
//             view: {
//                 forceHideHead: true,
//                 isRememberValue: false,
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"], isHide: true},
//                     {name: "currId", label: i18n["acct.setup.CurrencyEntity.currName"] , isHide: true},
//                     {name: "currName", label: i18n["acct.setup.CurrencyEntity.currName"] , isHide: true},
//                     {name: "currCode", label: i18n["acct.setup.CurrencyEntity.currCode"] , isHide: true},
//                     {name: "supplierTaxCodeAndRate", label: "supplierTaxCodeAndRate" , isHide: true},
//                     {name: "customerTaxCodeAndRate", label: "customerTaxCodeAndRate" , isHide: true},
//                     {name: "customerTaxCode", label: "customerTaxCode" , isHide: true},
//                     {name: "supplierTaxCode", label: "supplierTaxCode" , isHide: true},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left"},
//                     {name: "rateAdjust", label: i18n["acct.setup.RateAdjustEntity.adjustRate"], isHide: true},
//                     {name: "defaultAddress", label: "defaultAddress", isHide: true},
//                     {name: "areaName", label: "areaName", isHide: true},
//                     {name: "agentName", label: "agentName", isHide: true}
//                 ],
//                 positionRefer: function () {
//                     return $(this).closest("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).closest("div").width() - 2;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/biz/findAcctPartner.json"
//             }
//         };
//     },
//     /**
//      * 合作伙伴-往来单位
//      * PARTNER_TYPE 1：供应商 2 客户 3：客户兼供应商
//      * @param {Array} types 往来单位类型
//      */
//     getAcctfaClassConfig: function () {
//         return {
//             view: {
//                 forceHideHead: true,
//                 isRememberValue: false,
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "name", label: "name"}
//                 ],
//                 positionRefer: function () {
//                     return $(this).closest("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).closest("div").width() - 2;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/fa/comboBoxFaClass2.json"
//             }
//         };
//     },
//
//     /**
//      * 获得本地数据下拉框配置
//      */
//     getSelectConfig: function (localData, colModels, selectFun) {
//         return {
//             view: {
//                 forceHideHead: true,
//                 isRememberValue: true,
//                 isAllowEmpty: false,
//                 colModels: colModels,
//                 localData: localData,
//                 positionRefer: function () {
//                     return $(this).closest("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).closest("div").width() - 2;
//                 }
//             },
//             async: {
//                 /** 数据来源方式：remote = 远程、local = 本页面、onceRemote = 一次远程 */
//                 dataSourceType: "local"
//             },
//
//             callback: {
//                 afterSelectRow: function (rowData) {
//                     selectFun.apply(this, [rowData]);
//                 }
//             }
//         }
//     },
//
//     /**
//      * 获得本地数据下拉框配置
//      *
//      */
//     getSelectConfig2: function (extendConfig) {
//         return $.extend(true, AutoComboboxUtil.getSelectConfig([], [], null), extendConfig);
//     },
//
//     /** 关账页面中时间控件*/
//     getFiscalEndYearDate: {
//         view: {
//             colModels: [
//                 {name: "id", isHide: true},
//                 {name: "year", label: "Date"}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent();
//             },
//             widthRefer: function () {
//                 return $(this).parent().outerWidth(true) - 2;
//             }
//         },
//         async: {
//             dataSourceType: "local"
//         }
//     },
//
//     /** GST上报纳税人的联想控件*/
//     taxPayerAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "icNo", label: "icNo", isHide: true},
//                 {name: "oicNo", label: "oicNo", isHide: true},
//                 {name: "sign", label: "sign", isHide: true},
//                 {name: "signDate", label: "signDate", isHide: true},
//                 {name: "nationlity", label: "nationlity", isHide: true},
//                 {name: "passportNo", label: "passportNo", isHide: true},
//                 {name: "name", label: "name"}
//             ],
//             isRememberValue: false,
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             widthRefer: function () {
//                 return $(this).parent().parent("div").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             url: App["contextPath"] + "/acct/gst/getTaxPayerAutoComboData.json"
//         }
//     },
//
//     /**
//      * 销售类型控件
//      * created by huanglb at 2015-12-18
//      */
//     getSaleTypeConfig: function (containsAll) {
//
//         var saleTypeEnum = enumUtil.getEnum("saleTypeEnum");
//
//         if (containsAll) {
//             saleTypeEnum = saleTypeEnum.slice(0);
//             saleTypeEnum.unshift({value:0,name:i18n["acct.common.AutoCombobox.option.all"]});
//         }
//
//         return {
//             view: {
//                 colModels: [
//                     {name: "value", label: "value", isHide: true},
//                     {name: "name", label: "name", isHide: false}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) - 2;
//                 },
//                 localData:saleTypeEnum
//             }
//             ,
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /**
//      * 费用单类型控件
//      * created by zhangyx on 2016-08-12
//      */
//     getExpenceTypeConfig: function (containsAll) {
//
//         var expenceTypeEnum = enumUtil.getEnum("expenceTypeEnum");
//
//         if (containsAll) {
//             expenceTypeEnum = expenceTypeEnum.slice(0);
//             expenceTypeEnum.unshift({value:0,name:i18n["acct.common.AutoCombobox.option.all"]});
//         }
//
//         return {
//             view: {
//                 colModels: [
//                     {name: "value", label: "value", isHide: true},
//                     {name: "name", label: "name", isHide: false}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) - 2;
//                 },
//                 localData:expenceTypeEnum
//             }
//             ,
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     getPurchaseTypeConfig: function (containsAll) {
//         var purchaseTypeEnum = enumUtil.getEnum("purchaseTypeEnum");
//
//         if (containsAll) {
//             purchaseTypeEnum = purchaseTypeEnum.slice(0);
//             purchaseTypeEnum.unshift({value:0,name:i18n["acct.common.AutoCombobox.option.all"]});
//         }
//
//         return {
//             view: {
//                 colModels: [
//                     {name: "value", label: "value", isHide: true},
//                     {name: "name", label: "name", isHide: false}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) - 2;
//                 },
//                 localData:purchaseTypeEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /**
//      * 报表科目显示层级控件
//      * created by shcai at 2015-12-28
//      */
//     reportLevelAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "selectName", label: "selectName"},
//                 {name: "selectValue", isHide: true}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent("label");
//             },
//             widthRefer: function () {
//                 return $(this).parent("label").outerWidth(true) - 2;
//             },
//             localData: [
//                 {selectValue: '', selectName: ' '},
//                 {selectValue: '1', selectName: '1'},
//                 {selectValue: '2', selectName: '2'},
//                 {selectValue: '3', selectName: '3'},
//                 {selectValue: '4', selectName: '4'},
//                 {selectValue: '5', selectName: '5'}
//             ]
//         },
//         async: {
//             dataSourceType: "local"
//         }
//     },
//
//     /**
//      * 行业代码(只限本公司)
//      */
//     industryCodeConfig: {
//         view: {
//             colModels: [
//                 {name: "code", label: "code"}
//             ],
//             showPager: false,
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent("label");
//             },
//             widthRefer: function () {
//                 return $(this).parent("label").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             url: App["contextPath"] + "/acct/setup/getIndustryCodeList.json"
//         }
//     },
//
//     /**
//      * 获取币种及当前账期汇率控件
//      * created by huanglb at 2015-12-18
//      */
//     getCurrencyAndRateConfig: function (acctYear, acctPeriod) {
//         return {
//             view: {
//                 colModels: [
//                     {name: "adjustRate", isHide: true},
//                     {name: "currCode", label: i18n["acct.setup.CurrencyEntity.currCode"]},
//                     {name: "currName", isHide: true}
//                 ],
//                 showPager: false,
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent();
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().outerWidth(true) - 2;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/setup/getCurrencyAndRateAutoComboData.json",
//                 data: {"acctYear": acctYear, "acctPeriod": acctPeriod}
//             }
//         };
//     },
//
//     /**
//      * 获得影像类型
//      * @param selectFun
//      * @param containsAll
//      * @returns {*|{view, async, callback}}
//      */
//     getTypeDescConfig: function (selectFun, containsAll) {
//         var typeDescEnum= enumUtil.getEnum("typeDescEnum");
//
//         if (containsAll) {
//             typeDescEnum = typeDescEnum.slice(0);
//             typeDescEnum.unshift({
//                 imageType: "",
//                 typeDescription: "",
//                 description: i18n["acct.common.AutoCombobox.option.all"]
//             });
//         }
//
//         return $.extend({minWidth: 250},AutoComboboxUtil.getSelectConfig(
//             typeDescEnum,
//             [
//                 {name: "value", isHide: true},
//                 {name: "imageType", label: "影像类型", width: 100, isHide: true},
//                 {name: "typeDescription", label: "影像描述", width: 140, isHide: true},
//                 {name: "description", label: "影像描述", width: 301, isHide: false}
//             ],
//             selectFun
//         ));
//     },
//
//     /**
//      * 根据用户ID获取可以选择的企业
//      * @returns {{}}
//      */
//     getVopCorpSwitchConfig: function () {
//         return {
//             view: {
//                 colModels: [
//                     {name: "corpId", isHide: true},
//                     {name: "corpName", isHide: false},
//                     {name: "taskVoList", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent();
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().outerWidth() - 2;
//                 }
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         };
//     },
//
//     /**
//      * 凤巢账期的选择
//      * @returns {{}}
//      */
//     getVopPeriodSwitchConfig: function () {
//         return {
//             view: {
//                 colModels: [
//                     {name: "taskId", isHide: true},
//                     {name: "corpId", isHide: true},
//                     {name: "yearMonth", isHide: false}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent();
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().outerWidth() - 2;
//                 }
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         };
//     },
//
//     /**
//      * 结算方式联想控件配置
//      * created by huanglb at 20151223
//      */
//     settleAutoComboboxConfig:function(billCurrId) {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "settleType", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"]},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left"}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent("div").outerWidth(true) - 2;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/setup/getSettleAutoComboData.json",
//                 data: {
//                     billCurrId: billCurrId
//                 }
//             }
//         }
//     },
//
//     /**
//      * 销售单据分录中来源单据信息
//      *
//      * @param billTypes（单据类型)
//      * @param acctPartnerId（对应的客户or供应商Id）
//      * @param billIds（表体中已存在的单据ids)
//      * @returns {{view: {colModels: *[], positionRefer: view.positionRefer, width: number, height: number}, async: {url: string, data: {billTypes: *, acctPartnerId: *, billIds: *}}}}
//      */
//     saleRefBillConfig: function (billTypes, acctPartnerId, billIds, billDate) {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "billType", label: "billType", isHide: true},
//                     {name: "billTypeName", label: i18n["acct.sales.SaleInvoiceEntity.billType"],align:"left"},
//                     {name: "strBillDate", label: i18n["acct.sales.SaleInvoiceEntity.billDate"],align:"center"},
//                     {name: "refNo", label: i18n["acct.sales.SaleInvoiceEntity.refNo"] , align: "left"},
//                     {name: "journalNo", label: i18n["acct.sales.SaleInvoiceEntity.journalNo"] , align: "left"},
//                     {name: "totalOriginTaxAmt", label: i18n["acct.invoice.BEntity.saleInvoiceDetailOriginTaxAmt"], align: "right",
//                         isHide:userInfoUtil.getGstEnabled() == true ? false:true,//GST Amt启用GST才显示，不启用不显示；add by kehuang   2017/3/13
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         }
//                     },
//                     {name: "finishOriginAmt", label: i18n["acct.sales.SaleInvoiceEntity.finishOriginAmt"], align: "right", isHide: true},
//                     {
//                         name: "unFinishAmt", label: i18n["acct.sales.SaleInvoiceVo.unFinishAmt"], align: "right",
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         }
//                     },
//                     {name: "exchangeRate", label: i18n["acct.sales.SaleInvoiceEntity.exchangeRate"], align: "right",
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getExRateCount(),//取参数表的 汇率小数位数
//                             thousandsSeparator: ","
//                         }
//                     },
//                     {name: "currCode", label: i18n["acct.sales.SaleInvoiceEntity.currId"] , align: "left"}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 width: 860,
//                 height: 300
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/sales/saleInvoice/getSaleRefBillAutoCombobox.json",
//                 data: {
//                     billTypes: billTypes,
//                     acctPartnerId: acctPartnerId,
//                     billIds: billIds,
//                     billDate: billDate
//                 }
//             }
//         };
//     },
//
//     /**
//      * 采购单据分录中来源单据信息
//      *
//      * @param billTypes（单据类型)
//      * @param acctPartnerId（对应的客户or供应商Id）
//      * @param billIds（表体中已存在的单数ids)
//      * @returns {{view: {colModels: *[], positionRefer: Function, widthRefer: Function}, async: {url: string, data: {billTypes: *, acctPartnerId: *, billIds: *}}}}
//      */
//     purchaseRefBillConfig: function (billTypes, acctPartnerId, billIds, billDate) {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "billType", label: i18n["acct.purchase.PurchaseInvoiceEntity.billType"], isHide: true},
//                     {name: "billTypeName", label: i18n["acct.purchase.PurchaseInvoiceEntity.billType"],align:"left"},
//                     {name: "strBillDate", label: i18n["acct.purchase.PurchaseInvoiceEntity.billDate"],align:"center"},
//                     {name: "refNo", label: i18n["acct.purchase.PurchaseInvoiceEntity.refNo"] , align: "left"},
//                     {name: "journalNo", label: i18n["acct.purchase.PurchaseInvoiceEntity.journalNo"], align: "left"},
//                     {name: "totalOriginTaxAmt", label: i18n["acct.invoice.BEntity.saleInvoiceDetailOriginTaxAmt"], align: "right",
//                         isHide:userInfoUtil.getGstEnabled() == true ? false:true,  //GST Amt启用GST才显示，不启用不显示；add by kehuang   2017/3/13
//
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         }
//                     },
//                     {name: "finishOriginAmt", label: i18n["acct.purchase.PurchaseInvoiceEntity.finishOriginAmt"], align: "right", isHide: true},
//                     {name: "unFinishAmt", label: i18n["acct.purchase.PurchaseInvoiceVo.unFinishAmt"], align: "right",
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         }
//                     },
//                     {name: "exchangeRate", label: i18n["acct.purchase.PurchaseInvoiceEntity.exchangeRate"], align: "right"},
//                     {name: "currCode", label: i18n["acct.purchase.PurchaseInvoiceEntity.currId"], align: "left"}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 width: 860,
//                 height: 300
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/purchase/purchaseInvoice/getPurchaseRefBillAutoCombobox.json",
//                 data: {
//                     billTypes: billTypes,
//                     acctPartnerId: acctPartnerId,
//                     billIds: billIds,
//                     billDate: billDate
//                 }
//             }
//         };
//     },
//
//     /**
//      * 销售单据分录中来源单据信息
//      *
//      * @param billTypes（单据类型)
//      * @param acctPartnerId（对应的客户or供应商Id）
//      * @param billIds（表体中已存在的单据ids)
//      * @returns {{view: {colModels: *[], positionRefer: view.positionRefer, width: number, height: number}, async: {url: string, data: {billTypes: *, acctPartnerId: *, billIds: *}}}}
//      */
//     getRefBillForReceivableAndPaymentConfig: function (billTypes, acctPartnerId, billIds,billDate) {
//         return {
//             view: {
//                 colModels: [
//                     {name: "lastBillId", isHide: true},
//                     {name: "lastBillType", label: i18n["acct.purchase.PurchaseInvoiceEntity.billType"], isHide: true},
//                     {name: "LastBillVersion", label: i18n["acct.purchase.PurchaseInvoiceVo.lastBillVersion"], isHide: true},
//                     {name: "invoiceCurrId", label: i18n["acct.purchase.PurchaseInvoiceVo.invoiceCurrId"] , isHide: true},
//                     {name: "invoiceExchangeRate", label: i18n["acct.purchase.PurchaseInvoiceVo.invoiceExchangeRate"] , isHide: true},
//                     {name: "refNo", label: i18n["acct.purchase.PurchaseInvoiceVo.refNo"] , align: "left"},
//                     {name: "lastBillNo", label: i18n["acct.purchase.PurchaseInvoiceVo.lastBillNo"] , align: "left"},
//                     {name: "invoiceBillDate", label: i18n["acct.purchase.PurchaseInvoiceEntity.billDate"], formatter: {name: "date"},align: "center"},
//                     {name: "invoiceTotalOriginAmt", label: i18n["acct.purchase.PurchaseInvoiceVo.invoiceTotalOriginAmt"], align: "right",
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         }
//                     },
//                     {name: "writeOffOriginAmt", label: i18n["acct.purchase.PurchaseInvoiceVo.writeOffOriginAmt"],  isHide: true},
//                     {name: "receivedOriginAmt", label: i18n["acct.purchase.PurchaseInvoiceVo.receivedOriginAmt"], align: "right",
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         },isHide:true
//                     },
//                     {name: "outstandingOriginAmt", label: i18n["acct.purchase.PurchaseInvoiceVo.outstandingOriginAmt"] , align: "right",
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         }
//                     }
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 width: 810,
//                 height: 300
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/sales/saleReceivables/getRefBillForSaleAndPurcharseAutoCombobox.json",
//                 data: {
//                     billTypes: billTypes,
//                     acctPartnerId: acctPartnerId,
//                     billIds: billIds,
//                     billDate: billDate
//                 }
//             }
//         };
//     },
//
//     getRefBillForPaymentConfig: function (billTypes, acctPartnerId, billIds,billDate) {
//         return {
//             view: {
//                 colModels: [
//                     {name: "lastBillId", isHide: true},
//                     {name: "lastBillType", label: i18n["acct.purchase.PurchaseInvoiceEntity.billType"], isHide: true},
//                     {name: "LastBillVersion", label: i18n["acct.purchase.PurchaseInvoiceVo.lastBillVersion"], isHide: true},
//                     {name: "invoiceCurrId", label: i18n["acct.purchase.PurchaseInvoiceVo.invoiceCurrId"] , isHide: true},
//                     {name: "invoiceExchangeRate", label: i18n["acct.purchase.PurchaseInvoiceVo.invoiceExchangeRate"] , isHide: true},
//                     {name: "refNo", label: i18n["acct.purchase.PurchaseInvoiceVo.refNo"]  , align: "left"},
//                     {name: "lastBillNo", label: i18n["acct.purchase.PurchaseInvoiceVo.lastBillNo"] , align: "left"},
//                     {name: "invoiceBillDate", label: i18n["acct.purchase.PurchaseInvoiceEntity.billDate"],formatter: {name: "date"}, align: "center"},
//                     {name: "invoiceTotalOriginAmt", label: i18n["acct.purchase.PurchaseInvoiceVo.invoiceTotalOriginAmt"], align: "right",
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         }
//                     },
//                     {name: "writeOffOriginAmt", label: i18n["acct.purchase.PurchaseInvoiceVo.writeOffOriginAmt"],  isHide: true},
//                     {name: "receivedOriginAmt", label: i18n["acct.purchase.PurchaseInvoiceVo.receivedOriginAmt"], align: "right",
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         },isHide:true
//                     },
//                     {name: "outstandingOriginAmt", label: i18n["acct.purchase.PurchaseInvoiceVo.outstandingOriginAmt"] , align: "right",
//                         formatter: {
//                             name: "currency",
//                             decimalPlaces: parameterUtil.getAmountDecimalCount(),//取参数表的 金额小数位数
//                             thousandsSeparator: ","
//                         }
//                     }
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 width: 810,
//                 height: 300
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/purchase/purchaseApPayment/getRefBillForPurcharseAutoCombobox.json",
//                 data: {
//                     billTypes: billTypes,
//                     acctPartnerId: acctPartnerId,
//                     billIds: billIds,
//                     billDate: billDate
//                 }
//             }
//         };
//     },
//
//     /**
//      * 银行付款单新增页面的Type下拉控件
//      * created by huanglb at 20151230
//      */
//     bankPaymentTypeAutoComboboxConfig: {
//         view: {
//             forceHideHead: true,
//             isRememberValue: true,
//             singleColumnNotHead: true,
//             colModels: [
//                 {name: "selectName", label: "selectName"},
//                 {name: "selectValue", isHide: true}
//             ],
//             positionRefer: function () {
//                 return $(this).parent("label");
//             },
//             widthRefer: function () {
//                 return $(this).parent("label").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             async: false,
//             dataSourceType: "local"
//         }
//     },
//
//     /**
//      * 银行付款单新增页面的Payer下拉控件(根据type值动态加载下拉框数据)
//      * 【Type】字段:下拉选择 【Expense】、【EPF/Socso】、【Salary】
//      * 【Expense】、【EPF/Socso】:【Payee】关联《往来单位T_ML_GL_PARTNER》
//      * 【Salary】：【Payee】关联《职员表T_ML_GL_PARTNER_EMPLOYEE》
//      * 0-员工（T_ML_GL_PARTNER_EMPLOYEE表数据），1-合作伙伴（T_ML_GL_PARTNER表数据）
//      * created by huanglb at 20151230
//      */
//     bankPaymentPayerAutoComboboxConfig: function (typeValue) {
//         return {
//             view: {
//                 forceHideHead: true,
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"], isHide: true},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left"}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent("div").outerWidth(true) - 2;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/biz/findAcctPartnerOrEmployee.json",
//                 data: {
//                     typeValue: typeValue
//                 }
//             }
//         }
//     },
//
//     /**
//      * 银行付款单单据往来对象下拉框
//      * 获取T_ML_GL_PARTNER表数据（供应商和客户兼供应商两种）
//      * created by huanglb at 2016-01-27
//      */
//     bankPaymentPartnerAutoComboboxConfig: {
//         view: {
//             isRememberValue: false,
//             colModels: [
//                 {name: "id", isHide: true},
//                 {name: "code", label: i18n["acct.autoCombobox.colName.code"]},
//                 {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left"},
//                 {name: "gstNo", isHide: true},
//                 {name: "ssmNo", isHide: true},
//                 {name: "supplierSubjectId", isHide: true},
//                 {name: "supplierSubjectCode", isHide: true},
//                 {name: "supplierSubjectName", isHide: true},
//                 {name: "supplierTaxCode", isHide: true},
//                 {name: "supplierTaxRate", isHide: true},
//                 {name: "supplierTaxRateStr", isHide: true}
//             ],
//             positionRefer: function () {
//                 return $(this).parent().parent("div");
//             },
//             widthRefer: function () {
//                 return $(this).parent().parent("div").outerWidth(true) - 2;
//             }
//         },
//         async: {
//             url: App["contextPath"] + "/acct/partner/findAcctPartnerFromBankPayment.json"
//         }
//     },
//
//     getYesNoConfig: function (selectFun, containsAll) {
//         var yesNoEnum = enumUtil.getEnum("yesNo");
//
//         if (containsAll) {
//             yesNoEnum = yesNoEnum.slice(0);
//             yesNoEnum.unshift({value: "",name:i18n["acct.common.AutoCombobox.option.all"]});
//         }
//
//         return AutoComboboxUtil.getSelectConfig(
//             yesNoEnum,
//             [
//                 {name: "value", isHide: true},
//                 {name: "name", label: "name", isHide: false}
//             ],
//             selectFun
//         );
//     },
//
//     /**
//      * 影像状态下拉框
//      * @param selectFun 选择回调函数
//      * @param containsAll 是否有包函所有
//      */
//     getImageFlagConfig: function (selectFun, containsAll) {
//         var imageFlagEnum = enumUtil.getEnum("imageFlagEnum"),
//             config;
//
//         if (containsAll) {
//             imageFlagEnum = imageFlagEnum.slice(0);
//             imageFlagEnum.unshift({
//                 code: "",
//                 name: i18n["acct.common.AutoCombobox.option.all"],
//                 description: i18n["acct.common.AutoCombobox.option.all"]
//             });
//         }
//
//         config = AutoComboboxUtil.getSelectConfig(
//             imageFlagEnum,
//             [
//                 {name: "code", isHide: true},
//                 {name: "name", label: "name", isHide: true},
//                 {name: "description", label: "description", isHide: false}
//             ],
//             selectFun
//         );
//
//         config.view.widthRefer = function () {
//             return 130;
//         };
//
//         return config;
//     },
//
//     /**
//      * 红冲,追加发票中的"理由"
//      */
//     reasonAutoComboboxConfig: function (typeValue) {
//         return {
//             view: {
//                 isRememberValue: false,
//                 singleColumnNotHead: true,
//                 showPager: false,
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "codeValue", label: i18n["acct.autoCombobox.colName.code"],isHide: true},
//                     {name: "codeName", label: i18n["acct.invoice.reasonCol.reason"]}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("div").outerWidth(true) +10;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/system/findDictValueAutoComboByDictType.json",
//                 data: {
//                     typeValue: typeValue
//                 }
//             }
//         }
//     },
//
//     /**
//      * 往来单位票据导入 往来单位类型
//      * @returns {{view: {colModels: *[], singleColumnNotHead: boolean, positionRefer: Function, widthRefer: Function, localData: *}, async: {dataSourceType: string}}}
//      */
//     getPartnerTypeConfig: function () {
//         var partnerTypeEnum = enumUtil.getEnum("partnerTypeEnum");
//
//         return {
//             view: {
//                 colModels: [
//                     {name: "value", label: "value", isHide: true},
//                     {name: "name", label: "name", isHide: false}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) - 2;
//                 },
//                 localData:partnerTypeEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /**
//      * 渲染所有联想控件
//      */
//     render: function () {
//         //
//         $("input[componentType='auto-combobox']").each(function (index, inputEl) {
//             var $inputEl = $(inputEl),
//                 componentConfigName = $inputEl.attr("componentConfig"),
//                 componentConfigArg = $inputEl.attr("componentConfigArg"),
//                 componentConfigExt = $inputEl.attr("componentConfigExt"),
//                 bindFill = $inputEl.attr('bindFill') ? JSON.parse($inputEl.attr('bindFill')) : {},
//                 componentConfig = {};
//             if (!componentConfig) {
//                 return;
//             }
//             if ($.isFunction(AutoComboboxUtil[componentConfigName]) && componentConfigArg && $.isArray($.parseJSON(componentConfigArg))) {
//                 componentConfig = AutoComboboxUtil[componentConfigName].apply(AutoComboboxUtil, $.parseJSON(componentConfigArg));
//             } else if ($.isFunction(AutoComboboxUtil[componentConfigName])) {
//                 componentConfig = AutoComboboxUtil[componentConfigName].call(AutoComboboxUtil);
//             } else if ($.isPlainObject(AutoComboboxUtil[componentConfigName])) {
//                 componentConfig = AutoComboboxUtil[componentConfigName];
//             }
//             if ($.isFunction(eval(componentConfigExt))) {
//                 componentConfig = $.extend(true, {}, componentConfig, {view: {"bindFill": bindFill}}, eval(componentConfigExt)());
//             } else {
//                 componentConfig = $.extend(true, {}, componentConfig, {view: {"bindFill": bindFill}}, eval(componentConfigExt));
//             }
//             //渲染控件
//             $inputEl.AutoCombobox(componentConfig);
//         });
//         $("[componentType='auto-combobox-trigger']").each(function (index, elm) {
//             var $elm = $(elm),
//                 triggerElementId = $elm.attr("triggerElementId");
//             if (triggerElementId) {
//                 $elm.bind("click", function (event) {
//                     $("#" + triggerElementId).AutoCombobox("triggerAction", event);
//                 });
//             } else {
//                 alert("没有配置triggerElementId");
//             }
//         });
//     },
//
//
//     /**
//      * 查分录页面单据类型选择下拉框
//      * created by zhangyx at 2016-04-22
//      */
//     openBillTypeConfig: function (sourceBillType, isRestore) {
//         var billTypeArr = enumUtil.getEnum("billTypeEnum");
//         var billTypeObj = enumUtil.enumArray2EnumObject(billTypeArr, "code", "key");
//
//         var localData = [ {code: 'OB', name: i18n["acct.common.enumerate.BillTypeEnum.JournalEntry"]}];
//         if(isRestore && (sourceBillType == 'SI' || sourceBillType == 'SD')){
//             localData.push({code: 'SR', name: i18n["acct.common.enumerate.BillTypeEnum.SalesReceivePayments"]});
//         }else if(isRestore && (sourceBillType == 'PI' || sourceBillType == 'PD')){
//             localData.push( {code: 'PP', name: i18n["acct.common.enumerate.BillTypeEnum.PurchaseMakePayment"]});
//         }
//         localData.push({code: sourceBillType, name: i18n["acct.common.enumerate.BillTypeEnum."+billTypeObj[sourceBillType]]});
//
//         return {
//             view: {
//                 colModels: [
//                     {name: "code", isHide: true},
//                     {name: "name", label: "billType"}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) - 2;
//                 },
//                 localData: localData
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /*******************************固定资产 s***********************************************/
//     /**固定资产卡片的联想控件*/
//     faCardAutoComboboxConfig: {
//         view: {
//             colModels: [
//                 {name: "id", label: "id", isHide: true},
//                 {name: "code", label: i18n["acct.autoCombobox.colName.code"], width: 150},
//                 {name: "name", label: i18n["acct.autoCombobox.colName.name"], width: 300}
//
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function(){
//                 return $(this).parent();
//             }
//         },
//         async: {
//             url: App["contextPath"] + "/acct/fa/faCardAutoCombobox.json"
//         }
//     },
//
//     /**
//      * 固定资产折旧方法
//      * add by shuang
//      */
//     getFaCardDeprMethodConfig: function () {
//         var faCardDeprMethodEnum= enumUtil.getEnum("faCardDeprMethodEnum");
//
//         return {
//             view: {
//                 colModels: [
//                     {name: "value", isHide: true},
//                     {name: "name", label: "Name"}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) - 2;
//                 },
//                 localData: faCardDeprMethodEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /**
//      *资产类别
//      * add by shuang
//      */
//     faClassConfig: function () {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.typeCode"]},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.typeName"], align: "left"},
//                     {name: "faDebitSubjectIdName", label: "faDebitSubjectIdName", isHide: true},
//                     {name: "faCreditSubjectIdName", label: "faCreditSubjectIdName", isHide: true},
//                     {name: "deprCreditSubjectIdName", label: "deprCreditSubjectIdName", isHide: true},
//                     {name: "deprDebitSubjectIdName", label: "deprDebitSubjectIdName", isHide: true},
//                     {name: "faDebitSubjectId", label: "faDebitSubjectId", isHide: true},
//                     {name: "faCreditSubjectId", label: "faCreditSubjectId", isHide: true},
//                     {name: "deprDebitSubjectId", label: "deprDebitSubjectId", isHide: true},
//                     {name: "deprCreditSubjectId", label: "deprCreditSubjectId", isHide: true}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent();
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().width() + ($(this).siblings('em.icon').width() || 0);
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/fa/faClassAutoComboData.json"
//             }
//         }
//     },
//     faClassDeprMethodConfig:{
//         view: {
//             colModels: [
//                 {name: "selectName", label: "selectName"},
//                 {name: "selectValue", isHide: true}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent("label");
//             },
//             widthRefer: function () {
//                 return $(this).parent("label").outerWidth() - 2;
//             },
//             localData: [
//                 {selectValue: '1', selectName: i18n["acct.fa.FaClass.deprMethod.straightLine"]},
//                 {selectValue: '2', selectName: i18n["acct.fa.FaClass.deprMethod.decliningBalance"]}
//             ]
//         },
//         async: {
//             dataSourceType: "local"
//         }
//     },
//
//     /**
//      * 固资状态
//      */
//     FaStatusConfig: function(isShowAll) {
//
//         var faCardStatusEnum = enumUtil.getEnum("faCardStatusEnum");
//
//         if (isShowAll) {
//             faCardStatusEnum = faCardStatusEnum.slice(0);
//             faCardStatusEnum.unshift({value:null,name:i18n["acct.common.AutoCombobox.option.all"]});
//         }
//         return {
//             view: {
//                 colModels: [
//                     {name: "name", label: "name"},
//                     {name: "value", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent();
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().width() + ($(this).siblings('em.icon').width() || 0);
//                 },
//                 localData: faCardStatusEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /**
//      * 分期付款状态
//      */
//     FaPayStatusConfig: function(isShowAll) {
//
//         var faPayCardStatusEnum = enumUtil.getEnum("faPayCardStatusEnum");
//
//         if (isShowAll) {
//             faPayCardStatusEnum = faPayCardStatusEnum.slice(0);
//             faPayCardStatusEnum.unshift({value:null,name:i18n["acct.common.AutoCombobox.option.all"]});
//         }
//         return {
//             view: {
//                 colModels: [
//                     {name: "name", label: "name"},
//                     {name: "value", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent();
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().width() + ($(this).siblings('em.icon').width() || 0);
//                 },
//                 localData: faPayCardStatusEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /*******************************固定资产 e***********************************************/
//
//     /**
//      * 单选框国别下拉控件
//      * created by huanglb at 20161103
//      */
//     areaSingleConfig: {
//         view: {
//             colModels: [
//                 {name: "code", align: 'left', label: "Code"}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent("label");
//             },
//             widthRefer: function () {
//                 return $(this).parent("label").outerWidth() - 2;
//             },
//             height: 265,
//             isSelectedFirstRow: true,
//             isAllowEmpty: false
//         },
//         async: {
//             url: App["contextPath"] + "/vop/bdm/area/getArea.json",
//             dataSourceType: "onceRemote"
//         }
//     },
//
//     /**
//      * 单选框国别下拉控件包含全部选项
//      * created by huanglb at 20161201
//      */
//     areaSingleConfigContainAll: {
//         view: {
//             colModels: [
//                 {name: "code", align: 'left', label: "Code"}
//             ],
//             singleColumnNotHead: true,
//             positionRefer: function () {
//                 return $(this).parent("label");
//             },
//             widthRefer: function () {
//                 return $(this).parent("label").outerWidth() - 2;
//             },
//             height: 265,
//             isSelectedFirstRow: true,
//             isAllowEmpty: false
//         },
//         async: {
//             url: App["contextPath"] + "/vop/bdm/area/getAreaContainAll.json",
//             dataSourceType: "onceRemote"
//         }
//     },
//
//
//     /**
//      * gaf查询类型下拉控件
//      * add by lzs 2016.12.1
//      */
//     gafTypeConfig: function(containsAll){
//         var gafTypeEnum = enumUtil.getEnum("gafTypeEnum");   //获得枚举类型
//         //添加“全部”选项
//         if (containsAll) {
//             gafTypeEnum = gafTypeEnum.slice(0);
//             gafTypeEnum.unshift({key:0 ,name:"All"});
//         }
//
//         return{
//             view:{
//                 colModels:[
//                     {name: "name", label: "name"},
//                     {name: "key", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) - 2;
//                 },
//                 localData: gafTypeEnum,
//                 isAllowEmpty: false
//             },
//             async:{
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /**
//      * 物料联想控件配置()
//      **/
//     inventoryConfig: function() {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"], align: "left", width: 100},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left", width: 200},
//                     {name: "invclassName", label: i18n["acct.autoCombobox.colName.stockGroup"], align: "left", width: 150}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().width() + ($(this).siblings('em.icon').width() || 0);
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/stock/getInventoryAutoComboData.json"
//             }
//         }
//     },
//
//     /**
//      * 代理人下拉控件
//      * add by huangs 2016/12/29
//      */
//     agentConfig: function() {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"], align: "left", width: 70},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left", width: 70}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent().width() ;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/bd/getAgenComboDatas.json"
//             }
//         }
//     },
//
//     /**
//      * 仓库
//      * @returns {{view: {colModels: *[], positionRefer: view.positionRefer, height: number}, async: {url: string}}}
//      */
//     warehouseConfig: function() {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"], align: "left", width: 70},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left", width: 100}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent().width() ;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/bd/getAcctWarehouseAutoComboData.json"
//             }
//         }
//     },
//
//     projectConfig: function() {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"], align: "left", width: 70},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left", width: 70}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().width() ;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/bd/getProjectAutoComboDatas.json"
//             }
//         }
//     },
//
//     /**
//      *
//      * @returns {{view: {colModels: *[], positionRefer: view.positionRefer, height: number}, async: {url: string}}}
//      */
//     partnerAddressConfig: function(partnerId) {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "addressName", label: i18n["acct.autoCombobox.colName.code"], align: "left", width: 200}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent().width() ;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/partner/getPartnerAddressDatas.json",
//                 data: {
//                     partnerId: partnerId
//                 }
//             }
//         }
//     },
//
//     /**
//      * 员工
//      * add by kehuang 2016/01/03
//      */
//     employeeConfig: function() {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"], align: "left", width: 70},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left", width: 70}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent().width() ;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/partner/getEmployeeAutoComboData.json"
//             }
//         }
//     },
//
//     /**
//      * 结算方式的联想控件
//      * add by huangs
//      * @returns {{view: {colModels: *[], singleColumnNotHead: boolean, positionRefer: view.positionRefer, widthRefer: view.widthRefer, localData: *}, async: {dataSourceType: string}}}
//      */
//     costingMethodAutoComboboxConfig: function() {
//
//         var costingMethodEnum = enumUtil.getEnum("costingMethodEnum");
//
//         return {
//             view: {
//                 colModels: [
//                     {name: "name", label: "name"},
//                     {name: "value", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true);
//                 },
//                 localData: costingMethodEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     },
//
//     /**
//      * 计量单位
//      * add by huangs
//      * @returns {{view: {colModels: *[], singleColumnNotHead: boolean, positionRefer: view.positionRefer, widthRefer: view.widthRefer}, async: {url: string}}}
//      */
//     measdocConfig: function() {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"], align: "left", width: 70, isHide: true},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left", width: 70}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent().width() ;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/bd/getUomComboDatas.json"
//             }
//         }
//     },
//
//     //物料组联想控件
//     invclassConfig: function() {
//         return {
//             view: {
//                 colModels: [
//                     {name: "id", isHide: true},
//                     {name: "code", label: i18n["acct.autoCombobox.colName.code"], align: "left", width: 70},
//                     {name: "name", label: i18n["acct.autoCombobox.colName.name"], align: "left", width: 70}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent().parent().width() ;
//                 }
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/bd/getAcctInvclassAutoComboData.json"
//             }
//         }
//     },
//
//     /**
//      *closingStock 联想控件
//      *add by kehuang 2016/01/18
//      **/
//     acctClosingStockAutoComboboxByConfig: function(ruleId){
//         return {
//             view: {
//                 colModels: [
//                     {name: "closingStockSubjectId", isHide: true},
//                     {name: "closingStockSubjectCode", label: i18n["acct.setup.AcctSubjectEntity.subjectCode"], align: "left", width: 150},
//                     {name: "closingStockSubjectName", label: i18n["acct.setup.AcctSubjectEntity.subjectName"], align: "left", width: 200}
//                 ],
//                 positionRefer: function () {
//                     return $(this).parent().parent("div");
//                 }
//                 ,height : 350
//             },
//             async: {
//                 url: App["contextPath"] + "/acct/setup/getAcctClosingStockAutoComboData.json",
//                 data: {ruleId: ruleId}
//             }
//         }
//     },
//
//     /**
//      *closingStock 联想控件
//      **/
//     finishStatusAutoComboboxByConfig: function(){
//         var finishStatusEnum = enumUtil.getEnum("finishStatusEnum");
//
//         finishStatusEnum = finishStatusEnum.slice(0);
//         finishStatusEnum.unshift({value:null,name:i18n["acct.common.AutoCombobox.option.all"]});
//         return {
//             view: {
//                 colModels: [
//                     {name: "name", label: "name"},
//                     {name: "value", isHide: true}
//                 ],
//                 singleColumnNotHead: true,
//                 positionRefer: function () {
//                     return $(this).parent("label");
//                 },
//                 widthRefer: function () {
//                     return $(this).parent("label").outerWidth(true) + 12;
//                 },
//                 localData: finishStatusEnum
//             },
//             async: {
//                 dataSourceType: "local"
//             }
//         }
//     }
// };