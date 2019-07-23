var rightUtil = {};

(function (rightUtil, $) {
    var concat = Array.prototype.concat,
        slice = Array.prototype.slice;

    $.extend(rightUtil, {
        /**
         * 根据权限展未相关内容
         *  <code>
         *     rightUtil.displayByRight();
         *     => 在document下找出有fun_code属性的元素,根据主页面的权限码展示元素
         *
         *     rightUtil.displayByRight($("div:first"));
         *     => 在第一块div下找出有fun_code属性的元素,根据主页面的权限码展示元素
         *
         *     rights = ["1002", "1003", "1004", "1005"]
         *     rightUtil.displayByRight($("div:first"), rights);
         *     =>在第一块div下找出有fun_code属性的元素,根据给出的权限码展示元素
         * </code>
         * @param context 上下文, 在哪块区域下要根据权限码展示, 默认为document
         * @param allRights 所有权限, 默认取application.functionList的值
         */
        displayByRight: function (context, allRights) {
            var rights = [];

            if (allRights) {
                rights = allRights.join(",");
            } else {
                try {
                    rights = window.top.application.functionList;
                } catch (e) {
                    // nothing
                }
            }


            $("[fun_code]", context || document).each(function () {
                var btn = $(this);
                if (rights.indexOf(btn.attr("fun_code")) < 0) {
                    btn.remove();
                }
            });
        },

        /**
         * 判断是否有所有的权限
         * <code>
         *     rights = ["1002", "1003", "1004", "1005"]
         *     rightUtil.hasRight("1002", "1003", "1004")
         *     => true
         *
         *     rightUtil.hasRight("1002", "2001"])
         *     => false
         * </code>
         * @returns {boolean}
         */
        hasRight: function (r1, r2, r3) {
            var rights = top.application && top.application.functionList
                    ? top.application.functionList
                    : [],
                rs = concat.apply([], slice.call(arguments, 0));

            for (var i in rs) {
                // 如果不在权限列表中，则直接返回
                if ($.isNumeric(i) && rights.indexOf(rs[i]) < 0) {
                    return false;
                }
            }

            return true;
        },

        /**
         * 判断是否有所有的权限
         * <code>
         *     rights = ["1002", "1003", "1004", "1005"]
         *
         *     rightUtil.containsRight(rights, "1002", "1003", "1004")
         *     => true
         *
         *     rightUtil.containsRight(rights, ["1002", "2001"])
         *     => false
         * </code>
         * @returns {boolean}
         */
        containsRight: function (rights, r1, r2, r3) {
            var rs = concat.apply([], slice.call(arguments, 0));
            rights || (rights = []);

            for (var i in rs) {
                // 如果不在权限列表中，则直接返回
                if (rights.join(",").indexOf(rs[i]) < 0) {
                    return false;
                }
            }

            return true;
        }
    });

})(rightUtil, jQuery);