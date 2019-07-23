// /**
//  * 依赖于 artDialog,ApplicationUtils
//  * @type {App|*|{}}
//  */
//
// var App = App || {}, artDialogUtil = {
//
//     /**
//      * （模式）是否确认 对话框（确定与取消按钮）
//      */
//     confirm: function (message, okCallback, config) {
//         var config = config || {},
//             dialogObj = dialog(
//                 $.extend({}, {
//                     title: i18n["acct.common.dialog.btn.confirm"],
//                     content: message,
//                     okValue: i18n["acct.common.dialog.btn.ok"],
//                     ok: function () {
//                         return okCallback.call(this) !== false;//没有返回,就默认为true;
//                     },
//                     cancelValue: i18n["acct.common.dialog.btn.cancel"],
//                     cancel: function () {
//                     }
//                 }, config));
//         dialogObj.showModal();
//     },
//
//     /**
//      * 有确定按钮的提示对话框
//      */
//     showMessage: function (message, config) {
//         var config = config || {},
//             dialogObj = dialog(
//                 $.extend({}, {
//                     title: i18n["acct.common.dialog.btn.confirm"],
//                     content: message,
//                     okValue: i18n["acct.common.dialog.btn.ok"],
//                     ok: function () {
//                         return true;
//                     }
//                 }, config));
//         dialogObj.show();
//     },
//
//     /**
//      * （非模式）是否确认 对话框（确定与取消按钮）
//      */
//     confirmAndShow: function (message, okCallback, config) {
//         var config = config || {},
//             dialogObj = dialog(
//                 $.extend({}, {
//                     title: i18n["acct.common.dialog.btn.confirm"],
//                     content: message,
//                     okValue: i18n["acct.common.dialog.btn.ok"],
//                     ok: function () {
//                         return okCallback.call(this) !== false;//没有返回,就默认为true;
//                     },
//                     cancelValue: i18n["acct.common.dialog.btn.cancel"],
//                     cancel: function () {
//                     }
//                 }, config));
//         dialogObj.show();
//     }
// };