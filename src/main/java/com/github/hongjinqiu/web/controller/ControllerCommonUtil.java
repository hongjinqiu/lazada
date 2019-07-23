package com.github.hongjinqiu.web.controller;

import com.github.hongjinqiu.constant.LazadaConstant;
import com.github.hongjinqiu.util.CommonUtil;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;

public class ControllerCommonUtil {
    public static String getAccount(HttpServletRequest request) {
        return (String) request.getSession().getAttribute(LazadaConstant.ACCOUNT);
    }

    public static String getSessionInvalidUrl(HttpServletRequest request) {
        if (CommonUtil.isDev()) {
            request.getSession().setAttribute(LazadaConstant.ACCOUNT, "asctest8@mailinator.com");
            request.getSession().setAttribute(LazadaConstant.ACCESS_TOKEN, "ACCESS_TOKEN");
        }
        String account = (String) request.getSession().getAttribute(LazadaConstant.ACCOUNT);
        if (StringUtils.isEmpty(account)) {
            return "redirect:https://sellercenter.lazada.com.my/seller/login";
        }
        return null;
    }
}
