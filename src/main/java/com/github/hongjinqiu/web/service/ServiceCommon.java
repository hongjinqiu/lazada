package com.github.hongjinqiu.web.service;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.Map;

public class ServiceCommon {
    public Integer getPage(Map<String, Object> parameters) {
        String page = ObjectUtils.toString(parameters.get("page"), "");
        if (StringUtils.isEmpty(page)) {
            page = "1";
        }
        return Integer.valueOf(page);
    }

    public Integer getRows(Map<String, Object> parameters) {
        String rows = ObjectUtils.toString(parameters.get("rows"), "");
        if (StringUtils.isEmpty(rows)) {
            rows = "10";
        }
        return Integer.valueOf(rows);
    }
}
