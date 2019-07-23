(function ($) {
	var PROP_NAME = "datepicker";

	$.datepicker._doKeyDown = function(event) {
		var onSelect, dateStr, sel,
			inst = $.datepicker._getInst(event.target),
			handled = true,
			isRTL = inst.dpDiv.is(".ui-datepicker-rtl");

		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing) {
			switch (event.keyCode) {
				case 9:
					$.datepicker._doBlur(event);
					handled = false;
					break; // hide on tab out
				case 13: sel = $("td." + $.datepicker._dayOverClass + ":not(." +
					$.datepicker._currentClass + ")", inst.dpDiv);
					if (sel[0]) {
						$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
					}

					onSelect = $.datepicker._get(inst, "onSelect");
					if (onSelect) {
						dateStr = $.datepicker._formatDate(inst);

						// trigger custom callback
						onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
					} else {
						$.datepicker._hideDatepicker();
					}

					return false; // don't submit the form
				case 27: $.datepicker._hideDatepicker();
					break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
					-$.datepicker._get(inst, "stepBigMonths") :
					-$.datepicker._get(inst, "stepMonths")), "M");
					break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
					+$.datepicker._get(inst, "stepBigMonths") :
					+$.datepicker._get(inst, "stepMonths")), "M");
					break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) {
					$.datepicker._clearDate(event.target);
				}
					handled = event.ctrlKey || event.metaKey;
					break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) {
					$.datepicker._gotoToday(event.target);
				}
					handled = event.ctrlKey || event.metaKey;
					break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) {
					$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
				}
					handled = event.ctrlKey || event.metaKey;
					// -1 day on ctrl or command +left
					if (event.originalEvent.altKey) {
						$.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, "stepBigMonths") :
							-$.datepicker._get(inst, "stepMonths")), "M");
					}
					// next month/year on alt +left on Mac
					break;
				case 38: if (event.ctrlKey || event.metaKey) {
					$.datepicker._adjustDate(event.target, -7, "D");
				}
					handled = event.ctrlKey || event.metaKey;
					break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) {
					$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
				}
					handled = event.ctrlKey || event.metaKey;
					// +1 day on ctrl or command +right
					if (event.originalEvent.altKey) {
						$.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, "stepBigMonths") :
							+$.datepicker._get(inst, "stepMonths")), "M");
					}
					// next month/year on alt +right
					break;
				case 40: if (event.ctrlKey || event.metaKey) {
					$.datepicker._adjustDate(event.target, +7, "D");
				}
					handled = event.ctrlKey || event.metaKey;
					break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		} else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		} else {
			handled = false;
		}

		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	$.datepicker._connectDatepicker = function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName)) {
			return;
		}
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
		keypress(this._doKeyPress).keyup(this._doKeyUp).blur(this._doBlur);
		this._autoSize(inst);

		this._formatString(target, inst);
		$.data(target, PROP_NAME, inst);
		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
	},

	$.datepicker._doBlur = function(event){
		var inst = $.datepicker._getInst(event.target);

		if(event.target && $(event.target).val() != "" && inst.settings.notInitBlue !== true && inst.settings.dateFormat.length > 7) {
			var inputValue =$(event.target).val(),
				inputDate = $.DateUtils.parseDate(inputValue,i18n["acct.common.format.date"]),
				year = inputDate.getFullYear(),
				month = Number(inputDate.getMonth()),
				day = inputDate.getDate();

			inst.selectedYear = year;
			inst.currentYear = year;
			inst.selectedMonth = month;
			inst.currentMonth = month;
			inst.selectedDay = day;
			inst.currentDay = day;

			$.datepicker._selectDate(event.target, $.datepicker._formatDate(inst,
				inst.selectedDay, inst.selectedMonth, inst.selectedYear));
		}
	},

		/* Pop-up the date picker for a given input field.
		 * If false returned from beforeShow event handler do not show.
		 * @param  input  element - the input field attached to the date picker or
		 *					event - if triggered by focus
		 */
	$.datepicker._base_showDatepicker = $.datepicker._showDatepicker,
	$.datepicker._showDatepicker = function(input) {
		var inputEle = input;
		if ($.trim(input.nodeName) == "" || input.nodeName.toLowerCase() !== "input") {
			inputEle = input.target;
		}
		$(inputEle).unbind("blur", $.datepicker._doBlur).bind("blur",$.datepicker._doBlur);
		$.datepicker._base_showDatepicker(input);

	},

	$.datepicker._destroyDatepicker = function(target) {
		var nodeName,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		$.removeData(target, PROP_NAME);
		if (nodeName === "input") {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
			//TODO: 日期控件增加 聚焦 和 点击，的支持 begin
			unbind("click", this._showDatepicker).
			unbind("focus", this._showDatepicker).
			unbind("blur", this._doBlur).
			//TODO: 日期控件增加 聚焦 和 点击，的支持 end
			unbind("keydown", this._doKeyDown).
			unbind("keypress", this._doKeyPress).
			unbind("keyup", this._doKeyUp);
		} else if (nodeName === "div" || nodeName === "span") {
			$target.removeClass(this.markerClassName).empty();
		}
	},

	/* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */
	$.datepicker._attachHandlers = function(inst) {
		var stepMonths = this._get(inst, "stepMonths"),
			id = "#" + inst.id.replace( /\\\\/g, "\\" );
		inst.dpDiv.unbind("mousedown").bind("mousedown",function(){
			$(inst.input[0]).unbind("blur", this._doBlur);
		});
		inst.dpDiv.find("[data-handler]").map(function () {

			var handler = {
				prev: function () {
					$(inst.input[0]).unbind("blur", this._doBlur);
					$.datepicker._adjustDate(id, -stepMonths, "M");
				},
				next: function () {
					$(inst.input[0]).unbind("blur", this._doBlur);
					$.datepicker._adjustDate(id, +stepMonths, "M");
				},
				hide: function () {
					$.datepicker._hideDatepicker();
				},
				//TODO: begin 扩展清空
				clean: function () {
					$(inst.input[0]).unbind("blur", this._doBlur);
					$(id).val("");
					//默认清空完就关闭
					$.datepicker._hideDatepicker();
				},
				//TODO: end 扩展清空
				today: function () {
					$(inst.input[0]).unbind("blur", this._doBlur);
					$.datepicker._gotoToday(id);
				},
				selectDay: function () {
					$(inst.input[0]).unbind("blur", this._doBlur);
					$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
					return false;
				},
				//TODO: 添加只选择月份属性begin
				selectMonthOnly: function () {
					$(inst.input[0]).unbind("blur", this._doBlur);
					$.datepicker._selectMonthOnly(id, this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
					return false;
				},
				//TODO: 添加只选择月份属性end
				selectMonth: function () {
					$(inst.input[0]).unbind("blur", this._doBlur);
					$.datepicker._selectMonthYear(id, this, "M");
					return false;
				},
				selectYear: function () {
					$(inst.input[0]).unbind("blur", this._doBlur);
					$.datepicker._selectMonthYear(id, this, "Y");
					return false;
				}
			};
			$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
		});
	}
})(jQuery);

