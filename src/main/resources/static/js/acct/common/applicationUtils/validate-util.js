/**
 * denpendence: []
 */
var validateUtil = validateUtil || {
        /**
         * 正则表达式
         */
        reqExt: {
            /**
             * 邮件格式
             */
            email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            /**
             * 电话
             */
            isPhone: /^([0-9]{3,4}-)?[0-9]{7,8}$/,
            /**
             * 手机
             */
            isMob: /^((\+?86)|(\(\+86\))|(0)|(\+?38)|(\(\+38\)))?(1[3|4|5|7|8][0-9]\d{8})$/,
            /**
             * 同时验证手机和电话
             */
            isMobOrPhone:/^(([0-9]{3,4}-)?[0-9]{7,8})|(((\+?86)|(\(\+86\))|(0)|(\+?38)|(\(\+38\)))?(1[3|4|5|7|8][0-9]\d{8}))$/,
            /**
             * 金额
             */
            isMoney: /^\-?[1-9]+\d*(\.\d+)?$/
        },
        /**
         * 验证数据
         * @param datas 验证的数据 数组 或 对象
         * @param validateRules 验证规则{}
         * @param isShowRowNum 是否显示行号true/false
         * @returns {{}} 验证信息对象，例如：{name:["不能为空"],price:["不能为空","必须大于1","必须小余100"]}
         *
         *
         * {
                name: {label: '名称'},
                code: {label: '编码'},
                field1: {label: '字段1',required:false},
                field2: {label: '字段2',minLength:6,maxLength:18},
                field3: {label: '字段3',maxValue:999.99,minValue:0.00:},
                field4: {label: '字段4',reqExp:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,reqExpMsg:"邮件格式不正确":},
         }
         *
         *
         */
        validateDatas: function (datas, validateRules, isShowRowNum) {
            //{fieldName:["不能为空"],fieldName:["不能为空","数字必须大小100","数字必须大于1"]}
            var isShowRowNum = isShowRowNum == true ? true : false,
                validateMsgObj = {},
                buildMsgFunc = function (fieldName, _validateMsg) { //验证信息组装
                    var msgArr = validateMsgObj[fieldName] ? validateMsgObj[fieldName] : [];
                    if (_validateMsg) {
                        msgArr.push(_validateMsg);
                        validateMsgObj[fieldName] = msgArr;
                    }
                };
            //如果 datas 不是数组，而是对象
            if (!$.isArray(datas) || $.isPlainObject(datas)) {
                datas = [datas];
            }
            //
            for (var i = 0; i < datas.length; i++) {
                var rowData = datas[i];
                //取出规则,逐个验证
                for (var fieldNameKey in validateRules) {
                    if (!validateRules[fieldNameKey]) {
                        continue;
                    }
                    var validateRule = validateRules[fieldNameKey],
                        fieldValue = rowData[fieldNameKey],
                        validataMsg = "";
                    //验证非空
                    if (validateRule.required && validateRule.required !== false) {
                        //避免fieldValue为数值0，校验错误
                        if ($.trim(fieldValue).length == 0) {
                            validataMsg = validateRule.label + i18n["acct.common.validateUtil.canNotBeEmpty"];
                            if (isShowRowNum === true) {
                                validataMsg = i18n["acct.common.validateUtil.the"]  + (i + 1) + i18n["acct.common.validateUtil.line"] +"，" + validataMsg;
                            }
                            buildMsgFunc(fieldNameKey, validataMsg);
                        }
                    }
                    //验证最大值
                    if (validateRule.maxValue) {
                        if (!isNaN(validateRule.maxValue)) {
                            if (fieldValue) {
                                if (!isNaN(fieldValue)) {
                                    if (fieldValue > validateRule.maxValue) {
                                        validataMsg = validateRule.label +
                                            (validateRule.maxValueMsg ? validateRule.maxValueMsg : i18n["acct.common.validateUtil.notGreaterThan"]  + validateRule.maxValue);
                                        if (isShowRowNum === true) {
                                            validataMsg = i18n["acct.common.validateUtil.the"] + (i + 1) + i18n["acct.common.validateUtil.line"]+"，" + validataMsg;
                                        }
                                        buildMsgFunc(fieldNameKey, validataMsg);
                                    }
                                } else {
                                    buildMsgFunc(fieldNameKey, validateRule.label + "，"+i18n["acct.common.validateUtil.MustBeANumber"]);
                                }
                            }
                        } else {
                            throw Error(i18n["acct.common.validateUtil.ValidationRulesMaxValueErrors"] );
                        }
                    }
                    //验证最小值
                    if (validateRule.minValue) {
                        if (!isNaN(validateRule.minValue)) {
                            if (fieldValue) {
                                if (!isNaN(fieldValue)) {
                                    if (fieldValue < validateRule.minValue) {
                                        validataMsg = validateRule.label + (validateRule.minValueMsg ? validateRule.minValueMsg : i18n["acct.common.validateUtil.NotLessThan"] + validateRule.minValue);
                                        if (isShowRowNum === true) {
                                            validataMsg = i18n["acct.common.validateUtil.the"] + (i + 1) + i18n["acct.common.validateUtil.line"]+"，" + validataMsg;
                                        }
                                        buildMsgFunc(fieldNameKey, validataMsg);
                                    }
                                } else {
                                    buildMsgFunc(fieldNameKey, validateRule.label + "，"+i18n["acct.common.validateUtil.MustBeANumber"]);
                                }
                            }
                        } else {
                            throw Error(i18n["acct.common.validateUtil.ValidationRulesMinValueErrors"] );
                        }
                    }

                    //验证最小长度
                    if (validateRule.minLength) {
                        if (!isNaN(validateRule.minLength)) {
                            validataMsg = validateRule.label + (validateRule.minLengthMsg ? validateRule.minLengthMsg : i18n["acct.common.validateUtil.LengthCannotBeLessThan"] + validateRule.minLength+i18n["acct.common.validateUtil.char"]);
                            if (fieldValue) {
                                if (fieldValue.length < validateRule.minLength) {
                                    if (isShowRowNum === true) {
                                        validataMsg = i18n["acct.common.validateUtil.the"] + (i + 1) +i18n["acct.common.validateUtil.line"]+ "，" + validataMsg;
                                    }
                                    buildMsgFunc(fieldNameKey, validataMsg);
                                }
                            } else {
                                buildMsgFunc(fieldNameKey, validataMsg);
                            }
                        } else {
                            throw Error(i18n["acct.common.validateUtil.ValidationRulesMinLengthErrors"]);
                        }
                    }

                    //验证最大长度
                    if (validateRule.maxLength) {
                        if (!isNaN(validateRule.maxLength)) {
                            validataMsg = "";
                            if (fieldValue) {
                                validataMsg = validateRule.label + (validateRule.maxLengthMsg ? validateRule.maxLengthMsg : i18n["acct.common.validateUtil.LengthCannotBeGreaterThan"] + validateRule.maxLength+i18n["acct.common.validateUtil.char"]);
                                if (fieldValue.length > validateRule.maxLength) {
                                    if (isShowRowNum === true) {
                                        validataMsg = i18n["acct.common.validateUtil.the"] + (i + 1) + i18n["acct.common.validateUtil.line"]+"，" + validataMsg;
                                    }
                                    buildMsgFunc(fieldNameKey, validataMsg);
                                }
                            } else {
                                buildMsgFunc(fieldNameKey, validataMsg);
                            }
                        } else {
                            throw Error(i18n["acct.common.validateUtil.ValidationRulesMaxLengthErrors"]);
                        }
                    }

                    //正则表达式
                    if (validateRule.reqExp) {
                        if (validateRule.reqExpMsg) {
                            validataMsg = validateRule.label + " " + (validateRule.reqExpMsg ? validateRule.reqExpMsg : "");
                            if ( fieldValue &&fieldValue.match(validateRule.reqExp) == null) {
                                buildMsgFunc(fieldNameKey, validataMsg);
                            }
                        } else {
                            throw Error(i18n["acct.common.validateUtil.ValidationRulesReqExpMsgErrors"]);
                        }
                    }
                    //日期比较
                    if (validateRule.compareDate) {
                        var sedValue = rowData[validateRule.compareDate];
                        if(sedValue || fieldValue){
                            if(!fieldValue || fieldValue > sedValue) {
                                validataMsg = validateRule.label+i18n["acct.common.validateUtil.ValidationDate"];
                                buildMsgFunc(fieldNameKey, validataMsg);
                            }
                        }
                    }
                }
            }
            return validateMsgObj;
        },
        /**
         * 拼接验证提示信息
         * @param validateMsgObj 验证消息对象
         * @param msgMaxCount 消息最大显示数
         * @returns {string}
         */
        concatValidateMsg: function (validateMsgObj, msgMaxCount) {
            var _showMsg = "", fieldNameKey, msgCount = 0, msgMaxCount = msgMaxCount ? msgMaxCount : -1;
            for (fieldNameKey in validateMsgObj) {
                if (!validateMsgObj[fieldNameKey]) {
                    continue;
                }
                var msgArr = validateMsgObj[fieldNameKey];
                if (msgCount >= msgMaxCount && msgMaxCount > 0) {
                    _showMsg += "......<br/>";
                    break;
                }
                if (msgArr && msgArr.length > 0) {
                    for (var i = 0; i < msgArr.length; i++) {
                        _showMsg += msgArr[i] + "<br/>";
                        msgCount++;
                    }
                }
            }
            return _showMsg;
        },

        /**
         * 验证数据
         * @param datas 验证的数据[]
         * @param validateRules 验证规则{}
         * @param isShowRowNum 是否显示行号true/false
         * @param msgMaxCount  消息最大显示数
         * @returns {string}
         */
        validate: function (datas, validateRules, isShowRowNum, msgMaxCount) {
            var validateMsgObj = validateUtil.validateDatas(datas, validateRules, isShowRowNum);
            return validateUtil.concatValidateMsg(validateMsgObj, msgMaxCount);
        },

        /**
         * 获取第一个不通过验证的 name
         * @param validateMsgObj 验证信息对象，例如：{name:["不能为空"],price:["不能为空","必须大于1","必须小余100"]}
         * @returns {string}
         */
        getFirstNoPassName: function (validateMsgObj) {
            var firstName = "", name;
            if (!$.isEmptyObject(validateMsgObj)) {
                for (name in validateMsgObj) {
                    if (validateMsgObj[name] && name) {
                        firstName = name;
                        break;
                    }
                }
            }
            return firstName;
        }

    };