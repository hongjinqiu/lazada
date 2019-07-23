// /**
//  * 依赖 autoNumeric
//  */
// var jqGridUtil = {
//
//     _repeat: function (str, n) {
//         return new Array(n + 1).join(String(str));
//     },
//
//     _repeatZero: function (count) {
//         return jqGridUtil._repeat(0, count);
//     },
//
//     _repeatNine: function (count) {
//         return jqGridUtil._repeat(9, count);
//     },
//
//
//     /**
//      * 可编辑单元格样式
//      */
//     getEnabledEditCellStyle: function () {
//         var style = {};
//         style["background-color"] = "";
//         style["background-image"] = "none";
//         return style;
//     },
//
//     /**
//      * 不可编辑单元格样式
//      */
//     getDisabledEditCellStyle: function () {
//         var style = {};
//         style["background-color"] = "#f2f2f2"; //#fcefa1米黄
//         style["background-image"] = "none";
//         return style;
//     },
//
//     /** 不可编辑单元格样式 */
//     /**
//      *
//      * @param appendStyle 可空(格式:(padding-left: 20px;)或(background-image: none;) )
//      * @returns {string}
//      */
//     getDisabledEditCellStyleString: function (appendStyle) {
//         var styleObj = jqGridUtil.getDisabledEditCellStyle(),
//             styleStr = 'style="', styleName;
//         for (styleName in styleObj) {
//             if (styleObj.hasOwnProperty(styleName) && styleObj[styleName]) {
//                 styleStr += styleName;
//                 styleStr += ":";
//                 styleStr += styleObj[styleName];
//                 styleStr += ";";
//             }
//         }
//         if ($.trim(appendStyle).length > 0) {
//             styleStr += appendStyle + "'";
//         } else {
//             styleStr += '"';
//         }
//         return styleStr;
//     },
//
//     // add by huangs start
//     /**
//      * autoNumericConfig 配置
//      * @parameter decimal 精度，小数点长度
//      * @parameter numberType 0或null:允许输入正负数,1:只能输入正数,2:只能输入负数
//      */
//     getAutoNumericConfig: function (negMin,posMax,decimal, numberType) {
//         var  zero = "0",
//             vMin, vMax;
//
//         if (numberType == null) {
//             numberType = 0;
//         }
//
//         // 允许输入正负数
//         if (numberType === 0) {
//             vMin = negMin + "." + jqGridUtil._repeatNine(decimal);
//             vMax = posMax + "." + jqGridUtil._repeatNine(decimal);
//         }
//         // 只能输入正数
//         else if (numberType === 1) {
//             vMin = zero + "." + jqGridUtil._repeatZero(decimal);
//             vMax = posMax + "." + jqGridUtil._repeatNine(decimal);
//         }
//         // 只能输入负数
//         else {
//             vMin = negMin + "." + jqGridUtil._repeatNine(decimal);
//             vMax = zero + "." + jqGridUtil._repeatZero(decimal);
//         }
//
//         //
//         return {
//             aSep: '', aDec: '.', vMin: vMin, vMax: vMax
//         }
//     },
//
//     /**
//      * 提供给jqGrid自定义单元格时 数量输入框
//      * 配合 getNumericCustomValue 使用
//      * @param value
//      * @decimal 精度，小数点长度(可空，默认为2)
//      * @returns {*|jQuery|HTMLElement}
//      */
//     getNumericCustomElement: function (value, decimal) {
//         var decimal = decimal >= 0 ? decimal : 2,//小数位数
//             $input = $('<input type="text" role="textbox">'),
//             timeObj = window.setTimeout(function () {
//                 $input.addClass("custom-input").css({"text-align": "right", width: "100%"})
//                     .autoNumeric(jqGridUtil.getAutoNumericConfig('-999999999999','999999999999',decimal))
//                     .autoNumeric('set', value);
//                 window.clearTimeout(timeObj);
//             }, 10);
//         return $input;
//     },
//
//     /**
//      * 获得行id
//      * @param table 选择器
//      * @param iRow 行序号
//      * @returns {*}
//      */
//     getRowId: function (table, iRow) {
//         var grid = $(table)[0];
//
//         return grid.rows[iRow].id;
//     },
//
//     /**
//      * 提供给jqGrid自定义单元格时
//      * 配合 getNumericCustomElement 使用
//      * @param $elm
//      * @returns {*}
//      */
//     getNumericCustomValue: function ($elm) {
//         if ($elm.is('input')) {
//             return $elm.autoNumeric('get');
//         } else {
//             return "";
//         }
//     },
//
//     /**
//      * 获得数字的ColModel
//      * @param decimalCount 小数位数
//      * @param numberType 0或null:允许输入正负数,1:只能输入正数,2:只能输入负数
//      * @returns {{align: string, formatter: string, formatoptions: {decimalPlaces: *}, editoptions: {maxlength: number, style: string, dataInit: editoptions.dataInit}}}
//      */
//     getNumericColModel: function (decimalCount, numberType) {
//         return {
//             align: "right",
//             formatter: "currencyExt",
//             formatoptions: {decimalPlaces: decimalCount},
//             editoptions: {
//                 maxlength: 10,
//                 style: "text-align:right",
//                 dataInit: function (element) {
//                     $(element).autoNumeric(jqGridUtil.getAutoNumericConfig('-9999999999','9999999999',decimalCount, numberType));
//                 }
//             }
//         }
//     },
//     getInventoryNumericColModel: function (decimalCount, numberType,minNum,maxNum) {
//         return {
//             align: "right",
//             formatter: "currencyExt",
//             formatoptions: {decimalPlaces: decimalCount},
//             editoptions: {
//                 maxlength: 10,
//                 style: "text-align:right",
//                 dataInit: function (element) {
//                     $(element).autoNumeric(jqGridUtil.getAutoNumericConfig(minNum,maxNum,decimalCount, numberType));
//                 }
//             }
//         }
//     },
//
//     getExchangeRateNumericColModel: function (decimalCount, numberType) {
//         return {
//             align: "right",
//             formatter: "currencyExt",
//             formatoptions: {decimalPlaces: decimalCount},
//             editoptions: {
//                 maxlength: 12,
//                 style: "text-align:right",
//                 dataInit: function (element) {
//                     $(element).autoNumeric(jqGridUtil.getAutoNumericConfig('-999','999',decimalCount, numberType));
//                 }
//             }
//         }
//     },
//
//     /**
//      * 获得数量小数位数colModel
//      * @returns {{}}
//      */
//     getNumberPrecisionColModel: function (numberType) {
//         return jqGridUtil.getNumericColModel(parameterUtil.getNumberDecimalCount(), numberType);
//     },
//
//     /**
//      * 给库存中数量使用【数量* 单价，位数可能会超过数据[20,8]的控制，所以这边数量控制整数位6位，单价整数位7位】
//      * 获得数量小数位数colModel
//      * @returns {{}}
//      */
//     getInventoryNumberPrecisionColModel: function (numberType) {
//         return jqGridUtil.getInventoryNumericColModel(parameterUtil.getNumberDecimalCount(), numberType, '-999999','999999');
//     },
//
//     /**
//      * 给库存中数量使用【数量* 单价，位数可能会超过数据[20,8]的控制，所以这边数量控制整数位6位，单价整数位7位】
//      * 获得数量小数位数colModel
//      * @returns {{}}
//      */
//     getInventoryUnitPriceColModel: function (numberType) {
//         return jqGridUtil.getInventoryNumericColModel(parameterUtil.getUnitPriceDecimalCount(), numberType, '-9999999','9999999');
//     },
//
//     /**
//      * 输入数值区间控制
//      * minNum 最小值
//      * maxNum 最大值
//      * numberType 1为只能正数，2为只能负数
//      * @returns {{}}
//      */
//     getNumIntervalColModel: function (minNum, maxNum, numberType) {
//         var minNum = minNum || 0, maxNum = maxNum || 100, numberType = numberType || 1;
//
//         return jqGridUtil.getInventoryNumericColModel(parameterUtil.getAmountDecimalCount(), numberType, minNum, maxNum);
//     },
//
//     /**
//      * 单价小数位数colModel
//      */
//     getUnitPriceColModel: function (numberType) {
//         return jqGridUtil.getNumericColModel(parameterUtil.getUnitPriceDecimalCount(), numberType);
//     },
//
//     /**
//      * 单位成本小数位数colModel
//      */
//     getUnitCostColModel: function (numberType) {
//         return jqGridUtil.getNumericColModel(parameterUtil.getUnitCostDecimalCount(), numberType);
//     },
//
//     /**
//      * 获得金额colModel
//      * @returns {{}}
//      */
//     getCurrencyColModel: function (numberType) {
//         return jqGridUtil.getNumericColModel(parameterUtil.getAmountDecimalCount(), numberType);
//     },
//
//     /**
//      * 获得汇率colModel
//      * @returns {{}}
//      */
//     getExchangeRateColModel: function (numberType) {
//         return jqGridUtil.getExchangeRateNumericColModel(parameterUtil.getExRateCount(), numberType);
//     }
// };