/**
 * 依赖 jQueryUI
 */
var DatePickerUtil = {

    /**
     * 在表单上使用
     */
    datePickerConfig: {
        showOn: "both",//focus,button,both
        buttonImage: App["staticContextPath"] + "/assets/images/acct/sprite/date-icon.png",
        buttonImageOnly: true,
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: App.language === "zh_CN" ? "yy-mm-dd" : "dd/mm/yy",
        beforeShow: function (input, inst) {
            //焦点事件分为：人为聚焦 和 js脚本聚焦
            if (window.event && window.event.type == "focus") {
                if (event.relatedTarget) {
                    return true;
                } else {
                    //js脚本聚焦，只聚焦
                    return false;
                }
            }
            return true;
        },
        positionRefer: function () {
            //控件输入框 被父<label>包着。
            //下拉层的定位参照 是父<label>
            var parentEle = $(this).parent().is("div") ? "div" : "label";
            return $(this).parent(parentEle);
        }
    },

    /**
     * 在表单上使用
     */
    datePickerConfig2: {
        showOn: "both",//focus,button,both
        buttonImage: App["staticContextPath"] + "/assets/images/acct/sprite/date-icon.png",
        buttonImageOnly: true,
        showButtonPanel: true,
        changeMonth: true,
        selMonth:true,
        changeYear: true,
        dateFormat: App.language === "zh_CN" ? "yy-mm" : "mm/yy",
        beforeShow: function (input, inst) {
            //焦点事件分为：人为聚焦 和 js脚本聚焦
            if (window.event && window.event.type == "focus") {
                if (event.relatedTarget) {
                    return true;
                } else {
                    //js脚本聚焦，只聚焦
                    return false;
                }
            }
            return true;
        },
        positionRefer: function () {
            //控件输入框 被父<label>包着。
            //下拉层的定位参照 是父<label>
            var parentEle = $(this).parent().is("div") ? "div" : "label";
            return $(this).parent(parentEle);
        }
    },

    /**
     * 在表格内使用
     */
    datePickerConfigForJqGrid: {
        showOn: "focus",//focus,button,both
        buttonImageOnly: false,
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true
    },

    /**
     * 渲染所有日期控件
     */
    render: function (props, selector, context) {
        var $context = context && $(context) || document,
            $selector = selector && $(selector, $context) || $("input[componentType = 'datepicker']", $context);

        props = props || {};
        $selector.datepicker($.extend({}, DatePickerUtil.datePickerConfig, props));
    },
    /**
     * 渲染所有日期控件
     */
    render2: function (props, selector, context) {
        var $context = context && $(context) || document,
            $selector = selector && $(selector, $context) || $("input[componentType = 'datepicker']", $context);

        props = props || {};
        $selector.datepicker($.extend({}, DatePickerUtil.datePickerConfig2, props));
    }

};

