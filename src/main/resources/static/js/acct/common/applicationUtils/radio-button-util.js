/**
 * 渲染 单选框
 * denpendence: [jQuery]
 */
var radioButtonUtil = {

    /**
     * 渲染 单选框
     *
     * 对以下html结构，渲染点击<input type="radio">将影响父元素<label class="radio-box">的样式
     * <label class="radio-box">
     *      <em class="icon-inp"></em>
     *      <input type="radio" name="fieldName">
     *      <span class="option-text">值1</span>
     * </label>
     * <label class="radio-box">
     *      <em class="icon-inp"></em>
     *      <input type="radio" name="fieldName">
     *      <span class="option-text">值2</span>
     * </label>
     *
     */
    render: function () {
        //
        $("label.radio-box").each(function (ind, elm) {
            $(elm).off("click.radio-box", elm);
            //
            $(elm).on("click.radio-box", elm, function (event) {
                var $this = $(event.target),
                    $radioInput,
                    checked = false,
                    $parentLabel;
                //点击在 label
                if ($this.is("label.radio-box")) {
                    //选中或反选
                    checked = !$this.hasClass("active");
                    //取到子元素radio
                    $radioInput = $this.children("input:radio");
                    //父元素
                    $parentLabel = $this;
                } else {
                    //点击在 em,input,span
                    if ($this.is("em") ||
                        $this.is("i") ||
                        $this.is("input:radio") ||
                        $this.is("span")) {
                        //父元素
                        $parentLabel = $this.parent("label.radio-box");
                        //选中或反选
                        checked = !$parentLabel.hasClass("active");
                        //点击在 input:radio
                        if ($this.is("input:radio")) {
                            $radioInput = $this;
                        } else {//点击在 em 或 span
                            $radioInput = $this.siblings("input:radio")
                        }
                    }
                }

                //父label是否被禁用
                if ($parentLabel.hasClass("dis")) {
                    return;
                }

                window.setTimeout(function () {
                    var $radioList, $radioLabelList, $checkedRadio;

                    if ($radioInput.attr("_checkedCount") == undefined || $radioInput.attr("_checkedCount") == 0) {
                        $radioInput.attr("_checkedCount", 1);
                    }

                    //<label><em><input><span>是层级包含的结构，点击总会响应两次，标识正在处理中，防止重复触发。
                    if ($radioInput.attr("_checkedCount") <= 1) {
                        //设置 radio 正选或反选
                        if ($radioInput && $radioInput.length > 0) {
                            $radioList = $('input:radio[name="' + $radioInput.attr("name") + '"]');
                            $radioLabelList = $radioList.parent("label.radio-box");
                            $checkedRadio = $radioLabelList.filter(".active").find(":radio");

                            // 当已选择的单选按钮与当前选择的单选按钮相同,则不处理;因为单选框不能取消
                            if ($checkedRadio.val() == $radioInput.val()) {
                                return;
                            }

                            $radioInput.prop("checked", checked);
                            //找到全部相同name 的radio，移除父元素label的选中样式
                            $radioLabelList.removeClass("active");
                            //设置父元素样式
                            $radioInput.parent("label.radio-box").toggleClass("active", checked);
                        }
                        $radioInput.attr("_checkedCount", 2);
                    } else {
                        $radioInput.attr("_checkedCount", 0);
                    }
                }, 1);
            });
        });
    },

	renderRadio: function () {
		//
		$("label.radio").each(function (ind, elm) {
			$(elm).off("click.radio", elm);
			//
			$(elm).on("click.radio", elm, function (event) {
				var $this = $(event.target),
					$radioInput,
					checked = false,
					$parentLabel;
				//点击在 label
				if ($this.is("label.radio")) {
					//选中或反选
					checked = !$this.hasClass("active");
					//取到子元素radio
					$radioInput = $this.children("input:radio");
					//父元素
					$parentLabel = $this;
				} else {
					//点击在 em,input,span
					if ($this.is("em") ||
						$this.is("i") ||
						$this.is("input:radio") ||
						$this.is("span")) {
						//父元素
						$parentLabel = $this.parent("label.radio");
						//选中或反选
						checked = !$parentLabel.hasClass("active");
						//点击在 input:radio
						if ($this.is("input:radio")) {
							$radioInput = $this;
						} else {//点击在 em 或 span
							$radioInput = $this.siblings("input:radio")
						}
					}
				}

				//父label是否被禁用
				if ($parentLabel.hasClass("dis")) {
					return;
				}

				//控制不能反选
				if(!checked){
					return ;
				}

				window.setTimeout(function () {
					var $radioList, $radioLabelList, $checkedRadio;

					if ($radioInput.attr("_checkedCount") == undefined || $radioInput.attr("_checkedCount") == 0) {
						$radioInput.attr("_checkedCount", 1);
					}

					//<label><em><input><span>是层级包含的结构，点击总会响应两次，标识正在处理中，防止重复触发。
					if ($radioInput.attr("_checkedCount") <= 1) {
						//设置 radio 正选或反选
						if ($radioInput && $radioInput.length > 0) {
							$radioList = $('input:radio[name="' + $radioInput.attr("name") + '"]');
							$radioList.removeAttr("_checkedCount");
							$radioLabelList = $radioList.parent("label.radio");
							$checkedRadio = $radioLabelList.filter(".active").find(":radio");

							$radioInput.prop("checked", checked);
							//找到全部相同name 的radio，移除父元素label的选中样式
							$radioLabelList.removeClass("active");
							//设置父元素样式
							$radioInput.parent("label.radio").toggleClass("active", checked);
						}
						$radioInput.attr("_checkedCount", 2);
					} else {
						$radioInput.attr("_checkedCount", 0);
					}
				}, 1);
			});
		});
	},

    /**
     * 对单选框 赋值，同时会对父元素<label class="radio-box"> 增加或去除 选中或反选 样式
     * @param name radio的name
     * @param value radio的值，是数组
     * @param $form radio所属的表单jQuery对象（可空）
     */
    setChecked: function (name, value, $form) {
        if (value) {
            var $radio, $radioList, $radioLabelList;

            $radioList = $form && $form.length > 0
                ? $('input:radio[name="' + name + '"]', $form)
                : $('input:radio[name="' + name + '"]');

            $radioLabelList = $radioList.parent("label.radio-box");

            //反选所有相同name的radio 并去除样式
            $radioList.prop("checked", false);
            $radioLabelList.removeClass("active");

            //选中radio,并对付元素 添加样式
            $radio = $radioList.filter('[value="' + value + '"]');
            $radio.prop("checked", true);
            //对父元素添加 样式
            $radio.parent("label.radio-box").addClass("active");
        }
    },
    /**
     * 反选
     * @param name
     * @param $form
     */
    unChecked: function (name, $form) {
        if ($form && $form.length > 0) {
            $('input:radio[name="' + name + '"]', $form).prop("checked", false).parent("label.radio-box").removeClass("active");
        } else {
            $('input:radio[name="' + name + '"]').prop("checked", false).parent("label.radio-box").removeClass("active");
        }
    }

};