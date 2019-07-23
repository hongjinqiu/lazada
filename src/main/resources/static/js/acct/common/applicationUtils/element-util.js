// /**
//  * denpendence: [jQuery]
//  * @type {elementUtil|*|{}}
//  */
//
// var elementUtil = {
//
//     /**
//      * 获取当前屏幕 与 标屏(1024*768)的 宽度差
//      */
//     getStandardWinDiffWidth: function () {
//         return $(window).width() - 1024;
//     },
//
//     /**
//      * 获取当前屏幕 与 标屏(1024*768)的 高度差
//      */
//     getStandardWinDiffHeight: function () {
//         return $(window).height() - 768;
//     },
//
//     /**
//      * 将给定元素设置高度为从起始top的位置到窗口底部（paddingHeight为底部空白）
//      * @param jqEpr 自动高度的jQuery对象或表达式（ "#id" 或者 $("#id") ）
//      * @param paddingHeight 预留部分
//      */
//     setHeightToBottom: function (jqEpr, paddingHeight) {
//         var
//             winHeight = $(window).height(),
//             $elems = $(jqEpr);
//
//         paddingHeight = paddingHeight || 0;
//
//         $elems.each(function () {
//             var $that = $(this);
//             $that.outerHeight(winHeight - $that.offset().top - paddingHeight);
//         });
//
//     },
//     /**
//      * 获得要元素设置高度为从起始top的位置到窗口底部的值
//      * @param jqEpr 自动高度的jQuery对象或表达式（ "#id" 或者 $("#id") ）
//      * @param paddingHeight 预留部分
//      * @returns {number}
//      */
//     getHeightToBottom: function (jqEpr, paddingHeight) {
//         var
//             winHeight = $(window).height(),
//             $elems = $(jqEpr);
//
//         paddingHeight = paddingHeight || 0;
//         return winHeight - $elems.offset().top - paddingHeight;
//     },
//
//
//     /**
//      * 获得要元素设置高度为从起始top的位置到窗口底部的值
//      * @param jqEpr 自动高度的jQuery对象或表达式（ "#id" 或者 $("#id") ）
//      * @param paddingWidth 预留部分
//      * @returns {number}
//      */
//     getWidthToRight: function (jqEpr, paddingWidth) {
//         var
//             winWidth = $(window).width(),
//             $elems = $(jqEpr);
//
//         paddingWidth = paddingWidth || 0;
//         return winWidth - $elems.offset().left - paddingWidth;
//     },
//
//
//     /**
//      * 自动高度，只能针对非控件元素
//      * 不适用于
//      *      1、js控件
//      *      2、重叠设置（内部包括的元素 也设置了自动高度）
//      * @param jqEpr 自动高度的jQuery对象或表达式（ "#id" 或者 $("#id") ）
//      * @param paddingHeight 预留部分
//      */
//     autoHeight: function (jqEpr, paddingHeight) {
//         var elmHeight = elementUtil.getHeightToBottom(jqEpr, paddingHeight),
//             $elm = $(jqEpr),
//             $window = $(window),
//             timeObj = -1;
//         //
//         $elm.css("height", elmHeight);
//         //
//         $window.off("resize.autoHeight", jqEpr);
//         //
//         $window.on("resize.autoHeight", jqEpr, function () {
//             //清除时间对象，防止反复并发
//             window.clearTimeout(timeObj);
//             //
//             timeObj = window.setTimeout(function () {
//                 elmHeight = elementUtil.getHeightToBottom(jqEpr, paddingHeight);
//                 $elm.css("height", elmHeight);
//                 window.clearTimeout(timeObj);
//             }, 100);//设定间隔时间，只有停下300毫秒不动后，再执行调整
//         });
//     },
//
//     /**
//      * 自动宽度，只能针对非控件元素
//      * 不适用于
//      *      1、js控件
//      *      2、重叠设置（内部包括的元素 也设置了自动宽度）
//      * @param jqEpr 自动高度的jQuery对象或表达式（ "#id" 或者 $("#id") ）
//      * @param paddingWidth 预留部分
//      */
//     autoWidth: function (jqEpr, paddingWidth) {
//         var elmWidth = elementUtil.getWidthToRight(jqEpr, paddingWidth),
//             $elm = $(jqEpr),
//             $window = $(window),
//             timeObj = -1;
//         //
//         $elm.css("width", elmWidth);
//         //
//         $window.off("resize.autoWidth", jqEpr);
//         //
//         $window.on("resize.autoWidth", jqEpr, function () {
//             //清除时间对象，防止反复并发
//             window.clearTimeout(timeObj);
//             //
//             timeObj = window.setTimeout(function () {
//                 elmWidth = elementUtil.getWidthToRight(jqEpr, paddingWidth);
//                 $elm.css("width", elmWidth);
//                 window.clearTimeout(timeObj);
//             }, 100);//设定间隔时间，只有停下300毫秒不动后，再执行调整
//         });
//     },
//
//
//     /**
//      * 居中显示
//      * @param jqEpr 自动高度的jQuery对象或表达式（ "#id" 或者 $("#id") ）
//      * @param config (支持偏移配置，例如：{offset: {top: -100,left:-50}} 向上偏移100，向左偏移50)
//      */
//     showCenter: function (jqEpr, config) {
//         var $elm = $(jqEpr),
//             elmWidth = $elm.width(),
//             elmHeight = $elm.height(),
//             $window = $(window),
//             winWidth = $window.width(),
//             winHeight = $window.height(),
//             positionLeft = -1,
//             positionTop = -1;
//         //
//         if (winWidth > elmWidth) {
//             positionLeft = (winWidth - elmWidth) / 2;
//             if (config.offset && config.offset.left) {
//                 positionLeft += config.offset.left;
//             }
//         }
//         if (winHeight > elmHeight) {
//             positionTop = (winHeight - elmHeight) / 2;
//             if (config.offset && config.offset.top) {
//                 positionTop += config.offset.top;
//             }
//         }
//         if (positionLeft != -1) {
//             $elm.css({left: positionLeft});
//         }
//         if (positionTop != -1) {
//             $elm.css({top: positionTop});
//         }
//         $elm.show();
//     },
//
//     /**
//      * 在给定的时间内只允许单击一次,防止快速点击多次
//      * 实现方式：在点击时在该元素上加上和该元素相同大小相同位置透明的元素达到遮盖的效果
//      * @param selector
//      * @param time
//      */
//     onlyClick: function (selector, time) {
//         function handle(ele) {
//             var $ele = $(ele),
//                 $maskEle = $("<div style='position:fixed;left:-1000px; top:-1000px;z-index:9999;cursor:not-allowed;'>处理中...</div>").appendTo("body");
//
//             if (!$ele.data("mask")) {
//                 $maskEle
//                     .width($ele.outerWidth())
//                     .height($ele.outerHeight())
//                     .css({
//                         "filter": "alpha(opacity=0)",
//                         "-moz-opacity": 0,
//                         "-khtml-opacity": 0,
//                         "opacity": 0
//                     })
//                     .positioner({
//                         my: "left top",
//                         at: "left top",
//                         of: $ele
//                     });
//
//                 $ele.data("mask", $maskEle[0]);
//                 window.setTimeout(function () {
//                     $ele.data("mask", null);
//                     $maskEle.remove();
//                 }, time);
//             }
//         }
//
//         time || (time = 1000);
//
//
//         if (typeof selector === "string") {
//             $(document).off("click.onlyClick").on("click.onlyClick", selector, function () {
//                 handle(this);
//             });
//         } else {
//             $(selector).off("click.onlyClick").on("click.onlyClick", function () {
//                 handle(this);
//             });
//         }
//     },
//
//     /**
//      * 获得元素离页面左边偏移量
//      * @param element
//      * @returns {Number|number}
//      */
//     getElementLeft: function (element) {
//         var actualLeft = element.offsetLeft;
//         var current = element.offsetParent();
//
//         while (current !== null) {
//             actualLeft += current.offsetLeft;
//             current = current.offsetParent;
//         }
//
//         return actualLeft;
//     },
//
//     /**
//      * 获得元素离页面上边偏移量
//      * @param element
//      * @returns {Number|number}
//      */
//     getElementTop: function (element) {
//         var actualTop = element.offsetTop;
//         var current = element.offsetParent;
//
//         while (current !== null) {
//             actualTop += current.offsetTop;
//             current = current.offsetParent;
//         }
//
//         return actualTop;
//     },
//
//     /**
//      * 获得元素在页面相对于视窗的位置
//      * @param element
//      * @returns {*}
//      */
//     getBoundingClientRect: function (element) {
//         var scrollTop = document.documentElement.scrollTop;
//         var scrollLeft = document.documentElement.scrollLeft;
//
//         if (element.getBoundingClientRect) {
//             if (typeof arguments.callee.offset != "number") {
//                 var temp = document.createElement("div");
//
//                 temp.style.cssText = "position:absolute; left: 0; top:0;";
//                 document.body.appendChild(temp);
//                 arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
//                 document.body.removeChild(temp);
//                 temp = null;
//             }
//             var rect = element.getBoundingClientRect();
//             var offset = arguments.callee.offset;
//
//             return {
//                 left: rect.left + offset,
//                 right: rect.right + offset,
//                 top: rect.top + offset,
//                 bottom: rect.bottom + offset
//             }
//         } else {
//             var actualLeft = elementUtil.getElementLeft(element);
//             var actualTop = elementUtil.getElementTop(element);
//
//             return {
//                 left: actualLeft - scrollLeft,
//                 right: actualLeft + element.offsetWidth - scrollLeft,
//                 top: actualTop - scrollTop,
//                 bottom: actualTop + element.offsetHeight - scrollTop
//             }
//         }
//     }
//
// };