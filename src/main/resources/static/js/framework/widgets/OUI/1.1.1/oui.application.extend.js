/**
 * denpendence: [jQuery]
 * @type {elementUtil|*|{}}
 */
$.extend(true, $.oui.utils.element, {
    /**
     * 获取当前屏幕 与 标屏(1024*768)的 宽度差
     */
    getStandardWinDiffWidth: function () {
        return $(window).width() - 1024;
    },

    /**
     * 获取当前屏幕 与 标屏(1024*768)的 高度差
     */
    getStandardWinDiffHeight: function () {
        return $(window).height() - 768;
    },

    /**
     * 在给定的时间内只允许单击一次,防止快速点击多次
     * 实现方式：在点击时在该元素上加上和该元素相同大小相同位置透明的元素达到遮盖的效果
     * @param selector
     * @param time
     */
    onlyClick: function (selector, time) {
        function handle(ele) {
            var $ele = $(ele),
                $maskEle = $("<div style='position:fixed;left:-1000px; top:-1000px;z-index:9999;cursor:not-allowed;'>处理中...</div>").appendTo("body");

            if (!$ele.data("mask")) {
                $maskEle
                    .width($ele.outerWidth())
                    .height($ele.outerHeight())
                    .css({
                        "filter": "alpha(opacity=0)",
                        "-moz-opacity": 0,
                        "-khtml-opacity": 0,
                        "opacity": 0
                    })
                    .positioner({
                        my: "left top",
                        at: "left top",
                        of: $ele
                    });

                $ele.data("mask", $maskEle[0]);
                window.setTimeout(function () {
                    $ele.data("mask", null);
                    $maskEle.remove();
                }, time);
            }
        }

        time || (time = 1000);


        if (typeof selector === "string") {
            $(document).off("click.onlyClick").on("click.onlyClick", selector, function () {
                handle(this);
            });
        } else {
            $(selector).off("click.onlyClick").on("click.onlyClick", function () {
                handle(this);
            });
        }
    },

    /**
     * 获得元素离页面左边偏移量
     * @param element
     * @returns {Number|number}
     */
    getElementLeft: function (element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent();

        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }

        return actualLeft;
    },

    /**
     * 获得元素离页面上边偏移量
     * @param element
     * @returns {Number|number}
     */
    getElementTop: function (element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;

        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }

        return actualTop;
    },

    /**
     * 获得元素在页面相对于视窗的位置
     * @param element
     * @returns {*}
     */
    getBoundingClientRect: function (element) {
        var scrollTop = document.documentElement.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft;

        if (element.getBoundingClientRect) {
            if (typeof arguments.callee.offset != "number") {
                var temp = document.createElement("div");

                temp.style.cssText = "position:absolute; left: 0; top:0;";
                document.body.appendChild(temp);
                arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
                document.body.removeChild(temp);
                temp = null;
            }
            var rect = element.getBoundingClientRect();
            var offset = arguments.callee.offset;

            return {
                left: rect.left + offset,
                right: rect.right + offset,
                top: rect.top + offset,
                bottom: rect.bottom + offset
            }
        } else {
            var actualLeft = $.oui.utils.element.getElementLeft(element);
            var actualTop = $.oui.utils.element.getElementTop(element);

            return {
                left: actualLeft - scrollLeft,
                right: actualLeft + element.offsetWidth - scrollLeft,
                top: actualTop - scrollTop,
                bottom: actualTop + element.offsetHeight - scrollTop
            }
        }
    }
});
var elementUtil = {



};