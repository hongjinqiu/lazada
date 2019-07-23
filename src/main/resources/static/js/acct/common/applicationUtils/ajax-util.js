// /**
//  *denpendence: [_tips-util,_block-ui-util]
//  */
//
//
// var ajaxUtil = ajaxUtil || {};
//
// /**
//  *通过给定的参数从后台获得数据
//  * @param props 如果为string型，则默认是url,其余合法的参数则为jquery.ajax参数
//  * @returns {*} 返回数据
//  *
//  * e.g. geetDataByAjax...
//  */
// ajaxUtil.getDataByAjax = function (props) {
//     var ajaxProps, result;
//     ajaxProps = {
//         type: "POST",
//         async: false,
//         dataType: "json"
//     };
//
//     if ($.type(props) === "string") {
//         ajaxProps.url = props;
//     } else {
//         ajaxProps = $.extend(true, props, ajaxProps);
//     }
//     $.ajax(ajaxProps).then(function success(data) {
//         if ($.isPlainObject(data) && data.success != null && !data.success) {
//             TipsUtil.error(data.message);
//             throw new Error(data.message);
//         }
//         result = data;
//     }, function error(jqXHR, errorMsg) {
//         if (jqXHR.status == 200 && errorMsg == "parsererror") {
//             result = null;
//         }
//         else if (jqXHR.status == 505) {
//             //如果是登陆超时，主动调到登陆页
//             TipsUtil.warn("登陆超时，请重新登录，3秒后回到首页！");
//             //
//             var _timeObj = window.setTimeout(function () {
//                 top.location.href = App["contextPath"] + "/";
//                 window.clearTimeout(_timeObj);
//             }, 3000);
//         }
//         else {
//             // TipsUtil.error("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
//             console.log("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
//             result = false;
//             // throw new Error("请求后台出错！url:" + props.url + "data:" + props.data);
//             console.log("请求后台出错！url:" + props.url + "data:" + props.data);
//         }
//     });
//     return result;
// };
//
// /**
//  * 获得普通的Ajax请求的设置
//  */
// ajaxUtil.getAjaxSetting = function () {
//     return {
//         async: true,
//         error: function (jqXHR, textStatus, errorThrow) {
//             // TipsUtil.error("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
//             console.log("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
//         }
//     };
// };
//
// /**
//  * 获得通过进行json请求的设置
//  */
// ajaxUtil.getJsonAjaxSetting = function (url, data) {
//     return {
//         url: url,
//         type: "post",
//         processData: false,
//         async: true,
//         contentType: "application/json",
//         dataType: "json",
//         data: JSON.stringify(data),
//         error: function (jqXHR, textStatus, errorThrow) {
//             // TipsUtil.error("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
//             console.log("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
//         }
//     };
// };
//
// /**
//  * 获得ajax等待动画的设置
//  * @returns {{beforeSend: beforeSend, complete: complete}}
//  */
// ajaxUtil.getBlockSetting = function () {
//     return {
//         beforeSend: function () {
//             blockUIUtil.show();
//         },
//
//         complete: function () {
//             blockUIUtil.hide();
//         }
//     }
// };
//
// /**
//  * 在进行ajax请求时锁屏
//  * @param props ajax参数
//  * @param successCallBack 成功回调函数
//  * @param errorCallBack 失败回调函数
//  */
// ajaxUtil.ajaxWithBlock = function (props, successCallBack, errorCallBack) {
//     props = $.extend({}, props, {
//         beforeSend: function (xhr) {
//             //打开等待条
//             blockUIUtil.show();
//         },
//         success: function (response) {
//             if ($.isPlainObject(response) && response.success != null && !response.success) {
//                 TipsUtil.error(response.message);
//             } else {
//                 successCallBack && successCallBack(response);
//             }
//             //关闭等待条
//             blockUIUtil.hide();
//         },
//         error: function (xhr, ts, err) {
//             try {
//                 errorCallBack && errorCallBack(xhr, ts, err);
//             } catch (e) {
//                 // TipsUtil.error(e);
//                 console && console.log && console.log(e);
//             }
//             //关闭等待条
//             blockUIUtil.hide();
//         }
//     });
//
//     $.ajax(props);
// };