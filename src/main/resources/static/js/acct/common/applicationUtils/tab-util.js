/**
 * 选项卡 工具
 * denpendence: [jQuery]
 */
var acctTabsUtil = {
	/**
	 * 渲染 选项卡
	 * html布局要求
	 * <div class="sub-tab-nav">
	 *  <ul id="tabTitleConDiv" class="clearfix">
	 *      <li id="tab-1" tab-content-id="tab-content-1" class="first">选择卡1</li>
	 *      <li id="tab-2" tab-content-id="tab-content-2" class="">选择卡2</li>
	 *      <li id="tab-3" tab-content-id="tab-content-3" class="">选择卡3</li>
	 *      <li id="tab-4" tab-content-id="tab-content-4" class="">选择卡4</li>
	 *  </ul>
	 * </div>
	 * <div class="tab-wrap">
	 *  <div id="tab-content-1" class="tab-bd">
	 *      选项卡区域 1
	 *  </div>
	 *  <div id="tab-content-2" class="tab-bd">
	 *      选项卡区域 2
	 *  </div>
	 *  <div id="tab-content-3" class="tab-bd">
	 *      选项卡区域 3
	 *  </div>
	 *  <div id="tab-content-4" class="tab-bd">
	 *      选项卡区域 4
	 *  </div>
	 * </div>
	 *
	 */
	render: function (callBack) {
		//选项卡切换
		$(".tab > li").click(function () {
			var _self = this,
				$self = $(_self),
				$parent = $self.closest(".tab"),
				ind = $parent.find("li").index($self),
				$tabContentCon;

			$self.siblings("li").removeClass("on");
			$self.addClass("on");

			$tabContentCon = $parent.next(".tab-content").find(".tab-panel").eq(ind);
			$tabContentCon.siblings(".tab-panel").removeClass("on");
			$tabContentCon.addClass("on");

			if ($.isFunction(callBack)) {
				callBack.apply(null, [ind, _self, $tabContentCon[0]])
			}
		});
	},
    /**
     * 获得不在菜单按钮中的tab的页签信息
     * @param key 获取页面的key
     * @param templateData 模板信息
     */
    getNotInMenuTabInfo: function (key, templateData) {
        var tabInfo = {
            // 销售发票[SalesInvoice] 新增页面
            salesInvoiceDetail_add: {
                code: "salesInvoiceDetail",
                title: i18n["acct.tab.salesInvoiceDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleInvoice/add.htm"
            },

            // 销售发票[SalesInvoice]
            salesInvoiceDetail: {
                code: "salesInvoiceDetail",
                title: i18n["acct.tab.salesInvoiceDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleInvoice/loadBill.htm?billId=<%= billId%>"
            },


            // 销售红字发票[SaleCreditNote] 新增
            saleCreditNoteDetail_add: {
                code: "saleCreditNoteDetail",
                title: i18n["acct.tab.saleCreditNoteDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleCreditNote/add.htm"
            },

            // 销售红字发票[SaleCreditNote]
            saleCreditNoteDetail: {
                code: "saleCreditNoteDetail",
                title: i18n["acct.tab.saleCreditNoteDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleCreditNote/loadBill.htm?billId=<%= billId%>"
            },


            // 销售追加发票[Debit Note（Sales）]新增
            saleDebitNoteDetail_add: {
                code: "saleDebitNoteDetail",
                title: i18n["acct.tab.saleDebitNoteDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleDebitNote/add.htm"
            },

            // 销售追加发票[Debit Note（Sales）]
            saleDebitNoteDetail: {
                code: "saleDebitNoteDetail",
                title: i18n["acct.tab.saleDebitNoteDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleDebitNote/loadBill.htm?billId=<%= billId%>"
            },


            // 销售收款单 新增
            saleReceivablesDetail_add: {
                code: "saleReceivablesDetail",
                title: i18n["acct.tab.saleReceivablesDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleReceivables/add.htm"
            },

            // 销售收款单
            saleReceivablesDetail: {
                code: "saleReceivablesDetail",
                title: i18n["acct.tab.saleReceivablesDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleReceivables/loadBill.htm?billId=<%= billId%>"
            },


            // 采购发票 新增
            purchaseInvoiceDetail_add: {
                code: "purchaseInvoiceDetail",
                title: i18n["acct.tab.purchaseInvoiceDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseInvoice/add.htm"
            },

            // 采购发票
            purchaseInvoiceDetail: {
                code: "purchaseInvoiceDetail",
                title: i18n["acct.tab.purchaseInvoiceDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseInvoice/loadBill.htm?billId=<%= billId%>"
            },

            // 自给发票 新增
            selfBilledInvoiceDetail_add: {
                code: "selfBilledInvoiceDetail",
                title: i18n["acct.tab.selfBilledInvoiceDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/selfBilledInvoice/add.htm"
            },

            // 自给发票
            selfBilledInvoiceDetail: {
                code: "selfBilledInvoiceDetail",
                title: i18n["acct.tab.selfBilledInvoiceDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/selfBilledInvoice/loadBill.htm?billId=<%= billId%>"
            },

            // 采购红字发票 新增
            purchaseCreditNoteDetail_add: {
                code: "purchaseCreditNoteDetail",
                title: i18n["acct.tab.purchaseCreditNoteDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseCreditNote/add.htm"
            },

            // 采购红字发票
            purchaseCreditNoteDetail: {
                code: "purchaseCreditNoteDetail",
                title: i18n["acct.tab.purchaseCreditNoteDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseCreditNote/loadBill.htm?billId=<%= billId%>"
            },


            // 采购追加发票 新增
            purchaseDebitNoteDetail_add: {
                code: "purchaseDebitNoteDetail",
                title: i18n["acct.tab.purchaseDebitNoteDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseDebitNote/add.htm"
            },

            // 采购追加发票
            purchaseDebitNoteDetail: {
                code: "purchaseDebitNoteDetail",
                title: i18n["acct.tab.purchaseDebitNoteDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseDebitNote/loadBill.htm?billId=<%= billId%>"
            },


            // 采购付款单 新增
            purchaseApPaymentDetail_add: {
                code: "purchaseApPaymentDetail",
                title: i18n["acct.tab.purchaseApPaymentDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseApPayment/add.htm"
            },

            // 采购付款单
            purchaseApPaymentDetail: {
                code: "purchaseApPaymentDetail",
                title: i18n["acct.tab.purchaseApPaymentDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseApPayment/loadBill.htm?billId=<%= billId%>"
            },


            // 银行付款单 新增
            //bankPaymentDetail_add: {
            //    code: "bankPaymentDetail",
            //    title: i18n["acct.tab.bankPaymentDetail"],
            //    urlTemplate: App["contextPath"] + "/acct/bank/bankPayment/add.htm"
            //},

            // 银行付款单
            //bankPaymentDetail: {
            //    code: "bankPaymentDetail",
            //    title: i18n["acct.tab.bankPaymentDetail"] ,
            //    urlTemplate: App["contextPath"] + "/acct/bank/bankPayment/loadBill.htm?billId=<%= billId%>"
            //},

            // 费用单 新增
            bankExpenceDetail_add: {
                code: "bankExpenceDetail",
                title: i18n["acct.tab.bankExpenceDetail"],
                urlTemplate: App["contextPath"] + "/acct/bank/bankExpence/add.htm"
            },

            // 费用单
            bankExpenceDetail: {
                code: "bankExpenceDetail",
                title: i18n["acct.tab.bankExpenceDetail"] ,
                urlTemplate: App["contextPath"] + "/acct/bank/bankExpence/loadBill.htm?billId=<%= billId%>"
            },
            // K1 from 新增
            bankExpenceK1Detail_add: {
                code: "bankExpenceK1Detail",
                title: i18n["acct.tab.bankExpenceK1Detail"],
                urlTemplate: App["contextPath"] + "/acct/bank/k1form/add.htm"
            },

            // K1 from
            bankExpenceK1Detail: {
                code: "bankExpenceK1Detail",
                title: i18n["acct.tab.bankExpenceK1Detail"] ,
                urlTemplate: App["contextPath"] + "/acct/bank/k1form/loadBill.htm?billId=<%= billId%>"
            },

            // 银行收款单 新增
            bankReceivablesDetail_add: {
                code: "bankReceivablesDetail",
                title: i18n["acct.tab.bankReceivablesDetail"],
                urlTemplate: App["contextPath"] + "/acct/bank/bankReceivables/add.htm"
            },

            // 银行收款单
            bankReceivablesDetail: {
                code: "bankReceivablesDetail",
                title: i18n["acct.tab.bankReceivablesDetail"],
                urlTemplate: App["contextPath"] + "/acct/bank/bankReceivables/loadBill.htm?billId=<%= billId%>"
            },

            // 银行对账单 新增
            bankingStatement_add: {
                code: "bankStatementEdit001",
                title: i18n["acct.tab.bankStatementEdit001"],
                urlTemplate: App["contextPath"] + "/acct/banking/bankingStatementEdit.htm"
            },

            // 银行对账单
            bankingStatement: {
                code: "banking30",
                title: i18n["acct.tab.bankStatementEdit001"],
                urlTemplate: App["contextPath"] + "/acct/banking/bankingStatement.htm"
            },

            // 其他 新增
            otherbillDetail_add: {
                code: "otherbillDetail",
                title: i18n["acct.tab.otherbillDetail"],
                urlTemplate: App["contextPath"] + "/acct/otherbill/add.htm"
            },

            // 其他
            otherbillDetail: {
                code: "otherbillDetail",
                title: i18n["acct.tab.otherbillDetail"],
                urlTemplate: App["contextPath"] + "/acct/otherbill/loadBill.htm?billId=<%= billId%>"
            },

            // 查分录页面
            viewJournal: {
                code: "viewJournal",
                title: i18n["acct.tab.viewJournal"],
                urlTemplate: App["contextPath"] + "/acct/voucher/loadVoucher.htm?billType=<%= billType%>&billId=<%= billId%>"
            },

            // 查看总账分录页面 add by zhangyx on 2016-12-08
            viewAccountJournal: {
                code: "viewAccountJournal",
                title: i18n["acct.tab.viewJournal"],
                urlTemplate: App["contextPath"] + "/acct/voucher/loadAccountVoucher.htm?voucherId=<%= voucherId%>"
            },

            // 查看利息分录   add by lzs 2016-9-21
            viewInterestJournal: {
                code: "viewJournal",
                title: i18n["acct.tab.viewJournal"],
                urlTemplate: App["contextPath"] + "/acct/voucher/loadInterestVoucher.htm?voucherId=<%= voucherId%>"
            },

            // 固资卡片编辑页面
            faCardDetail: {
                code: "faCardDetail",
                title: i18n["acct.tab.faCardDetail"],
                urlTemplate: App["contextPath"] + "/acct/fa/faCardEdit.htm?cardId=<%= cardId%>"
            },
            
            // 固资卡片新增页面
            faCardDetail_add: {
                code: "faCardDetail",
                title: i18n["acct.tab.faCardDetail"],
                urlTemplate: App["contextPath"] + "/acct/fa/faCardEdit.htm"
            },

            // 卡片变更页
            faCardChange: {
                code: "faCardChange",
                title: i18n["acct.tab.faCardChange"],
                urlTemplate: App["contextPath"] + "/acct/fa/faCardChange.htm"
            },

            // 卡片变更页
            faCardChange_edit: {
                code: "faCardChange",
                title: i18n["acct.tab.faCardChange"],
                urlTemplate: App["contextPath"] + "/acct/fa/faCardChange.htm?cardId=<%= cardId%>"
            },

            // 分期付款编辑页
            faPayCardDetail: {
                code: "faPayCardDetail",
                title: i18n["acct.tab.faPayCardDetail"],
                urlTemplate: App["contextPath"] + "/acct/fa/editFaPayCard.htm?faPayCardId=<%= cardId%>"
            },

            // 分期付款新增页
            faPayCardDetail_add: {
                code: "faPayCardDetail",
                title: i18n["acct.tab.faPayCardDetail"],
                urlTemplate: App["contextPath"] + "/acct/fa/editFaPayCard.htm?faCardId=<%= cardId%>"
            },

            // 销售报价单编辑页
            saleQuotationDetail: {
                code: "saleQuotationDetail",
                title: i18n["acct.tab.saleQuotationDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleQuotation/loadBill.htm?billId=<%= billId%>"
            },

            // 销售报价单新增页
            saleQuotationDetail_add: {
                code: "saleQuotationDetail",
                title: i18n["acct.tab.saleQuotationDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleQuotation/add.htm"
            },

            // 销售订单编辑页
            saleOrderDetail: {
                code: "saleOrderDetail",
                title: i18n["acct.tab.saleOrderDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleOrder/loadBill.htm?billId=<%= billId%>"
            },

            // 销售订单新增页
            saleOrderDetail_add: {
                code: "saleOrderDetail",
                title: i18n["acct.tab.saleOrderDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleOrder/add.htm"
            },

            // 物料卡片编辑页面
            inventoryEdit: {
                code: "stock20",
                title: i18n["acct.tab.inventoryEdit"],
                urlTemplate: App["contextPath"] + "/acct/stock/inventoryEdit.htm?inventoryId=<%= inventoryId%>"
            },

            // 物料卡片新增页面
            inventoryEdit_add: {
                code: "stock20",
                title: i18n["acct.tab.inventoryEdit"],
                urlTemplate: App["contextPath"] + "/acct/stock/inventoryEdit.htm"
            },

            // 销售交货单编辑页
            saleOutDetail: {
                code: "saleOutDetail",
                title: i18n["acct.tab.saleOutDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleOut/loadBill.htm?billId=<%= billId%>"
            },

            // 销售交货单新增页
            saleOutDetail_add: {
                code: "saleOutDetail",
                title: i18n["acct.tab.saleOutDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleOut/add.htm"
            },

            // 21天生成销售发票页面
            generateSaleInvoice: {
                code: "generateSaleInvoice",
                title: i18n["acct.tab.generateSaleInvoice"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleOut/generateSaleInvoice.htm"
            },

            // 销售退货单编辑页
            saleReturnDetail: {
                code: "saleReturnDetail",
                title: i18n["acct.tab.saleReturnDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleReturn/loadBill.htm?billId=<%= billId%>"
            },

            // 销售退货单新增页
            saleReturnDetail_add: {
                code: "saleReturnDetail",
                title: i18n["acct.tab.saleReturnDetail"],
                urlTemplate: App["contextPath"] + "/acct/sales/saleReturn/add.htm"
            },

            // 采购订单编辑页
            purchaseOrderDetail: {
                code: "purchaseOrderDetail",
                title: i18n["acct.tab.purchaseOrderDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseOrder/loadBill.htm?billId=<%= billId%>"
            },

            // 采购订单编辑页
            purchaseOrderDetail_add: {
                code: "purchaseOrderDetail",
                title: i18n["acct.tab.purchaseOrderDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseOrder/add.htm"
            },

            // 采购收货单编辑页
            purchaseInDetail: {
                code: "purchaseInDetail",
                title: i18n["acct.tab.purchaseInDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseIn/loadBill.htm?billId=<%= billId%>"
            },

            // 采购收货单编辑页
            purchaseInDetail_add: {
                code: "purchaseInDetail",
                title: i18n["acct.tab.purchaseInDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseIn/add.htm"
            },

            // 采购退货单编辑页
            purchaseReturnDetail: {
                code: "purchaseReturnDetail",
                title: i18n["acct.tab.purchaseReturnDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseReturn/loadBill.htm?billId=<%= billId%>"
            },

            // 采购退货单新增页
            purchaseReturnDetail_add: {
                code: "purchaseReturnDetail",
                title: i18n["acct.tab.purchaseReturnDetail"],
                urlTemplate: App["contextPath"] + "/acct/purchase/purchaseReturn/add.htm"
            },
            // 库存调整单编辑页
			stockAdjustmentDetail: {
                code: "stockAdjustmentDetail",
                title: i18n["acct.tab.stockAdjustmentDetail"],
                urlTemplate: App["contextPath"] + "/acct/stock/stockAdjustment/loadBill.htm?billId=<%= billId%>"
            },

            // 库存调整单新增页
			stockAdjustmentDetail_add: {
                code: "stockAdjustmentDetail",
                title: i18n["acct.tab.stockAdjustmentDetail"],
                urlTemplate: App["contextPath"] + "/acct/stock/stockAdjustment/add.htm"
            },

            //单据联查页面
            relatedBill:{
                code: "relatedBillQuery",
                title: i18n["acct.common.button.RelatedBill"],
                urlTemplate: App["contextPath"] + "/bill/relatedBill.htm?billId=<%=billId%>&billNo=<%=billNo%>&billType=<%=billType%>"
            }
        };

        var tabItem = tabInfo[key];
        tabItem.url = _.template(tabItem["urlTemplate"], templateData != null ? templateData : {});

        return tabItem;
    },

    /**
     * 打开不在菜单按钮中的tab的页签信息
     * @param key 获取页面的key
     * @param templateData 模板信息
     */
    addTabNotInMenu: function (key, templateData) {
        var tabInfo = acctTabsUtil.getNotInMenuTabInfo(key, templateData);
        top.addTab(tabInfo.code,  tabInfo.title, tabInfo.url);
    },

    openInitBankBalance: function() {
        top.addTab("initBankBalance",  i18n["acct.setup.initBankBalanceTabName"] ,App["contextPath"] + "/acct/setup/initBankBalance.htm");
    },

    /**
     * 根据单据类型与单据id打开相应的单据页
     * @param billType 单据类型
     * @param billId 单据id
     */
    openDocBillTab: function (billType, billId) {

        // 销售发票 SalesInvoice
        if (billType == "SI" || billType == "SI_I") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("salesInvoiceDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("salesInvoiceDetail_add");
            }
        }
        // 销售红字发票 SaleCreditNote
        else if (billType == "SC") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("saleCreditNoteDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("saleCreditNoteDetail_add");
            }
        }
        // 销售追加发票 Debit Note（Sales）
        else if (billType == "SD") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("saleDebitNoteDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("saleDebitNoteDetail_add");
            }
        }
        // 销售收款单
        else if (billType == "SR") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("saleReceivablesDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("saleReceivablesDetail_add");
            }
        }
        // 采购发票
        else if (billType == "PI" || billType == "PI_I") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("purchaseInvoiceDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("purchaseInvoiceDetail_add");
            }
        }
        // 采购发票
        else if (billType == "SB") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("selfBilledInvoiceDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("selfBilledInvoiceDetail_add");
            }
        }
        // 采购红字发票
        else if (billType == "PC") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("purchaseCreditNoteDetail", {billId: billId});
            } else{
                acctTabsUtil.addTabNotInMenu("purchaseCreditNoteDetail_add");
            }
        }
        // 采购追加发票
        else if (billType == "PD") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("purchaseDebitNoteDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("purchaseDebitNoteDetail_add");
            }
        }
        // 采购付款单
        else if (billType == "PP") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("purchaseApPaymentDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("purchaseApPaymentDetail_add");
            }
        }
        // 银行付款单
        else if (billType == "BE") {
               if (billId) {
                   acctTabsUtil.addTabNotInMenu("bankExpenceDetail", {billId: billId});
               } else {
                   acctTabsUtil.addTabNotInMenu("bankExpenceDetail_add");
               }
        }
        else if (billType == "BEK1") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("bankExpenceK1Detail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("bankExpenceK1Detail_add");
            }
        }
        // 费用单
        else if (billType == "BP") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("bankExpenceDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("bankExpenceDetail_add");
            }
        }
        // 银行收款单
        else if (billType == "BR") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("bankReceivablesDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("bankReceivablesDetail_add");
            }
        }
        // 其他单据
        else if (billType == "OB") {
            acctTabsUtil.addTabNotInMenu("otherbillDetail", {billId: billId});
        }
        //销售交货单
        else if (billType == "DO") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("saleOutDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("saleOutDetail_add");
            }
        }
        //销售退货单
        else if (billType == "SGR") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("saleReturnDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("saleReturnDetail_add");
            }
        }
        //采购收货单
        else if (billType == "GR") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("purchaseInDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("purchaseInDetail_add");
            }
        }
        //采购退货单
        else if (billType == "PGR") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("purchaseReturnDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("purchaseReturnDetail_add");
            }
        }
        //销售订单
        else if (billType == "SO") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("saleOrderDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("saleOrderDetail_add");
            }
        }
        //销售报价单
        else if (billType == "SQ") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("saleQuotationDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("saleQuotationDetail_add");
            }
        }
        //采购订单
        else if (billType == "PO") {
            if (billId) {
                acctTabsUtil.addTabNotInMenu("purchaseOrderDetail", {billId: billId});
            } else {
                acctTabsUtil.addTabNotInMenu("purchaseOrderDetail_add");
            }
        }
		else if (billType == "K1") {
			if (billId) {
				acctTabsUtil.addTabNotInMenu("bankExpenceK1Detail", {billId: billId});
			} else {
				acctTabsUtil.addTabNotInMenu("bankExpenceK1Detail_add");
			}
		}
		else if (billType == "AJ") {
			if (billId) {
				acctTabsUtil.addTabNotInMenu("stockAdjustmentDetail", {billId: billId});
			} else {
				acctTabsUtil.addTabNotInMenu("stockAdjustmentDetail_add");
			}
		}

        if(!$("#menuPanelDiv",top.document).hasClass('sx')){
            $("#menuPanelDiv",top.document).addClass('sx');
            $("#pageDivId",top.document).css({"paddingLeft":42});
            $("#logoId",top.document).hide();
            $("#minLogoId",top.document).show();
        }
        top.Frame.tabpanel.resize.call(top.Frame.tabpanel);
    },

    /**
     * 打开总账凭证查看录分录页面 add by zhangyx on 2016-12-07
     * @param voucherId 凭证id
     */
    openVouhcherDetailTab: function (voucherId) {
        top.addTab("voucherDetail",  i18n["acct.voucher.voucherDetailTabName"],App["contextPath"] + "/acct/voucher/viewVoucherDetail.htm?voucherId="+voucherId);
    },

	/**
	 * 打开核销撤回生成分录页面 add by zhangyx on 2018-3-15
	 * @param billId 凭证id
	 */
	openUnWriteOffVoucherTab: function (billId) {
		$.ajax({
			contentType: "application/json",
			dataType: "json",
			url: App["contextPath"] + "/acct/voucher/getUnWriteOffVoucherId.json?billId="+billId,
			success: function(data) {
				if(data.success){
					top.addTab("voucherDetail",  i18n["acct.voucher.voucherDetailTabName"],App["contextPath"] + "/acct/voucher/viewVoucherDetail.htm?voucherId="+data.info);
				}else{
					TipsUtil.error(data.message);
				}
			}
		});
	},

	openVoucherDetailTabByNo: function (voucherNo) {
		top.addTab("voucherDetail",  i18n["acct.voucher.voucherDetailTabName"],App["contextPath"] + "/acct/voucher/viewVoucherDetailByNo.htm?voucherNo="+voucherNo);
	},

    //往来对象的页面跳转
    openAcctPartnerTab: function (acctPartnerId) {
		if (permissionUtil.hasAuth("partner016")) {
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("addAcctPartnerEditPage",  i18n["acct.partner.AcctPartnerListPage.editName"],App["contextPath"] + "/acct/partner/supplierAndCustomerEdit.htm?editRowId="+acctPartnerId, true, activeTabIndex);
		} else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddDebtorCreditorPermission"]);
		}
    },

    //员工页面跳转
    openEmployeeTab: function (employeeId) {
		var activeTabIndex =top.Frame.getActiveTab().nid;
        top.addTab("employeeEdit",   i18n["acct.partner.EmployeeListPage.editName"],App["contextPath"] + "/acct/partner/employeeEdit.htm?rowId="+employeeId, true, activeTabIndex);
    },

    //其他人员页面跳转
    openOtherPersonTab: function (otherId) {
        top.addTab("otherEdit", i18n["acct.partner.OthersListPage.editName"], App["contextPath"] + "/acct/partner/otherEdit.htm?rowId="+otherId , true);
    },

    //结算方式的页面跳转
    openSettleTab: function (settleId) {
		if (permissionUtil.hasAuth("setup038")) {
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("setup40",  i18n["acct.setup.settle.TabName"],App["contextPath"] + "/acct/setup/houseBank.htm?settleId="+settleId, true, activeTabIndex);
		} else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddSettlePermission"]);
		}
    },

    //结算方式的页面跳转
    openSettleListTab: function () {
        top.addTab("setup40",  i18n["acct.setup.settle.TabName"],App["contextPath"] + "/acct/setup/houseBank.htm?settleId=");
    },

	//Period Lock    kehuang
	openPeriodLockTab:function(){
		top.addTab("l4030",   "Period Lock", App["contextPath"] + "/acct/period/closeAccount.htm");
	},

    //会计科目的页面跳转
    openAcctSubjectTab: function (acctSubjectId) {
        top.addTab("acctSubjectList",  i18n["acct.setup.voucher.acctSubjectTabName"] ,App["contextPath"] + "/acct/voucher/acctSubject.htm?acctSubjectId="+acctSubjectId);
    },

    //明细分类账页面跳转 add by zhangyx on 2016-06-30
    openSubsidiaryLedgerTab: function (subjectCode, selectedPeriodFrom, selectedPeriodTo) {
        top.addTab("subsidiaryLedgerSheetList",  i18n["acct.report.subsidiaryLedgerTabName"] ,
            App["contextPath"] + "/acct/report/loadSubsidiaryLedger.htm?subjectCode="+subjectCode+"&selectedPeriodFrom="+selectedPeriodFrom+"&selectedPeriodTo="+selectedPeriodTo);
    },

    //add by zhangyx on 2016-07-28 start
    //科目余额初始页面跳转
    openInitBalanceAccountsTab: function () {
        top.addTab("initBalanceAccounts",  i18n["acct.setup.initBalanceAccountsTabName"] ,App["contextPath"] + "/acct/setup/initBalanceAccounts.htm");
    },

    //试算平衡表页面跳转
    openTrialBalanceSheetTab: function (acctYear, acctPeriod) {
        top.addTab("trialBalanceSheet",  i18n["acct.report.trialBalanceSheetTabName"] ,App["contextPath"] + "/acct/report/trialBalanceSheetList.htm?acctYear="+acctYear+"&acctPeriod="+acctPeriod);
    },

    //查看未关联业务票据页面跳转
    openViewNotConnectedImageTab: function (beginYear, beginMonth, endYear, endMonth) {
        top.addTab("viewNotConnectedImage",  i18n["acct.biz.viewNotConnectedImageTabName"] ,App["contextPath"] + "/acct/biz/viewNotConnectedImage.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&endYear="+endYear+"&endMonth="+endMonth);
    },

    //GST-03页面跳转
    openGST03Tab: function () {
        top.addTab("gst03",  i18n["acct.gst.gst03TabName"] ,App["contextPath"] + "/acct/gst/gst03.htm");
    },

    //GST-F5页面跳转
    openGSTF5Tab: function () {
        top.addTab("gstF5",  i18n["singapore.gst.gstF5TabName"] ,App["contextPath"] + "/singapore/gst/gstF5.htm");
    },

	//SST-02页面跳转
	openSST02Tab: function () {
		top.addTab("sst11",  i18n["acct.sst.sst02TabName"] ,App["contextPath"] + "/acct/sst/sst02.htm");
	},

    //银行对账单页面跳转
    openBankingStatementTab: function (beginYear, beginMonth, endYear, endMonth) {
        top.addTab("bankingStatement",  i18n["acct.banking.bankingStatementTabName"] ,App["contextPath"] + "/acct/banking/bankingStatement.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&endYear="+endYear+"&endMonth="+endMonth);
    },

    //期末调汇页面跳转
    openExchangeRateAdjustmentTab: function (acctYear, acctPeriod) {
        top.addTab("exchangeRateAdjustment",  i18n["acct.period.exchangeRateAdjustmentTabName"] ,App["contextPath"] + "/acct/period/exchangeRateAdjustment.htm?acctYear="+acctYear+"&acctPeriod="+acctPeriod);
    },

	// 区域页面跳转,
	openAreaTab: function (isAdd) {
		if (permissionUtil.hasAuth("bd017")) {
			var url = App["contextPath"] + "/acct/bd/acctArea.htm";
			if (isAdd) {
				url += "?isAdd=" + isAdd;
			}
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("setup7030",  i18n["acct.bd.areaTabName"] , url, true, activeTabIndex);
		} else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddAreaPermission"]);
		}
	},

	// 代理人
	openAgentTab: function (isAdd) {
		if (permissionUtil.hasAuth("bd003")) {
			var url = App["contextPath"] + "/acct/bd/agent.htm";
			if (isAdd) {
				url += "?isAdd=" + isAdd;
			}
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("setup7020",  i18n["acct.bd.agentTabName"] , url, true, activeTabIndex);
		} else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddAgentPermission"]);
		}
	},

	// 项目
	openProjectTab: function (isAdd) {
		if (permissionUtil.hasAuth("bd010")) {
			var url = App["contextPath"] + "/acct/bd/project.htm";
			if (isAdd) {
				url += "?isAdd=" + isAdd;
			}
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("setup7010",  i18n["acct.bd.projectTabName"] , url, true, activeTabIndex);
		} else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddProjectPermission"]);
		}
	},

	// 计量单位
	openMeasdocTab: function (isAdd) {
		if (permissionUtil.hasAuth("bd031")) {
			var url = App["contextPath"] + "/acct/bd/measDoc.htm";
			if (isAdd) {
				url += "?isAdd=" + isAdd;
			}
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("setup8030",  i18n["acct.bd.measdocTabName"] , url, true, activeTabIndex);
		} else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddMeasdocPermission"]);
		}
	},

	// 员工
	openEmployeeTabByAutoCombobox: function (isAdd) {
		var self = this;
		if (permissionUtil.hasAuth("partner009")) {
			self.openEmployeeTab("");
		} else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddEmployeePermission"]);
		}
	},

	//银行资料页面跳转 kehuang
	openBankDetailsTab: function (isAdd) {
		var hasRight = rightUtil.hasRight("setup032");
		if (hasRight){
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("setup50", i18n["acct.setup.Bank.TabName"], App["contextPath"] + "/acct/setup/acctBank.htm?isAdd="+isAdd , true,
				activeTabIndex);
		}else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddBankDetailPermission"]);
		}
	},

	//仓库页面跳转 kehuang
	openWarehouseTab: function (isAdd) {
		var hasRight = rightUtil.hasRight("bd024");
		if (hasRight){
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("setup8010", i18n["acct.setup.Warehouse.TabName"], App["contextPath"] + "/acct/bd/warehouse.htm?isAdd="+isAdd , true,activeTabIndex);
		}else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddWarehousePermission"]);
		}
	},
	//部门页面跳转 kehuang
	openDepartmentTab: function (isAdd) {
		var hasRight = rightUtil.hasRight("partner002");
		if (hasRight){
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("partner10", i18n["acct.setup.Department.TabName"], App["contextPath"] + "/acct/partner/department.htm?isAdd="+isAdd , true,activeTabIndex);
		}else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddDepartmentPermission"]);
		}
	},
	//系统参数页面跳转 kehuang
	openSystemSettingTab: function (tabIndex) {
		var hasRight = rightUtil.hasRight("setup040");
		if (hasRight){
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("setup10", i18n["acct.setup.SystemSetting.TabName"], App["contextPath"] + "/acct/setup/systemSetting.htm?tabIndex="+tabIndex , true,activeTabIndex);
		}else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddSystemSettingPermission"]);
		}
	},

	// kehuang  20180930
	openSstTariffCodeTab: function(tabIndex) {
		var hasRight = rightUtil.hasRight("sst006");
		if (hasRight){
			var activeTabIndex =top.Frame.getActiveTab().nid;
			top.addTab("sst10", i18n["acct.setup.SstSetting.TabName"], App["contextPath"] + "/acct/sst/sstSetting.htm?tabIndex="+tabIndex , true,activeTabIndex);
		}else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddSstSettingPermission"]);
		}
	},

	// hongjinqiu 20190220 跳转到极简开票打印模版页面
	openSmCustomPrintTemplateListTab: function() {
		var activeTabIndex =top.Frame.getActiveTab().nid;
		top.addTab("smbill20", i18n["acct.common.menu.customPrintTemplate"], App["contextPath"] + "/acct/smbill/smCustomPrintTemplateList.htm", true,activeTabIndex);
	},

	/**
	 * hongjinqiu 20190220 跳转到极简开票打印模版新增页面
	 */
	openSimpleInvoiceCustomPrintConfigTemplate: function() {
		var hasRight = rightUtil.hasRight("smbill010");
		if (hasRight){
			top.addTab("smPrintTemplateDetail",  i18n["acct.printtemplate.tab.name"] ,App["contextPath"] + "/acct/system/simpleInvoice/simpleInvoiceCustomPrintConfigTemplate.htm");
		} else {
			TipsUtil.warn(i18n["acct.common.TipsUtils.message.noAddSstSettingPermission"]);
		}
	},

    //单据列表页面跳转
    openBillListTab: function (billType, beginYear, beginMonth, endYear, endMonth, flag) {
        var paramUrl = "?beginYear="+beginYear+"&beginMonth="+beginMonth+"&endYear="+endYear+"&endMonth="+endMonth+"&flag="+flag;

        // 销售发票 SalesInvoice
        if (billType == "SI") {
            top.addTab("saleInvoiceList",  i18n["acct.closeFinancialYearEnd.saleInvoice"], App["contextPath"] + "/acct/sales/saleInvoice/saleInvoiceList.htm"+paramUrl);
        }
        // 销售红字发票 SaleCreditNote
        else if (billType == "SC") {
            top.addTab("saleCreditNoteList",  i18n["acct.closeFinancialYearEnd.saleCredit"], App["contextPath"] + "/acct/sales/saleCreditNote/saleCreditNoteList.htm"+paramUrl);
        }
        // 销售追加发票 Debit Note（Sales）
        else if (billType == "SD") {
            top.addTab("saleDebitNoteList",  i18n["acct.closeFinancialYearEnd.saleDebit"], App["contextPath"] + "/acct/sales/saleDebitNote/saleDebitNoteList.htm"+paramUrl);
        }
        // 销售收款单
        else if (billType == "SR") {
            top.addTab("saleReceivablesList",  i18n["acct.closeFinancialYearEnd.saleReceivables"], App["contextPath"] + "/acct/sales/saleReceivables/saleReceivablesList.htm"+paramUrl);
        }
        // 采购发票
        else if (billType == "PI") {
            top.addTab("purchaseInvoiceList",  i18n["acct.closeFinancialYearEnd.purchaseInvoice"], App["contextPath"] + "/acct/purchase/purchaseInvoice/purchaseInvoiceList.htm"+paramUrl);
        }
        // 自给发票
        else if (billType == "SB") {
            top.addTab("selfBilledInvoiceList",  i18n["acct.closeFinancialYearEnd.selfBilledInvoice"], App["contextPath"] + "/acct/purchase/purchaseInvoice/selfBilledInvoiceList.htm"+paramUrl);
        }
        // 采购红字发票
        else if (billType == "PC") {
            top.addTab("purchaseCreditNoteList",  i18n["acct.closeFinancialYearEnd.purchaseCredit"], App["contextPath"] + "/acct/purchase/purchaseCreditNote/purchaseCreditNoteList.htm"+paramUrl);
        }
        // 采购追加发票
        else if (billType == "PD") {
            top.addTab("purchaseDebitNoteList",  i18n["acct.closeFinancialYearEnd.purchaseDebit"], App["contextPath"] + "/acct/purchase/purchaseDebitNote/purchaseDebitNoteList.htm"+paramUrl);
        }
        // 采购付款单
        else if (billType == "PP") {
            top.addTab("purchasePaymentList",  i18n["acct.closeFinancialYearEnd.purchasePayment"], App["contextPath"] + "/acct/purchase/purchaseApPayment/purchasePaymentList.htm"+paramUrl);
        }
        // 费用单
        else if (billType == "BE") {
           top.addTab("bankExpenceList",  i18n["acct.closeFinancialYearEnd.bankExpence"], App["contextPath"] + "/acct/bank/bankExpence/bankExpenceList.htm"+paramUrl);
        }
        // 收入单
        else if (billType == "BR") {
            top.addTab("bankReceivablesList",  i18n["acct.closeFinancialYearEnd.bankReceivables"], App["contextPath"] + "/acct/bank/bankReceivables/bankReceivablesList.htm"+paramUrl);
        }
        // 其他单据
        else if (billType == "OB") {
            top.addTab("viewJournal",  i18n["acct.closeFinancialYearEnd.otherBill"], App["contextPath"] + "/acct/voucher/viewJournal.htm"+paramUrl);
        }
    },

    //单据列表页面跳转
    openBillAddTab: function (billType, beginYear, beginMonth, beginDay, endYear, endMonth, endDay) {

        // 销售发票 SalesInvoice
        if (billType == "SI") {
            top.addTab("salesInvoiceDetail",  i18n["acct.tab.salesInvoiceDetail"], App["contextPath"] + "/acct/sales/saleInvoice/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 销售红字发票 SaleCreditNote
        else if (billType == "SC") {
            top.addTab("saleCreditNoteDetail",  i18n["acct.tab.saleCreditNoteDetail"], App["contextPath"] + "/acct/sales/saleCreditNote/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 销售追加发票 Debit Note（Sales）
        else if (billType == "SD") {
            top.addTab("saleDebitNoteDetail",  i18n["acct.tab.saleDebitNoteDetail"], App["contextPath"] + "/acct/sales/saleDebitNote/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 销售收款单
        else if (billType == "SR") {
            top.addTab("saleReceivablesDetail",  i18n["acct.tab.saleReceivablesDetail"], App["contextPath"] + "/acct/sales/saleReceivables/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 采购发票
        else if (billType == "PI") {
            top.addTab("purchaseInvoiceDetail",  i18n["acct.tab.purchaseInvoiceDetail"], App["contextPath"] + "/acct/purchase/purchaseInvoice/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 自给发票
        else if (billType == "SB") {
            top.addTab("selfBilledInvoiceDetail",  i18n["acct.tab.purchaseInvoiceDetail"], App["contextPath"] + "/acct/purchase/selfBilledInvoice/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 采购红字发票
        else if (billType == "PC") {
            top.addTab("purchaseCreditNoteDetail",  i18n["acct.tab.purchaseCreditNoteDetail"], App["contextPath"] + "/acct/purchase/purchaseCreditNote/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 采购追加发票
        else if (billType == "PD") {
            top.addTab("purchaseDebitNoteDetail",  i18n["acct.tab.purchaseDebitNoteDetail"], App["contextPath"] + "/acct/purchase/purchaseDebitNote/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 采购付款单
        else if (billType == "PP") {
            top.addTab("purchaseApPaymentDetail",  i18n["acct.tab.purchaseApPaymentDetail"], App["contextPath"] + "/acct/purchase/purchaseApPayment/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 银行付款单
        else if (billType == "BP" || billType == "BE") {
            top.addTab("bankExpenceDetail",  i18n["acct.tab.bankExpenceDetail"], App["contextPath"] + "/acct/bank/bankExpence/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 银行收款单
        else if (billType == "BR") {
            top.addTab("bankReceivablesDetail",  i18n["acct.tab.bankReceivablesDetail"], App["contextPath"] + "/acct/bank/bankReceivables/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 银行对账单
        else if (billType == "BS") {
            top.addTab("banking30",  i18n["acct.tab.bankStatementEdit001"], App["contextPath"] + "/acct/banking/bankingStatement.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        // 其他单据
        else if (billType == "OB") {
            top.addTab("otherbillDetail",  i18n["acct.tab.otherbillDetail"], App["contextPath"] + "/acct/otherbill/add.htm?beginYear="+beginYear+"&beginMonth="+beginMonth+"&beginDay="+beginDay+"&endYear="+endYear+"&endMonth="+endMonth+"&endDay="+endDay+"&isNoDefineDate=true");
        }
        if(!$("#menuPanelDiv",top.document).hasClass('sx')){
            $("#menuPanelDiv",top.document).addClass('sx');
            $("#pageDivId",top.document).css({"paddingLeft":42});
            $("#logoId",top.document).hide();
            $("#minLogoId",top.document).show();
        }
        top.Frame.tabpanel.resize.call(top.Frame.tabpanel);
    },

    getTabCodeByBillType: function(billType){
        if(billType == CONST.BILL_TYPE.SALE_INVOICE){
            return {
                code: "salesInvoiceDetail",
                title: i18n["acct.tab.salesInvoiceDetail"]
            }
        }else if(billType == CONST.BILL_TYPE.PURCHASE_INVOICE){
            return {
                code: "purchaseInvoiceDetail",
                title: i18n["acct.tab.purchaseInvoiceDetail"]
            }
        }else if(billType == CONST.BILL_TYPE.SALE_RECEIVABLES_BILL){
            return {
                code: "saleReceivablesDetail",
                title: i18n["acct.tab.saleReceivablesDetail"]
            }
        }else if(billType == CONST.BILL_TYPE.PURCHASE_PAYMENT_BILL){
            return {
                code: "purchaseApPaymentDetail",
                title: i18n["acct.tab.purchaseApPaymentDetail"]
            }
        }else if(billType == CONST.BILL_TYPE.BANK_EXPENCE){
            return {
                code: "bankExpenceDetail",
                title: i18n["acct.tab.bankExpenceDetail"]
            }
        }else if(billType == CONST.BILL_TYPE.BANK_RECEIVABLES){
            return {
                code: "bankReceivablesDetail",
                title: i18n["acct.tab.bankReceivablesDetail"]
            }
        }
    },

    //add by zhangyx on 2016-07-28 end

    render: function (callBack) {
        //选项卡切换
        $("ul.tab").children('li').on("click",function(e){
            var _self = this,
                $self = $(_self),
                $parent = $self.closest(".tab"),
                ind = $parent.find("li").index($self),
                $tabContentCon;

            $self.siblings("li").removeClass("on");
            $self.addClass("on");

            $tabContentCon = $(".tab-content").find(".tab-panel").eq(ind);
            $tabContentCon.siblings(".tab-panel").removeClass("on");
            $tabContentCon.addClass("on");

            if ($.isFunction(callBack)) {
                callBack.apply(null, [ind, _self, $tabContentCon[0]])
            }
        });
    }
};