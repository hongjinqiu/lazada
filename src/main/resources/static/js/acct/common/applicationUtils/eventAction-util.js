/**
 * 依赖 jQuery
 * @type {{clickAction: Function, blurAction: Function}}
 */
var eventActionUtil = eventActionUtil || {
        /**
         *
         * 对有有自定义属性（clickAction）的元素绑定点击事件
         *
         * 例：<a clickAction="save">保存</a> 将被调用save方法
         *    <button clickAction="delete">删除</button>
         *
         * 并且给点击事件确定命名空间是click.action
         *
         * @param pageObj 当前页面js对象（不为空）
         */
        clickAction: function (pageObj) {
            $(document).off("click.action");
            $(document).on("click.action", "[clickAction]", function (event) {
                var $this = $(this), methodName = $this.attr("clickAction"),
                    methodParentObj, method;
                if (pageObj) {
                    methodParentObj = pageObj;
                    method = pageObj[methodName];
                } else {
                    methodParentObj = eval(methodName.substring(0, methodName.indexOf(".")));
                    method = eval(methodName);
                }
                if (method) {
                    method.apply(methodParentObj, [event]);
                } else {
                    alert(" 未找到定义的 " + methodName + " 方法！");
                    throw new Error(0, " 未找到定义的 " + methodName + " 方法！");
                }
            });
        },

        blurAction: function (pageObj) {
            $(document).off("blur.action");
            $(document).on('blur.action', '[blurAction]', function (event) {
                var $this = $(this), methodName = $this.attr("blurAction"),
                    methodParentObj, method;
                if (pageObj) {
                    methodParentObj = pageObj;
                    method = pageObj[methodName];
                } else {
                    methodParentObj = eval(methodName.substring(0, methodName.indexOf(".")));
                    method = eval(methodName);
                }
                if (method) {
                    method.apply(methodParentObj, [event]);
                } else {
                    alert(" 未找到定义的 " + methodName + " 方法！");
                    throw new Error(0, " 未找到定义的 " + methodName + " 方法！");
                }
            });
        }
    };

