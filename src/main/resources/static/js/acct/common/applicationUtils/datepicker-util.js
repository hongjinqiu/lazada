// /**
//  * 依赖 jQueryUI
//  */
// var DatePickerUtil = {
//
//     /**
//      * 在表单上使用
//      */
//     datePickerConfig: {
//         showOn: "both",//focus,button,both
//         buttonImage: App["staticContextPath"] + "/assets/images/acct/sprite/date-icon.png",
//         buttonImageOnly: true,
//         showButtonPanel: true,
//         changeMonth: true,
//         changeYear: true,
//         dateFormat: App.language === "zh_CN" ? "yy-mm-dd" : "dd/mm/yy",
//         beforeShow: function (input, inst) {
//             //焦点事件分为：人为聚焦 和 js脚本聚焦
//             if (window.event && window.event.type == "focus") {
//                 if (event.relatedTarget) {
//                     return true;
//                 } else {
//                     //js脚本聚焦，只聚焦
//                     return false;
//                 }
//             }
//             return true;
//         },
//         positionRefer: function () {
//             //控件输入框 被父<label>包着。
//             //下拉层的定位参照 是父<label>
//             return $(this).parent("div");
//         }
//     },
//
//     /**
//      * 在表单上使用
//      */
//     datePickerConfig2: {
//         showOn: "both",//focus,button,both
//         buttonImage: App["staticContextPath"] + "/assets/images/acct/sprite/date-icon.png",
//         buttonImageOnly: true,
//         showButtonPanel: true,
//         changeMonth: true,
//         selMonth:true,
//         changeYear: true,
//         dateFormat: App.language === "zh_CN" ? "yy-mm" : "mm/yy",
//         beforeShow: function (input, inst) {
//             //焦点事件分为：人为聚焦 和 js脚本聚焦
//             if (window.event && window.event.type == "focus") {
//                 if (event.relatedTarget) {
//                     return true;
//                 } else {
//                     //js脚本聚焦，只聚焦
//                     return false;
//                 }
//             }
//             return true;
//         },
//         positionRefer: function () {
//             //控件输入框 被父<label>包着。
//             //下拉层的定位参照 是父<label>
//             return $(this).parent("div");
//         }
//     },
//
//     /**
//      * 在表格内使用
//      */
//     datePickerConfigForJqGrid: {
//         showOn: "focus",//focus,button,both
//         buttonImageOnly: false,
//         showButtonPanel: true,
//         changeMonth: true,
//         changeYear: true
//     },
//
//     /**
//      * 渲染所有日期控件
//      */
//     render: function (props, selector, context) {
//         var $context = context && $(context) || document,
//             $selector = selector && $(selector, $context) || $("input[componentType = 'datepicker']", $context);
//
//         props = props || {};
//         $selector.datepicker($.extend({}, DatePickerUtil.datePickerConfig, props));
//     },
//     /**
//      * 渲染所有日期控件
//      */
//     render2: function (props, selector, context) {
//         var $context = context && $(context) || document,
//             $selector = selector && $(selector, $context) || $("input[componentType = 'datepicker']", $context);
//
//         props = props || {};
//         $selector.datepicker($.extend({}, DatePickerUtil.datePickerConfig2, props));
//     }
//
// };