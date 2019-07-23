/**
 * 依赖[_tips-util, underscore]
 *
 * 枚举类 工具js
 *
 */
var App = App || {}, enumUtil = {
    /**
     * URL 前缀
     */
    _prefixUrl: App["contextPath"] + "/acct/enum/",

    /**
     * 私有存储
     * @private
     */
    // key值, value: /acct/enum下的地址
    _store: {

        _store_uri: {
            // 票据状态枚举类
            imageFlagEnum: "getImageFlagEnum.json",

            // 票据类型枚举类
            typeDescEnum: "getTypeDescEnum.json",

            // 科目类型枚举
            subjectTypeEnum: "getSubjectTypeEnum.json",

            // 单据类型枚举
            billTypeEnum: "getBillTypeEnum.json",

			// 发票类型枚举
			invoiceTypeEnum: "getInvoiceTypeEnum.json",

			// 打印模板状态枚举
			printTemplateStatusEnum: "getPrintTemplateStatusEnum.json",

            // 销售类型
            saleTypeEnum: "getSaleTypeEnum.json",

            // 采购类型
            purchaseTypeEnum: "getPurchaseTypeEnum.json",

			// 银行对账单明细日志类型
			bankItemOperateEnum: "getBankItemOperateEnum.json",

            // 费用单类型
            expenceTypeEnum: "getExpenceTypeEnum.json",

            //单据状态
            billStatusEnum: "getBillStatusEnum.json",

            //审计日志模块类型
            bizEnum: "getBizEnum.json",

            //凭证来源枚举
            voucherCreateModeEnum: "getVoucherCreateModeEnum.json",

            //凭证来源枚举
            sourceBillTypeEnum: "getSourceBillTypeEnum.json",

			//往来单位类型枚举
			partnerTypeEnum: "getPartnerTypeEnum.json" ,

			//往来单位类型枚举,销售
			partnerTypeEnumForSale: "getPartnerTypeEnumForSale.json" ,

			//往来单位类型枚举,采购
			partnerTypeEnumForPurchase: "getPartnerTypeEnumForPurchase.json" ,

			//资产负债表 '1'-查询本财年；'2'-查询本月和上月；'3'-查询本季和上季；'4'-查询本年和上年
			reportCompareTypeEnum: "getReportCompareTypeEnum.json" ,

            //关账状态枚举
            acctPeriodStatusEnum: "getAcctPeriodStatusEnum.json",

            //固定资产折旧方法
            faCardDeprMethodEnum: "getFaCardDeprMethod.json",

            //固定资产卡片状态
            faCardStatusEnum: "getFaCardStatusEnum.json",

            //分期付款状态
            faPayCardStatusEnum: "getFaPayCardStatusEnum.json",

            //gaf查询类型  add by lzs 2016.12.1
            gafTypeEnum: "getGafTypeEnum.json",

            //成本计算方法  add by huangs 2017.1.4
            costingMethodEnum: "getCostingMethodEnum.json",

            //单据状态
            finishStatusEnum: "getFinishStatusEnum.json",

			//单据生成方式 add by zhangyx on 2017-11-08
			generalMethodEnum: "getGeneralMethodEnum.json",

			//带复制类型单据生成方式(销售交货单，采购收货单) add by zhangyx on 2018-06-04
			generalMethodEnumWithCopy: "getGeneralMethodEnumWithCopy.json",

			// 库存调整单,调增,调减
			adjustmentTypeEnum: "getAdjustmentTypeEnum.json",

			// 客户列表状态下拉
			corpStatusEnum: "partnerCorpCorStatusList.json",

            //邮件类型
            emailBizEnum: "getEmailBizEnum.json",

			//影像日志类型
			imageLogEnum: "getImageLogEnum.json",

			//OCR识别状态
			billErrorEnum:"getBillErrorEnum.json",

			//单据付款状态
			billFinishStatusEnum: "getBillFinishStatusEnum.json",

			// 结算方式账户类型
			bankAccountTypeEnum: "getBankAccountTypeEnum.json"
        },

        _store_local: {
            yesNo: function () {
                return [
                    {value: 1, name: i18n["acct.common.enumerate.boolean.yes"]},
                    {value: 0, name: i18n["acct.common.enumerate.boolean.no"]}
                ];
            }
        }
    },

    /**
     *
     * @param url
     * @returns {*}
     * @private
     */
    _ajax: function (url) {
        var retData = null;
        $.ajax({
            type: "POST",
            async: false,// 同步处理
            url: enumUtil._prefixUrl + url,
            success: function (data) {
                retData = data;
            },
            error: function (xhr, ts, err) {
                // 提示信息
                TipsUtil.error("请求失败，" + err);
            }
        });
        return retData;
    },

    /** 深度拷备数据 */
    _copy: function (data) {
        return $.extend(true, $.isArray(data) ? [] : {}, data);
    },

    /**
     * 获得枚举数据
     * @param enumKey
     * @returns {*}
     */
    getEnum: function (enumKey) {
        if (enumUtil._store._store_uri[enumKey] == null && enumUtil._store._store_local == null) {
            alert("not find the enum");
            return;
        }

        // 还没有存储容器, 则先创建
        top.enumStore || (top.enumStore = {});

        var uri = enumUtil._store._store_uri[enumKey];
        // 如果是要进行ajax请求的数据
        if ($.trim(uri) != "") {
            // 缓存数据
            if (top.enumStore[enumKey] == undefined) {
                top.enumStore[enumKey] = enumUtil._ajax(enumUtil._store._store_uri[enumKey]);
            }
            return enumUtil._copy(top.enumStore[enumKey]);
        }
        // 不用进行ajax请求的enum直接返回
        else if (enumUtil._store._store_local[enumKey] != undefined) {
            return enumUtil._copy(enumUtil._store._store_local[enumKey]());
        }

    },

    /**
     * 将枚举数组转成枚举对象
     * e.g.
     * var enumArray = [
     *     {"description": "正常", "name": 9, "code": 9},
     *     {"description": "待作废", "name": 0,"code": 0},
     *     {"description": "已作废", "name": 1, "code": 1},
     *     {"description": "待跨期", "name": 2, "code": 2},
     *     {"description": "已跨期", "name": 3, "code": 3 }
     * ];
     * enumUtil.enumArray2EnumObject(enumArray, "code", "description");
     * =>{0: "待作废", 1: "已作废", 2: "待跨期", 3: "已跨期", 9: "正常"}
     * @param enumArray
     * @param keyFieldName
     * @param valueFiledName 可空
     * @returns {{}}
     */
    enumArray2EnumObject: function (enumArray, keyFieldName, valueFiledName) {
        return _.object(_.map(enumArray, function (enumObj) {
            return valueFiledName ? [enumObj[keyFieldName], enumObj[valueFiledName]] : [enumObj[keyFieldName], enumObj];
        }));
    }

};