var App = App || {}, AutoNumericUtil = {
    /** 默认配置 */
    defaultConfig: {
        aSep: '', aDec: '.', vMin: '0.00000000', vMax: '999999999.99999999'
    },

    /** 只能输入整型数字，不能输入小数 */
    getIntConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0', vMax: '999999999'
        }
    },

    /**
     * 正整数最大100 配置
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getIntHundredConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0', vMax: '100'
        }
    },

	/**
	 * 百分比 配置 add by lzs on 20171220
	 * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
	 */
	getPercentConfig: function () {
		return {
			aSep: '', aDec: '.', vMin: '0.00', vMax: '100.00'
		}
	},

    /**
     * 正数单价 配置
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getPriceConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0.00', vMax: '100000.00'
        }
    },

    /**
     * 正数总额 配置
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getAmtConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0.00', vMax: '999999999.99'
        }
    },
    /**
     * 金额配置，包含负数
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getMoneyConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '-999999999.99', vMax: '999999999.99'
        }
    },

    /**
     * 折扣 配置
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getDiscountConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0.00', vMax: '10.00',pSign: 's',aSign:'%'
        }
    },

    /** 数据库smallInt 类型的统一控制 */
    getSamllIntConfig: function () {
        return {
            aSep: '', aDec: '.', vMin: '0', vMax: '9999'
        }
    },

    _repeat: function (str, n) {
        return new Array(n + 1).join(String(str));
    },

    repeatZero: function (count) {
        return AutoNumericUtil._repeat(0, count);
    },

    repeatNine: function (count) {
        return AutoNumericUtil._repeat(9, count);
    },

    /**
     * 获得汇率小数位数
     * @returns {{aSep: string, aDec: string, vMin: string, vMax: string}}
     */
    getExRateConfig: function (value) {

        var count = parameterUtil.getExRateCount(),
            vMin = "0." + AutoNumericUtil.repeatZero(count),
            vMax = "99999." + AutoNumericUtil.repeatZero(count),
            padZero = count ,
            aPad = true;

        if(value){
            var value = $.NumberUtils.unThousandsFormat(value),
                reg = /^[+-]?(?!0\d)\d+(\.\d+)?([Ee]-?\d+)?$/,
                exchangeRateAddOne ,
                exArr ;

            if(value > 0 && value < 1 && (value.toString().indexOf("e") != -1 || value.toString().indexOf("E") != -1)){
                exchangeRateAddOne = (parseFloat(value) + 1).toString();
            }else{
                exchangeRateAddOne = value;
            }

            exArr = (exchangeRateAddOne+"").split(".");
            if( exArr && exArr.length > 1){
                var pointAfterLength = exArr[1].length;
                if(pointAfterLength < 5){
                    padZero = 4;
                }else{
                    padZero = pointAfterLength;
                }
            }else if( exArr && exArr.length == 1){
                //有数字，没有【小数点】，那就直接拼接4个0
                padZero = 4;
            }
        }else{
            //focusin 的时候不去格式化拼接11个0，
            aPad = false;
        }

        return {
            aSep: ',', aDec: ".", mDec: padZero, aPad: aPad , vMin: vMin, vMax: vMax
        };
    },

    /** 获得数量小数位数(三位一分割) */
    getNumberPrecisionConfig: function () {
        var count = parameterUtil.getNumberDecimalCount(),
            vMin = "0." + AutoNumericUtil.repeatZero(count),
            vMax = "9999999999." + AutoNumericUtil.repeatZero(count);

        return {
            aSep: '', aDec: ".", vMin: vMin, vMax: vMax
        };
    },

    /** 单价小数位数(三位一分割) */
    getUnitPriceConfig: function () {
        var count = parameterUtil.getUnitPriceDecimalCount(),
            vMin = "0." + AutoNumericUtil.repeatZero(count),
            vMax = "9999999999." + AutoNumericUtil.repeatZero(count);

        return {
            aSep: ',', aDec: ".", vMin: vMin, vMax: vMax
        };
    },

    /** 金额(三位一分割)*/
    getCurrencyConfig: function (numberType,posMax) {
        var count = parameterUtil.getAmountDecimalCount(),
            integerRepeat = AutoNumericUtil.repeatNine(12);
        if (posMax == null) {
            posMax = integerRepeat;
        }
        var negMin = "-" + integerRepeat, zero = "0",
            vMin, vMax;

        if (numberType == null) {
            numberType = 0;
        }

        // 允许输入正负数
        if (numberType === 0) {
            vMin = negMin + "." + AutoNumericUtil.repeatNine(count);
            vMax = posMax + "." + AutoNumericUtil.repeatNine(count);
        }
        // 只能输入正数
        else if (numberType === 1) {
            vMin = zero + "." + AutoNumericUtil.repeatZero(count);
            vMax = posMax + "." + AutoNumericUtil.repeatNine(count);
        }
        // 只能输入负数
        else {
            vMin = negMin + "." + AutoNumericUtil.repeatNine(count);
            vMax = zero + "." + AutoNumericUtil.repeatZero(count);
        }

        return {
            aSep: ',', aDec: ".", vMin: vMin, vMax: vMax
        };
    },

    /** 控制只能输入数字，和最大数字*/
    getNumConfig: function (numberType,posMax) {
        var integerRepeat = AutoNumericUtil.repeatNine(12);
        if (posMax == null) {
            posMax = integerRepeat;
        }
        var negMin = "-" + integerRepeat, zero = "0",
            vMin, vMax;

        if (numberType == null) {
            numberType = 0;
        }

        // 允许输入正负数
        if (numberType === 0) {
            vMin = negMin ;
            vMax = posMax ;
        }
        // 只能输入正数
        else if (numberType === 1) {
            vMin = zero;
            vMax = posMax;
        }
        // 只能输入负数
        else {
            vMin = negMin ;
            vMax = zero;
        }

        return {
            aSep: '', aDec: ".", vMin: vMin, vMax: vMax
        };
    },

    /**
     * 渲染所有数字控件
     */
    render: function () {
        //
        $("input[componentType='auto-numeric']").each(function (index, inputEl) {
            var $inputEl = $(inputEl),
                configName = $inputEl.attr("componentConfig"),
                configArg = $inputEl.attr("componentConfigArg"),
                config,
                _config;
            //如果是取 AutoNumericUtil 已有配置
            if (AutoNumericUtil.hasOwnProperty(configName)) {
                config = AutoNumericUtil[configName];
            } else {
                config = eval(configName);
            }
            //如果是 function
            if ($.isFunction(config)) {
                //如果有配参数
                if (configArg) {
                    _config = config(configArg);
                } else {
                    _config = config();
                }
            }
            //如果是 {} JSON对象
            else if ($.isPlainObject(config)) {
                _config = config;
            }
            //至少有默认的
            if (_config) {
            } else {
                _config = AutoNumericUtil.defaultConfig;
            }
            //渲染控件
            $inputEl.autoNumeric(_config);
        });
    }

};

