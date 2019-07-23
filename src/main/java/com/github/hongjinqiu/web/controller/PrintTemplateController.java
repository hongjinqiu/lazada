package com.github.hongjinqiu.web.controller;

import com.github.hongjinqiu.constant.LazadaConstant;
import com.github.hongjinqiu.exception.LazadaException;
import com.github.hongjinqiu.web.service.PrintTemplateService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * 模板列表,
 */
@Controller
@RequestMapping("/setting")
public class PrintTemplateController {
    @Autowired
    private PrintTemplateService printTemplateService;

    @RequestMapping("/setting.htm")
    public String setting(HttpServletRequest request, HttpServletResponse response, Model model) {
        String url = ControllerCommonUtil.getSessionInvalidUrl(request);
        if (StringUtils.isNotEmpty(url)) {
            return url;
        }
        return "setting";
    }

    /**
     * 取得打印列表
     * @param request
     * @return
     */
    @RequestMapping("/templatesGet.json")
    @ResponseBody
    public Map<String, Object> templatesGet(HttpServletRequest request) {
        String url = ControllerCommonUtil.getSessionInvalidUrl(request);
        if (StringUtils.isNotEmpty(url)) {
            throw new LazadaException("Session Invalid, Please re login!");
        }
        Enumeration<String> parameterNames = request.getParameterNames();
        Map<String, Object> parameters = new HashMap<>();
        while (parameterNames.hasMoreElements()) {
            String key = parameterNames.nextElement();
            parameters.put(key, request.getParameter(key));
        }

        String account = (String)request.getSession().getAttribute(LazadaConstant.ACCOUNT);
        Map<String, Object> result = printTemplateService.printTemplatesGet(account, parameters);
        return result;
    }

    @RequestMapping("/templateDelete.json")
    @ResponseBody
    public void templateDelete(HttpServletRequest request, @RequestParam String id) {
        String url = ControllerCommonUtil.getSessionInvalidUrl(request);
        if (StringUtils.isNotEmpty(url)) {
            throw new LazadaException("Session Invalid, Please re login!");
        }
        String account = (String)request.getSession().getAttribute(LazadaConstant.ACCOUNT);
        printTemplateService.deletePrintTemplate(account, id);
    }
}
