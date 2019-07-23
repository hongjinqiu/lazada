var pageObj = pageObj || {};

pageObj = $.extend(pageObj, {
    amountPrecision: 2,
    numberPrecision: 2,
    unitPricePrecision: 2,

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

    /**
     * body 旋转宽高赋值
     */
    applyBodyAttribute: function() {
        // body,宽,高,rotate 赋值
        var bodyMetaObj = printmetaEval_metaObj[printmetaEval_body_id];
        var widthString = printmetaEval_getCssAttribute(bodyMetaObj, "ifAndForEachAndSet", "width");
        if (widthString) {
            widthString = widthString.replace(/^\s+|[\s;]+$/g, "");// 清除表头,表尾空格分号
        }
        var heightString = printmetaEval_getCssAttribute(bodyMetaObj, "ifAndForEachAndSet", "height");
        if (heightString) {
            heightString = heightString.replace(/^\s+|[\s;]+$/g, "");// 清除表头,表尾空格分号
        }
        var rotate = (bodyMetaObj.rotate && bodyMetaObj.rotate == "true") ? true : false;
        if (rotate) {
            if (!widthString || !heightString) {
                throw new Error("body 配置了 rotate='true', width 和 height 必须同时有值!");
            }
            $(document.body).css("width", heightString);
            $(document.body).css("height", widthString);
        } else {
            if (widthString) {
                $(document.body).css("width", widthString);
            }
            if (heightString) {
                $(document.body).css("height", heightString);
            }
        }
    }

    ,triggerAfterParentSetValue: function(formData) {
        pageObj.allInOne(formData);
    }

    ,allInOne: function(printConfigTemplate) {
        var begin = new Date();
        if (printConfigTemplate) {
            pageObj.printConfigTemplate = printConfigTemplate;
        } else {
            pageObj.printConfigTemplate = parent.pageObj.getPrintConfigForm().jqForm("getValue") ;
        }
        $(document.body).css("font-family", pageObj.printConfigTemplate.fontFamily);

        var printmetaInterpreter = new PrintmetaInterpreter();
        printmetaInterpreter.interpreterString(pageObj.xmlText, pageObj);
        // console.log(pageObj.printmeta_result);

        pageObj.applyBodyAttribute();

        var step2Html = pageObj.printmeta_result.step2Html;
        // var regExp = new RegExp("<body [^>]*?>(.*?)<\\/body>", "msi");
        var regExp = new RegExp("<body [^>]*?>(.*?)<\\/body>", "mi");
        if (regExp.test(step2Html)) {
            var bodyContent = RegExp.$1;
            $(document.body).html(bodyContent);
        }

        // 表身的空白行填充
        // pageObj.printmeta_result.params:[{"tagId":"printmeta_id_1","params":[{"name":"extendToFillBody","value":"default"}]}]
        if (pageObj.printmeta_result && pageObj.printmeta_result.params) {
            for (var i = 0; i < pageObj.printmeta_result.params.length; i++) {
                var item = pageObj.printmeta_result.params[i];
                var subParams = item.params;
                for (var j = 0; j < subParams.length; j++) {
                    if (subParams[j].name == "extendToFillBody") {
                        if (subParams[j].value == "default") {
                            var firstTableId = $("body table").get(0).id;
                            var tableHeight = $("#" + firstTableId).height();
                            var bodyHeight = $(document.body).height();
                            while (tableHeight > bodyHeight) {
                                // $("#" + firstTableId +" .tbodyGenByTloop")[0].remove();
                                $("#" + firstTableId +" .tbodyGenByTloop:last").remove();
                                tableHeight = $("#" + firstTableId).height();
                                if ($("#" + firstTableId +" .tbodyGenByTloop").length == 0) {
                                    break;
                                }
                            }
                            // var firstHeight = $($("#" + firstTableId +" .tbodyGenByTloop")[0]).height();
                            // firstHeight += (bodyHeight - tableHeight);
                            // $($("#" + firstTableId +" .tbodyGenByTloop")[0]).find("tr").height(firstHeight);

                            // console.log("firstHeight is:" + firstHeight);
                            // console.log("pos2 firstHeight is:" + firstHeight + ", bodyHeight is:" + bodyHeight + ", tableHeight is:" + tableHeight);
                            // console.log("#" + firstTableId +" .tbodyGenByTloop");
                        }
                    }
                }
            }
        }
        pageObj.printmeta_result = {};
        printmetaEval_clearAll();
        var end = new Date();
        console.log(end.getTime() - begin.getTime());
    }
});

$(document).ready(function () {
    pageObj.allInOne();
});