/**
 *denpendence: [_tips-util,_block-ui-util]
 */


var ajaxUtil = {
    /**
     *通过给定的参数从后台获得数据
     * @param props 如果为string型，则默认是url,其余合法的参数则为jquery.ajax参数
     * @returns {*} 返回数据
     *
     * e.g. geetDataByAjax...
     */
    getDataByAjax : function (props) {
    var ajaxProps, result;
    ajaxProps = {
        type: "POST",
        async: false,
        dataType: "json"
    };

    if ($.type(props) === "string") {
        ajaxProps.url = props;
    } else {
        ajaxProps = $.extend(true, props, ajaxProps);
    }
    $.ajax(ajaxProps).then(function success(data) {
        if ($.isPlainObject(data) && data.success != null && !data.success) {
            TipsUtil.error(data.message);
            throw new Error(data.message);
        }
        result = data;
    }, function error(jqXHR, errorMsg) {
        if (jqXHR.status == 200 && errorMsg == "parsererror") {
            result = null;
        }
        else if (jqXHR.status == 505) {
            //如果是登陆超时，主动调到登陆页
            TipsUtil.warn("登陆超时，请重新登录，3秒后回到首页！");
            //
            var _timeObj = window.setTimeout(function () {
                top.location.href = App["contextPath"] + "/";
                window.clearTimeout(_timeObj);
            }, 3000);
        }
        else {
            // TipsUtil.error("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
            console.log("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
            result = false;
            // throw new Error("请求后台出错！url:" + props.url + "data:" + props.data);
            console.log("请求后台出错！url:" + props.url + "data:" + props.data);
        }
    });
    return result;
},

    /**
     * 获得普通的Ajax请求的设置
     */
    getAjaxSetting : function () {
        return {
            async: true,
            error: function (jqXHR, textStatus, errorThrow) {
                // TipsUtil.error("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
                console.log("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
            }
        };
    },

    /**
     * 获得通过进行json请求的设置
     */
    getJsonAjaxSetting : function (url, data) {
        return {
            url: url,
            type: "post",
            processData: false,
            async: true,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(data),
            error: function (jqXHR, textStatus, errorThrow) {
                // TipsUtil.error("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
                console.log("错误状态：" + jqXHR.status + "，错误信息：" + jqXHR.statusText);
            }
        };
    },

    /**
     * 获得ajax等待动画的设置
     * @returns {{beforeSend: beforeSend, complete: complete}}
     */
    getBlockSetting : function () {
        return {
            beforeSend: function () {
                blockUIUtil.show();
            },

            complete: function () {
                blockUIUtil.hide();
            }
        }
    },

    /**
     * 在进行ajax请求时锁屏
     * @param props ajax参数
     * @param successCallBack 成功回调函数
     * @param errorCallBack 失败回调函数
     */
    ajaxWithBlock : function (props, successCallBack, errorCallBack) {
        props = $.extend({}, props, {
            beforeSend: function (xhr) {
                //打开等待条
                blockUIUtil.show();
            },
            success: function (response) {
                if ($.isPlainObject(response) && response.success != null && !response.success) {
                    TipsUtil.error(response.message);
                } else {
                    successCallBack && successCallBack(response);
                }
                //关闭等待条
                blockUIUtil.hide();
            },
            error: function (xhr, ts, err) {
                try {
                    errorCallBack && errorCallBack(xhr, ts, err);
                } catch (e) {
                    // TipsUtil.error(e);
                    console && console.log && console.log(e);
                }
                //关闭等待条
                blockUIUtil.hide();
            }
        });

        $.ajax(props);
    }
};
