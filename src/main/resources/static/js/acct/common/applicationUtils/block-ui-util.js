// /**
//  * denpendence: [jQueryBlockUI]
//  */
//
// var blockUIUtil = blockUIUtil || {};
//
// /**
//  * 显示遮罩层
//  */
// blockUIUtil.show = function () {
//     $.blockUI({});
// };
//
// /**
//  * 隐藏遮罩层
//  */
// blockUIUtil.hide = function () {
//     $.unblockUI({});
// };
//
// /**
//  * 在指定Id区域显示遮罩层
//  * @param targetId （可空）指定元素Id，局部遮罩
//  * @param config （可空）例如：{message:'Loading...',css:{border:'5px solid red'}}
//  *
//  */
// blockUIUtil.showById = function (targetId, config) {
//     blockUIUtil.showBySelector('#' + targetId, config);
// };
//
// /**
//  * 在指定Id区域隐藏遮罩层
//  * @param targetId （可空）指定元素Id，局部遮罩
//  * @param config （可空）例如：{message:'Loading...',css:{border:'5px solid red'}}
//  */
// blockUIUtil.hideById = function (targetId, config) {
//     blockUIUtil.hideBySelector('#' + targetId, config);
// };
//
//
// /**
//  * 在指定区域显示遮罩层
//  * @param selector （可空）指定元素selector
//  * @param config （可空）例如：{message:'Loading...',css:{border:'5px solid red'}}
//  *
//  */
// blockUIUtil.showBySelector = function (selector, config) {
//     var config = config || {};
//     $(selector).block(config);
// };
//
// /**
//  * 在指定区域隐藏遮罩层
//  * @param selector （可空）指定元素selector
//  * @param config （可空）例如：{message:'Loading...',css:{border:'5px solid red'}}
//  */
// blockUIUtil.hideBySelector = function (selector, config) {
//     var config = config || {};
//     $(selector).unblock(config);
// };