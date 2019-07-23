var pageObj = pageObj || {};

pageObj = $.extend(pageObj, {
    noEnoughWidth: "Description column has no enough width to share with added column. Please allocate more width to Description, or add in less column.",
    numberPrecision : '0',
    unitPricePrecision: '2',
    amountPrecision: '2',

    formatFunc: {
        /**
         * 金额格式
         * @param amt
         * @returns {*}
         */
        amt: function(amt){
            if($.trim(amt) != ""){
                return $.NumberUtils.thousandsFormat(amt, $.trim(pageObj.amountPrecision) != ""? Number(pageObj.amountPrecision) : 0);
            }
            return "";
        },
        /**
         * 数量格式化
         * @param amt
         * @returns {*}
         */
        num: function(amt){
            if($.trim(amt) != ""){
                return $.NumberUtils.thousandsFormat(amt, $.trim(pageObj.numberPrecision) != ""? Number(pageObj.numberPrecision) : 0);
            }
            return "";
        },
        /**
         * 单价格式化
         * @param amt
         * @returns {*}
         */
        unitPrice: function(amt){
            if($.trim(amt) != ""){
                return $.NumberUtils.thousandsFormat(amt, $.trim(pageObj.unitPricePrecision) != ""? Number(pageObj.unitPricePrecision) : 0);
            }
            return "";
        }
    },

    paperSize: {
        view: {
            colModels: [
                {name: "paper", label: "Paper"}
            ],
            singleColumnNotHead: true,
            positionRefer: function () {
                return $(this).parent("label");
            },
            widthRefer: function () {
                return $(this).parent("label").outerWidth(true) - 2;
            },
            localData: [
                {paper: 'A4'},
                {paper: 'A5'}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    }

    ,fontFamily: {
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
            widthRefer: 270,
            localData: [
                {"PF001index": "Arial", "PF001": "0","fontFamily":"Arial Unicode MS"},
                {"PF001index": "Times New Roman(Not support Chinese)", "PF001": "1","fontFamily":"Times New Roman"},
                {"PF001index": "Calibri (Not support Chinese)", "PF001": "2","fontFamily":"Calibri"},
                {"PF001index": "Century (Not support Chinese)", "PF001": "3","fontFamily":"Century"}
            ]
        },
        async: {
            dataSourceType: "local"
        }
    }

    ,afterSetValue: function(){
        pageObj.applyColumnWidthSetting();
        pageObj.triggerIframeFunc();
    }

    /**
     * 触发 iframe 中的函数
     */
    ,triggerIframeFunc: function() {
        console.log("triggerIframeFunc");
        var iframeWindow = window.frames['customPrintModel'];
        if (iframeWindow.pageObj && iframeWindow.pageObj.triggerAfterParentSetValue) {
            var formData = pageObj.getPrintConfigForm().jqForm("getValue");
            iframeWindow.pageObj.triggerAfterParentSetValue(formData);
        }
    }

    ,getColumnWidthMap: function(){
        // no, description, amount, 这三个 key 没复选框勾选
        return {
            "no": "noWidth",
            "productName": "productNameWidth",
            "sellerSKU": "sellerSKUWidth",
            "shopSKU": "shopSKUWidth",
            "price": "priceWidth",
            "paidPrice": "paidPriceWidth"
        };
    }

    /**
     * 取得 form
     * @returns {jQuery}
     */
    ,getPrintConfigForm: function () {
        return $("[name='printCustomForm']").jqForm({
            formatter: [
                {fieldName: 'headerName', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'headerPhone', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'headerAddress', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'taxInvoice', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'invoiceNumber', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'orderNumber', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'orderDate', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'invoiceTo', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'invoiceDate', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'itemInfoChecked', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'no', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'productName', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'sellerSKU', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'shopSKU', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'price', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'paidPrice', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'columnWidthSetting', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'subtotalChecked', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'voucherAppliedChecked', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'totalChecked', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'shippingChecked', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'netPaidChecked', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}},
                {fieldName: 'remarkChecked', format: 'singleCheckbox', dataMap: {'checked': '1', 'unchecked': '0'}}
            ],
            callback: {
                afterGetValue: function (formData) {
                    pageObj.printConfigObjs = [];
                    // 业务模块 1：总账票据 2：极简票据

                    for(var printName in formData){
                        var printConfig = {
                            configItem: printName,
                            configValue: formData[printName]
                        };
                        pageObj.printConfigObjs.push(printConfig);
                        // console.log("name：：："+ printName +"===" + formData[printName]);
                    }

                    //已选中的模板名称
                    var printFileNameConfig = {
                        configItem: "fileName",
                        configValue: "standard"
                    } ;
                    $("input[name='fileName']").val("standard");

                    pageObj.printConfigObjs.push(printFileNameConfig);
                },
                afterSetValue: function (formData) {
                    var li = [];
                    li.push('headerName');
                    li.push('headerPhone');
                    li.push('headerAddress');
                    li.push('taxInvoice');
                    li.push('invoiceNumber');
                    li.push('orderNumber');
                    li.push('orderDate');
                    li.push('invoiceTo');
                    li.push('invoiceDate');
                    li.push('itemInfoChecked');
                    li.push('no');
                    li.push('productName');
                    li.push('sellerSKU');
                    li.push('shopSKU');
                    li.push('price');
                    li.push('paidPrice');
                    li.push('columnWidthSetting');
                    li.push('subtotalChecked');
                    li.push('voucherAppliedChecked');
                    li.push('totalChecked');
                    li.push('shippingChecked');
                    li.push('netPaidChecked');
                    li.push('remarkChecked');
                    for (var i = 0; i < li.length; i++) {
                        var key = li[i];
                        if($.trim(formData[key]) == "1"){
                            checkboxUtil.setChecked(key,["1"]);
                        }else{
                            checkboxUtil.unChecked(key);
                        }
                    }

                    // columnWidthSetting 的显示隐藏,
                    pageObj.applyColumnWidthSetting(formData);
                }
            }
        });
    }

    /**
     * 勾选列名,对应列宽显示隐藏的设置,
     * @param formData
     */
    ,applyColumnWidthSetting: function(formDataParam) {
        var formData = formDataParam;
        if (!formData) {
            formData = pageObj.getPrintConfigForm().jqForm("getValue");
        }

        if (formData.columnWidthSetting == "0") {
            $("#columnWidthSettingArea").hide();
        } else {
            $("#columnWidthSettingArea").show();
        }
        var columnWidthMap = pageObj.getColumnWidthMap();
        for (var key in columnWidthMap) {
            var widthName = columnWidthMap[key];
            var selector = "input[name='{name}']";
            selector = selector.replace(/{name}/g, widthName);
            if (formData[key] == "0") {
                $(selector).parents("div." + widthName + "Row").hide();
            } else {
                $(selector).parents("div." + widthName + "Row").show();
            }
        }
    }

    /**
     * 初始化赋值
     */
    ,initSetData: function(){
        //新增，编辑，跳转过来传ID，赋值到页面上
        $("input[name='templateId']").val(pageObj.templateId);
        if($.trim(pageObj.templateId) != ""){

            var formValue = {},
                configs = pageObj.configs;

            for(var i = 0 ; i < configs.length ; i ++){
                var config = configs[i],
                    formName =config["configItem"],
                    configValue =config["configValue"];

                if("templateId" != formName){
                    formValue[formName] = configValue;
                }
            }

            //页面初始化后的值，用来判断页面是否被修改编辑过
            pageObj.afterSaveConfig = formValue;

            // $("#customPrintModel").attr("src",  App["contextPath"] + "/acct/system/simpleInvoice/simpleInvoicePresetTemplate.htm?templateId="+pageObj.templateId+"&token="+pageObj.token);
            $("#customPrintModel").attr("src", contextPath + "/printConfig/gotoConfigResultPage.htm?templateId="+pageObj.templateId);

            pageObj.getPrintConfigForm().jqForm("setValue",formValue);
        }
    }

    /**
     * 点击 itemNo 等列, 底部显示 itemNoWidth 等列宽设置字段,
     * 列宽从 descriptionWidth 中扣减出来,
     */
    ,triggerColumnWidth: function(name) {
        var isChecked = $("input[name='{name}']".replace(/{name}/g, name)).prop("checked");
        var columnWidthMap = pageObj.getColumnWidthMap();
        var productNameWidthElem = $("input[name='productNameWidth']");
        var widthElem = $("input[name='{widthName}']".replace(/{widthName}/g, columnWidthMap[name]));
        var defaultWidth = 15;
        if (isChecked) {// 勾选
            var productNameWidthValue = parseInt(productNameWidthElem.val() || "0");
            if (productNameWidthValue >= (defaultWidth + 1)) {// 可以从 productName 中扣除,
                productNameWidthElem.val(productNameWidthValue - defaultWidth);
                widthElem.val(defaultWidth);
                return true;
            } else {// 无法从 productName 中扣除
                TipsUtil.warn(pageObj.noEnoughWidth);
                // checkboxUtil.unChecked(name);// 这一行是在 change 里面触发,没法去除 checkbox 的勾选,因此,用 setTimeout 来模拟实现
                setTimeout(function() {
                    checkboxUtil.unChecked(name);
                }, 50);

                return false;
            }
        } else {// 不勾
            var productNameWidthValue = parseInt(productNameWidthElem.val() || "0");
            var widthValue = parseInt(widthElem.val() || "0");
            productNameWidthElem.val(productNameWidthValue + widthValue);
            widthElem.val(1);
            return true;
        }
    }

    ,bindEvent: function(){
        $(".print-left input").on("blur",function(){
            pageObj.triggerIframeFunc();
        });
        $(".print-left textarea").on("blur",function(){
            pageObj.triggerIframeFunc();
        });
        //页面上所有复选框的勾选，联动去设置右边的内容
        $(".print-left .check-box").on("change", function(){
            var self = $(this),
                name = self && self.length > 0 ? self.find("input").attr("name") : "",
                isActive = self.hasClass("active") ;

            if(!self.hasClass("disabled") && !self.hasClass("dis")) {
                var columnWidthMap = pageObj.getColumnWidthMap();
                if (columnWidthMap[name]) {// 带宽度的列,勾选后从 descriptionWidth 中扣减宽度,需要进行判断能不能扣减之类的,
                    var canContinue = pageObj.triggerColumnWidth(name);
                    if (canContinue) {
                        pageObj.afterSetValue();
                    }
                } else {
                    pageObj.afterSetValue();
                }
            }
        });
        $("#savePrintConfig").click(function(){
            var templateNameValue = $("input[name='templateName']").val();
            if (!templateNameValue) {
                TipsUtil.warn("Template name cann't be null");
                return;
            } else if (templateNameValue.length > 1000) {
                TipsUtil.warn("Length of Template name must less than 1000");
                return;
            }

            var remarkCheckedHtmlValue = $("textarea[name='remarkCheckedHtml']").val();
            if (remarkCheckedHtmlValue.length > 1000) {
                TipsUtil.warn("Length of remark must less than 1000");
                return;
            }
            var printTemplateVo = {
                id: $("input[name='templateId']").val()
                ,templateName: $("input[name='templateName']").val()
            };
            pageObj.getPrintConfigForm().jqForm("getValue");
            $.ajax({
                async: true,
                url: contextPath + "/printConfig/save.json",
                type: "POST",
                data: {
                    printTemplateVo: JSON.stringify(printTemplateVo)
                    ,printConfigLi: JSON.stringify(pageObj.printConfigObjs)
                },
                success: function (result) {
                    if (result && result.success) {
                        pageObj.setTemplateId(result.templateId);
                        TipsUtil.info("Save Successfuly!");
                    } else {
                        TipsUtil.warn("Save Fail!");
                    }
                },
                error: function (e) {
                    TipsUtil.warn("Save Fail!" + e);
                }
            });
        });
        $("#cancelPrintConfig").click(function(){
            location.href = contextPath + "/setting/setting.htm";
        });
    }

    ,setTemplateId: function(templateId) {
        pageObj.templateId = templateId;
        $("input[name='templateId']").val(templateId);
    }
});

