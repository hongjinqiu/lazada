/**
 *  依赖jQuery
 *  TODO:两个 cookie-util.js 一模一样,修改后要同步
 */
var cookieUtil = {

    CACHE_SESSION_ID: "CACHESESSIONID",

    J_SESSION_ID: "JSESSIONID",

    /**
     * 取全局
     */
    cacheSessionId: App.cacheSessionId,

    /**
     * 取全局
     */
    multiSession: App.multiSession,

    /**
     * 私有
     */
    _jSessionIdArray: null,

    /**
     *
     * @returns {*}
     */
    setJSessionIdArray: function (arr) {
        //当前页面如果是 iframe 打开,那么top 就是parent 的window
        //如果当前页面是独立窗口打开,那么top就是当前页面的window
        if (top && top.cookieUtil && $.isArray(top.cookieUtil._jSessionIdArray)) {
            top.cookieUtil._jSessionIdArray = arr;
        } else {
            cookieUtil._jSessionIdArray = arr;
        }
    },

    /**
     *
     * @returns {*}
     */
    getJSessionIdArray: function () {
        //当前页面如果是 iframe 打开,那么top 就是parent 的window
        //如果当前页面是独立窗口打开,那么top就是当前页面的window
        return (top && top.cookieUtil && $.isArray(top.cookieUtil._jSessionIdArray)) ? top.cookieUtil._jSessionIdArray : [];
    },

    /**
     *
     * @returns {Array}
     */
    initJsessionIds: function () {
        if (cookieUtil.multiSession) {
            var name = cookieUtil.J_SESSION_ID + "=", cookies = document.cookie.split(';'),
                _jsessionid = [], cookie, i;
            for (i = 0; i < cookies.length; i++) {
                cookie = cookies[i];
                while (cookie.charAt(0) == ' ') cookie = cookie.substring(1);
                if (cookie.indexOf(name) >= 0) {
                    _jsessionid.push(cookie.substring(name.length, cookie.length));
                }
            }
            cookieUtil.setJSessionIdArray(_jsessionid);
        }
    },

    resetCookies: function () {
        if (cookieUtil.multiSession) {
            var arr = cookieUtil.getJSessionIdArray();

            cookieUtil.removeCookies();
            cookieUtil.setCookie(cookieUtil.CACHE_SESSION_ID, cookieUtil.cacheSessionId);
            if (arr && arr.length > 0) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i] != null && arr[i] != '') {
                        cookieUtil.setCookie(cookieUtil.J_SESSION_ID, arr[i]);
                    }
                }
            }
        }
    },

    setCookie: function (cName, cValue, expiresDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        if (expiresDays) {
            document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
        } else {
            document.cookie = cName + "=" + cValue + "; path=/";
        }
    },

    removeCookie: function (name) {
        cookieUtil.setCookie(name, "", -1);
    },

    removeCookies: function () {
        if (cookieUtil.multiSession) {
            cookieUtil.removeCookie(cookieUtil.CACHE_SESSION_ID);
            cookieUtil.removeCookie(cookieUtil.J_SESSION_ID);
        }
    },

	/**
	 * 清除域名下的所有cookie（session超时、主动退出使用）add by ccliang 20180224
	 */
	removeDomainCookies:function(){
		var names =[cookieUtil.J_SESSION_ID,cookieUtil.CACHE_SESSION_ID];
		var paths = ['/', App.contextPath];
		var expires = new Date(0).toUTCString();
		for(var j=0;j<names.length;j++){
			document.cookie = names[j] + '=; expires=' + expires;
			for (var i = 0, l = paths.length; i < l; i++) {
				document.cookie = names[j] + '=; path=' + paths[i] + '; expires=' + expires;
			}
		}
	},

    getCookie: function (cName) {
        var name = cName + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
};