package com.github.hongjinqiu.util;

import com.github.hongjinqiu.config.TaxPropConfig;

public class CommonUtil {
    public static boolean isDev() {
        TaxPropConfig taxPropConfig = (TaxPropConfig) SpringUtil.getBean("taxPropConfig");
        return taxPropConfig.getDev().equals("true");
    }
}
