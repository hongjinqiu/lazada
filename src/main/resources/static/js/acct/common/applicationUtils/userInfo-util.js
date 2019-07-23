/**
 * 获取用户的数据（UserInfo）的相关数据
 * 依赖: [_tips-util]
 */
var userInfoUtil = userInfoUtil || {};
(function () {
    function getTopUserInfo() {
        var userInfo;

        // 取 top 报错时,说明是嵌套在凤巢 vop 模块下,则我们返回空对象
        try {
            userInfo = top.application && top.application.userInfo ? top.application.userInfo : {};
        } catch (e) {
            userInfo = {};
        }

        return userInfo
    }

    var loadComplete = false;

    /**
     * URL 前缀
     *
     * @type {string}
     * @private
     */
    userInfoUtil._userinfoUrl = App["contextPath"] + "/acct/application/getAcctUserInfo.json";

    /**
     * 私有存储
     * @type {string}
     * @private
     */
    userInfoUtil._infoStore = {};

    /**
     * @returns {*}
     * @private
     */
    userInfoUtil._ajax = function () {
        var retData = null;
        $.ajax({
            type: "POST",
            async: false,// 同步处理
            url: userInfoUtil._userinfoUrl,
            success: function (data) {
                retData = data;
            },
            error: function (xhr, ts, err) {
                // 提示信息
                TipsUtil.error("请求" + url + "失败，" + err);
            }
        });
        loadComplete = true;
        return retData;
    };

    userInfoUtil.getToken = function () {
        var token;

        var topUserInfo = getTopUserInfo();
        if (topUserInfo["token"]) {
            return topUserInfo["token"];
        }

        if (!userInfoUtil._infoStore["token"]) {
            token = $.UrlUtils.getParameter("token");
            userInfoUtil._infoStore["token"] = token;
        } else {
            token = userInfoUtil._infoStore["token"];
        }

        if ($.trim(token) === "") {
            console && console.warn("找不到token");
        }

        return token;
    };

    /**
	 * 前端不能设置token
     * 设置token
     * @param token
     */
    // userInfoUtil.setToken = function (token) {
    //     var topUserInfo = getTopUserInfo();
    //
    //     loadComplete = false;
    //     // 如果有内容,
    //     if (!$.isEmptyObject(topUserInfo)) {
    //         top && (top.application = {token: token});
    //         // 重新获取用户信息放在top里
    //         top.application = userInfoUtil._ajax();
    //     } else {
    //         userInfoUtil._infoStore = {token: token};
    //         userInfoUtil._infoStore = $.extend(userInfoUtil._infoStore, userInfoUtil._ajax());
    //     }
    //     loadComplete = true;
    // };

    /**
     * 通过给定的字段名,取得相应的用户信息
     * @param key
     * @returns {*}
     */
    userInfoUtil.getByKey = function (key) {
        var topUserInfo = getTopUserInfo();
        if (topUserInfo[key]) {
            return topUserInfo[key];
        }

        if (!loadComplete) {
            userInfoUtil._infoStore = $.extend({token: userInfoUtil._infoStore["token"]}, userInfoUtil._ajax());
        }

        var _infoStore = userInfoUtil._infoStore,
            userInfoAll =  $.extend(
                                true,
                                {},
                                _infoStore["userInfo"],
                                {gstEnabled: _infoStore["gstEnabled"]},
                                {stockEnabled: _infoStore["stockEnabled"]},
								{invoicingEnabled: _infoStore["invoicingEnabled"]}, //是否启用开票 add by zhangyx on 2017-10-24
                                {printControl: _infoStore["printControl"]},
                                {saleControl: _infoStore["saleControl"]},
                                {purchaseControl: _infoStore["purchaseControl"]},
                                {expenseControl: _infoStore["expenseControl"]},
                                {incomeControl: _infoStore["incomeControl"]},
                                {writeoffControl: _infoStore["writeoffControl"]},
                                {journalControl: _infoStore["journalControl"]},
                                {isSimplifiedBilled: _infoStore["isSimplifiedBilled"]},
								{scenarioControl: _infoStore["scenarioControl"]}
                            );

        if (!$.isEmptyObject(userInfoAll)) {
            return userInfoAll[key];
        }else {
            console.log("UserInfoUtil line 112 error");
        }
    };

    /**
     * 获得所有用户信息
     */
    userInfoUtil.getAll = function () {
        var topUserInfo = getTopUserInfo(),
            _infoStore;

        if (!$.isEmptyObject(topUserInfo)) {
            return $.extend(true, {}, topUserInfo);
        }

        if (!loadComplete) {
            userInfoUtil._infoStore = $.extend({token: userInfoUtil._infoStore["token"]}, userInfoUtil._ajax());
        }

        _infoStore = userInfoUtil._infoStore;

        return $.extend(
                            true,
                            {},
                            _infoStore["userInfo"],
                            {gstEnabled: _infoStore["gstEnabled"]},
                            {stockEnabled: _infoStore["stockEnabled"]},
							{invoicingEnabled: _infoStore["invoicingEnabled"]}, //是否启用开票 add by zhangyx on 2017-10-24
                            {printControl: _infoStore["printControl"]},
                            {saleControl: _infoStore["saleControl"]},
                            {purchaseControl: _infoStore["purchaseControl"]},
                            {expenseControl: _infoStore["expenseControl"]},
                            {incomeControl: _infoStore["incomeControl"]},
                            {writeoffControl: _infoStore["writeoffControl"]},
                            {journalControl: _infoStore["journalControl"]},
                            {isSimplifiedBilled: _infoStore["isSimplifiedBilled"]},
							{scenarioControl: _infoStore["scenarioControl"]}
                        );
    };

    /**
     * 获取用户Id
     * @returns {*}
     */
    userInfoUtil.getUserId = function () {
        return userInfoUtil.getByKey("userId");
    };
    /**
     * 获取用户名称
     * @returns {*}
     */
    userInfoUtil.getUserName = function () {
        return userInfoUtil.getByKey("userName");
    };

    /**
     * 获得公司id
     * @returns {*}
     */
    userInfoUtil.getCorpId = function () {
        return userInfoUtil.getByKey("corpId");
    };

    /**
     * 获得任务id
     * @returns {*}
     */
    userInfoUtil.getTaskId = function () {
        return userInfoUtil.getByKey("taskId");
    };

    /**
     * 获得会计年
     */
    userInfoUtil.getAcctYear = function () {
        return userInfoUtil.getByKey("acctYear");
    };

    /**
     * 获得会计月
     */
    userInfoUtil.getAcctPeriod = function () {
        return userInfoUtil.getByKey("acctPeriod");
    };

    /**
     * GST 是否启用
     * @returns {*}
     */
    userInfoUtil.getGstEnabled = function () {
        return userInfoUtil.getByKey("gstEnabled");
    };

	/**
	 * GST场景是否启用
	 * @returns {*}
	 */
	userInfoUtil.getScenarioControl = function(){
    	return userInfoUtil.getByKey("scenarioControl");
	};

    /**
     * 是否启用库存
     * @returns {*}
     */
    userInfoUtil.getStockEnabled = function () {
        return userInfoUtil.getByKey("stockEnabled");
    };

	/**
	 * 是否启用开票 add by zhangyx on 2017-10-24
	 * @returns {*}
	 */
	userInfoUtil.getInvoicingEnabled = function () {
		return userInfoUtil.getByKey("invoicingEnabled");
	};

    /**
     * 国别编码
     * @returns {*}
     */
    userInfoUtil.getCountryCode = function () {
        return userInfoUtil.getByKey("countryCode");
    };

    /**
     * 打印控制
     * @returns {*}
     */
    userInfoUtil.getPrintControl = function () {
        return userInfoUtil.getByKey("printControl");
    };

    /**
     * 销售删改控制
     * @returns {*}
     */
    userInfoUtil.getSaleControl = function () {
        return userInfoUtil.getByKey("saleControl");
    };

    /**
     * 采购删改控制
     * @returns {*}
     */
    userInfoUtil.getPurchaseControl = function () {
        return userInfoUtil.getByKey("purchaseControl");
    };
    /**
     * 费用删改控制
     * @returns {*}
     */
    userInfoUtil.getExpenseControl = function () {
        return userInfoUtil.getByKey("expenseControl");
    };
    /**
     * 收入删改控制
     * @returns {*}
     */
    userInfoUtil.getIncomeControl = function () {
        return userInfoUtil.getByKey("incomeControl");
    };
    /**
     * 核销删改控制
     * @returns {*}
     */
    userInfoUtil.getWriteOffControl = function () {
        return userInfoUtil.getByKey("writeoffControl");
    };
    /**
     * 录分录删改控制
     * @returns {*}
     */
    userInfoUtil.getJournalControl = function () {
        return userInfoUtil.getByKey("journalControl");
    };
    /**
     * 是否是简易发票控制
     * @returns {*}
     */
    userInfoUtil.getIsSimplifiedControl = function () {
        return userInfoUtil.getByKey("isSimplifiedBilled");
    };
})();
