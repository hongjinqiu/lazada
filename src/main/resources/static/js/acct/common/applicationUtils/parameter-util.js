/**
 * denpendence: [tips-util]
 */
var parameterUtil = parameterUtil || {};
/**
 * URL 前缀
 *
 * @type {string}
 * @private
 */
parameterUtil._prefixUrl = App["contextPath"] + "/acct/setup";

/**
 * 获取系统参数
 * numberPrecision: "3",                        数量小数位
 * unitPricePrecision: "3",                      价格小数位
 * amountPrecision: "2"                     金额小数位
 * unitCostPrecision:"2",                单位成本小数位
 * totalCostPrecision:"2",                总成本小数位
 */
parameterUtil.getParameters = function () {

    if (parameterUtil._parameters) {
        return parameterUtil._parameters;
    } else {
        //同步获取
        $.ajax($.extend({},
            ajaxUtil.getDataByAjax, {
                type: "POST",
                dataType: "json",
                async: false,
                url: parameterUtil._prefixUrl+"/getParameters.json",
                success: function (response) {
                    parameterUtil._parameters = response.info ? response.info : {};
                },
                error: function (xhr, ts, err) {
                    // 提示信息
                    TipsUtil.error("请求" + url + "失败，" + err);
                }
            }));
        return parameterUtil._parameters;
    }
};

/**
 *汇率小数位数
 * @returns {number}
 */
parameterUtil.getExRateCount = function(){
    // var exchangeRatePrecision ;
    // try{
    //     exchangeRatePrecision =  Number(parameterUtil.getParameters()['exchangeRatePrecision']);
    // }catch (e){
    //     exchangeRatePrecision = 4;
    // }
    // return isNaN(exchangeRatePrecision) || null == exchangeRatePrecision ? 4 : exchangeRatePrecision ;
    return 11;
};

/**
 *数量小数位数
 * @returns {number}
 */
parameterUtil.getNumberDecimalCount = function(){
    return Number(parameterUtil.getParameters()['numberPrecision']);
};

/**
 *单价小数位数
 * @returns {number}
 */
parameterUtil.getUnitPriceDecimalCount = function(){
    return Number(parameterUtil.getParameters()['unitPricePrecision']);
};

/**
 *金额小数位数
 * @returns {number}
 */
parameterUtil.getAmountDecimalCount = function(){
    return Number(parameterUtil.getParameters()['amountPrecision']);
};

/**
 *单位成本小数位数
 * @returns {number}
 */
parameterUtil.getUnitCostDecimalCount = function(){
    return Number(parameterUtil.getParameters()['unitCostPrecision']);
};

/**
 *总成本小数位数
 * @returns {number}
 */
parameterUtil.getTotalCostDecimalCount = function(){
    return Number(parameterUtil.getParameters()['totalCostPrecision']);
};