$(document).ready(function () {
    $('[name="paper"]').AutoCombobox($.extend(true, {}, pageObj.paperSize, {
        callback: {
            afterSelectRow: function (rowData) {
                $(this).val(rowData.paper);
            }
        }
    }));

    $("[name='fontFamilyName']").AutoCombobox($.extend(pageObj.fontFamily,{
        callback: {
            afterSelectRow: function (rowData) {
                $(this).val(rowData['PF001index']);
                $("input[name='fontFamily']").val(rowData['fontFamily']);
                pageObj.triggerIframeFunc();
            }
        }
    }));

    // 数字加减控件,
    var columnWidthMap = pageObj.getColumnWidthMap();
    for (var key in columnWidthMap) {
        var selector = "input[name='{name}']";
        selector = selector.replace(/{name}/g, columnWidthMap[key]);
        $(selector).spinner({
            max:100,
            min:1,
            step:1,
            incremental: function(num) {// 长按时,数值会一直猛加,但是 start 却只会触发一次,因此,把 incremental 设0,手动在 start 函数中,给元素 + 1,
                // console.log("num is:" + num);
                return 0;
            },
            stop: function(event, ui) {
                var self = this;
                // console.log("stop value is:" + self.value);
                pageObj.triggerIframeFunc();
            },
            spin: function(event, ui) {
                var self = this;
                // console.log("spin value is:" + self.value);
            },
            start: function(event, ui) {
                // console.log("start");
                // event.preventDefault();
                var self = this;
                // console.log("start value is:" + self.value);
                // var columnWidthMap = pageObj.getColumnWidthMap();
                var productNameWidthElem = $("input[name='productNameWidth']");
                var widthElem = $("input[name='{widthName}']".replace(/{widthName}/g, self.name));
                var classList = event.currentTarget.classList;
                var isUp = false;
                for (var i = 0; i < classList.length; i++) {
                    if (classList[i] == "ui-spinner-up") {
                        isUp = true;
                        break;
                    }
                }
                var productNameWidthValue = parseInt(productNameWidthElem.val() || "0");
                var widthValue = parseInt(widthElem.val() || "0");
                if (isUp) {
                    if (productNameWidthValue >= 2) {// 从 description 中 - 1
                        productNameWidthElem.val(productNameWidthValue - 1);
                        widthElem.val(widthValue + 1);// incremental 中返回0,自己+1,
                    } else {// 不让加
                        TipsUtil.warn(pageObj.noEnoughWidth);
                        event.preventDefault();
                    }
                } else {
                    if (widthValue > 1) {// 可以减
                        productNameWidthElem.val(productNameWidthValue + 1);
                        widthElem.val(widthValue - 1);// incremental 中返回0,自己-1,
                    } else {
                        // 最小为1,控件自己控制了,do nothing,
                    }
                }
            }
        });
    }

    checkboxUtil.render();

    pageObj.initSetData();

    pageObj.bindEvent();
});
