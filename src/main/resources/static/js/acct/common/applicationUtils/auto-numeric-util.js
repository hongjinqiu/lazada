// var App = App || {}, AutoNumericUtil = {
//     _repeat: function (str, n) {
//         return new Array(n + 1).join(String(str));
//     },
//
//     repeatZero: function (count) {
//         return AutoNumericUtil._repeat(0, count);
//     },
//
//     repeatNine: function (count) {
//         return AutoNumericUtil._repeat(9, count);
//     },
//
//
//     /** 默认配置 */
//     defaultConfig: {
//         aSep: '', aDec: '.', vMin: '0.00000000', vMax: '999999999.99999999'
//     },
//
//     /** 只能输入整型数字，不能输入小数 */
//     getIntConfig: function () {
//         return {
//             aSep: '', aDec: '.', vMin: '0', vMax: '999999999'
//         }
//     },
//
//     /** 数据库smallInt 类型的统一控制 */
//     getSamllIntConfig: function () {
//         return {
//             aSep: '', aDec: '.', vMin: '0', vMax: '9999'
//         }
//     },
//
//     /**
//      * 正整数最大100 配置
//      * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
//      */
//     getIntHundredConfig: function () {
//         return {
//             aSep: '', aDec: '.', vMin: '0', vMax: '100'
//         }
//     },
//
//     /**
//      * 正数单价 配置
//      * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
//      */
//     getPriceConfig: function () {
//         return {
//             aSep: '', aDec: '.', vMin: '0.00', vMax: '100000.00'
//         }
//     },
//
//     /**
//      * 正数总额 配置
//      * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
//      */
//     getAmtConfig: function () {
//         return {
//             aSep: '', aDec: '.', vMin: '0.00', vMax: '999999999.99'
//         }
//     },
//     /**
//      * 金额配置，包含负数
//      * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
//      */
//     getMoneyConfig: function () {
//         return {
//             aSep: '', aDec: '.', vMin: '-999999999.99', vMax: '999999999.99'
//         }
//     },
//
//     /**
//      * 折扣 配置
//      * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
//      */
//     getDiscountConfig: function () {
//         return {
//             aSep: '', aDec: '.', vMin: '0.00', vMax: '10.00'
//         }
//     },
//
//     /**
//      * 获得汇率小数位数
//      * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
//      */
//     getExRateConfig: function () {
//         var count = parameterUtil.getExRateCount(),
//             vMin = "0." + AutoNumericUtil.repeatZero(count),
//             vMax = "999." + AutoNumericUtil.repeatZero(count);
//
//         return {
//             aSep: ',', aDec: ".", vMin: vMin, vMax: vMax
//         };
//     },
//
//     /** 获得数量小数位数(三位一分割) */
//     getNumberPrecisionConfig: function () {
//         var count = parameterUtil.getNumberDecimalCount(),
//             vMin = "0." + AutoNumericUtil.repeatZero(count),
//             vMax = "9999999999." + AutoNumericUtil.repeatZero(count);
//
//         return {
//             aSep: '', aDec: ".", vMin: vMin, vMax: vMax
//         };
//     },
//
//     /** 单价小数位数(三位一分割) */
//     getUnitPriceConfig: function () {
//         var count = parameterUtil.getUnitPriceDecimalCount(),
//             vMin = "0." + AutoNumericUtil.repeatZero(count),
//             vMax = "9999999999." + AutoNumericUtil.repeatZero(count);
//
//         return {
//             aSep: ',', aDec: ".", vMin: vMin, vMax: vMax
//         };
//     },
//
//     /** 金额(三位一分割)*/
//     getCurrencyConfig: function (numberType,posMax) {
//         var count = parameterUtil.getAmountDecimalCount(),
//             integerRepeat = AutoNumericUtil.repeatNine(12);
//         if (posMax == null) {
//             posMax = integerRepeat;
//         }
//         var negMin = "-" + integerRepeat, zero = "0",
//             vMin, vMax;
//
//         if (numberType == null) {
//             numberType = 0;
//         }
//
//         // 允许输入正负数
//         if (numberType === 0) {
//             vMin = negMin + "." + AutoNumericUtil.repeatNine(count);
//             vMax = posMax + "." + AutoNumericUtil.repeatNine(count);
//         }
//         // 只能输入正数
//         else if (numberType === 1) {
//             vMin = zero + "." + AutoNumericUtil.repeatZero(count);
//             vMax = posMax + "." + AutoNumericUtil.repeatNine(count);
//         }
//         // 只能输入负数
//         else {
//             vMin = negMin + "." + AutoNumericUtil.repeatNine(count);
//             vMax = zero + "." + AutoNumericUtil.repeatZero(count);
//         }
//
//         return {
//             aSep: ',', aDec: ".", vMin: vMin, vMax: vMax
//         };
//     },
//
//     /**
//      * 渲染所有数字控件
//      */
//     render: function () {
//         //
//         $("input[componentType='auto-numeric']").each(function (index, inputEl) {
//             var $inputEl = $(inputEl),
//                 configName = $inputEl.attr("componentConfig"),
//                 configArg = $inputEl.attr("componentConfigArg"),
//                 config,
//                 _config;
//             //如果是取 AutoNumericUtil 已有配置
//             if (AutoNumericUtil.hasOwnProperty(configName)) {
//                 config = AutoNumericUtil[configName];
//             } else {
//                 config = eval(configName);
//             }
//             //如果是 function
//             if ($.isFunction(config)) {
//                 //如果有配参数
//                 if (configArg) {
//                     _config = config(configArg);
//                 } else {
//                     _config = config();
//                 }
//             }
//             //如果是 {} JSON对象
//             else if ($.isPlainObject(config)) {
//                 _config = config;
//             }
//             //至少有默认的
//             if (_config) {
//             } else {
//                 _config = AutoNumericUtil.defaultConfig;
//             }
//             //渲染控件
//             $inputEl.autoNumeric(_config);
//         });
//     }
//
// };