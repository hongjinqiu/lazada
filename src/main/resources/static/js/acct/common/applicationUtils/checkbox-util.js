/**
 * 渲染 单选框
 * denpendence: [jQuery]
 */
var checkboxUtil = {

    /**
     * 渲染 复选框
     *
     * 对以下html结构，渲染点击<checkbox>将影响父元素<label class="check-box">的样式
     * <label class="check-box">
     *      <em class="icon-inp"></em>
     *      <input type="checkbox" name="fieldName">
     *      <span class="option-text">值1</span>
     * </label>
     * <label class="check-box">
     *      <em class="icon-inp"></em>
     *      <input type="checkbox" name="fieldName">
     *      <span class="option-text">值2</span>
     * </label>
     *
     */
    render: function (selector, context) {
        context || (context = document);
        selector || (selector = "label.check-box");

        $(selector, context).each(function (ind, elm) {
            $(elm).off("click.check-box", elm);
            //
            $(elm).on("click.check-box", elm, function (event) {
                var $this = $(event.target),
                    $checkboxInput,
                    checked = false,
                    $parentLabel;
                //屏蔽checkbox 点击事件
                if($this.is("input:checkbox")){
                    return ;
                }else if ($this.is("label.check-box")) { //点击在 label
                    //选中或反选
                    checked = !$this.hasClass("active");
                    //取到子元素checkbox
                    $checkboxInput = $this.children("input:checkbox");
                    //父元素
                    $parentLabel = $this;
                } else if ($this.is("i") || $this.is("input") || $this.is("em") || $this.is("span")) {//点击在 i,input,em,span 兄弟元素上
                        //父元素
                        $parentLabel = $this.parent("label.check-box");
                        //选中或反选
                        checked = !$parentLabel.hasClass("active");
                        //点击在 input:checkbox
                        if ($this.is("input:checkbox")) {
                            $checkboxInput = $this;
                        } else {//点击在 i 或 em
                            $checkboxInput = $this.siblings("input:checkbox");
                        }
                    }
                //父label是否被禁用
                if ($parentLabel.hasClass("dis")) {
                    return;
                }

                window.setTimeout(function () {
                   /* if ($checkboxInput.attr("_checkedCount") == undefined || $checkboxInput.attr("_checkedCount") == 0) {
                        $checkboxInput.attr("_checkedCount", 1);
                    }*/
                    //<label><em><input><span>是层级包含的结构，点击总会响应两次，标识正在处理中，防止重复触发。
                    //if ($checkboxInput.attr("_checkedCount") <= 1) {
                        //设置 checkbox 正选或反选
                        if ($checkboxInput && $checkboxInput.length > 0) {
                            $checkboxInput.prop("checked", checked);
                            if (checked) {
                                //设置父元素样式
                                $checkboxInput.parent("label.check-box").addClass("active");
                            } else {
                                $checkboxInput.parent("label.check-box").removeClass("active");
                            }
                        }
                        //$checkboxInput.attr("_checkedCount", 2);
                   /* } else {
                        $checkboxInput.attr("_checkedCount", 0);
                    }*/
                }, 1);
            });
        });
    },

    /**
     * 对复选框 赋值，同时会对父元素<label class="check-box"> 增加或去除 选中或反选 样式
     * @param name checkbox的name
     * @param valueArr checkbox的值，是数组
     * @param $form checkbox所属的表单jQuery对象（可空）
     */
    setChecked: function (name, valueArr, $form) {
        if ($.isArray(valueArr)) {
            var i, $checkbox;
            //反选所有相同name的checkbox 并去除样式
            if ($form && $form.length > 0) {
                $('input:checkbox[name="' + name + '"]', $form).prop("checked", false).parent("label.check-box").removeClass("active");
            } else {
                $('input:checkbox[name="' + name + '"]').prop("checked", false).parent("label.check-box").removeClass("active");
            }
            //选中checkbox,并对付元素 添加样式
            for (i = 0; i < valueArr.length; i++) {
                if ($form && $form.length > 0) {
                    $checkbox = $('input:checkbox[name="' + name + '"][value="' + valueArr[i] + '"]', $form);
                } else {
                    $checkbox = $('input:checkbox[name="' + name + '"][value="' + valueArr[i] + '"]');
                }
                $checkbox.prop("checked", true);
                //对父元素添加 样式
                $checkbox.parent("label.check-box").addClass("active");
            }
        }
    },
    /**
     * 反选
     * @param name
     * @param $form
     */
    unChecked: function (name, $form) {
        if ($form && $form.length > 0) {
            $('input:checkbox[name="' + name + '"]', $form).prop("checked", false).parent("label.check-box").removeClass("active");
        } else {
            $('input:checkbox[name="' + name + '"]').prop("checked", false).parent("label.check-box").removeClass("active");
        }
    }
};