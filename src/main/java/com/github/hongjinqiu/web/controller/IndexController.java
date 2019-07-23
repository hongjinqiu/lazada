package com.github.hongjinqiu.web.controller;

import com.github.hongjinqiu.constant.LazadaConstant;
import com.github.hongjinqiu.exception.LazadaException;
import com.github.hongjinqiu.util.LazadaUtil;
import com.github.hongjinqiu.web.model.PrintTemplateVO;
import com.github.hongjinqiu.web.service.OrderService;
import com.github.hongjinqiu.web.service.PrintTemplateService;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 首页,列表展示,取企业信息等
 */
@Controller
public class IndexController {
//    @Autowired
//    private CorpSettingService corpSettingService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private PrintTemplateService printTemplateService;

    /**
     * 首页数据展示
     * @param request
     * @param response
     * @param model
     * @return
     */
    @RequestMapping("/")
    public String index(HttpServletRequest request, HttpServletResponse response, Model model) {
        String url = ControllerCommonUtil.getSessionInvalidUrl(request);
        if (StringUtils.isNotEmpty(url)) {
            return url;
        }
        return "index";
    }

    /**
     * 获取订单列表
     * @param request
     * @return
     */
    @RequestMapping("/ordersGet.json")
    @ResponseBody
    public Map<String, Object> ordersGet(HttpServletRequest request) {
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

        String accessToken = (String)request.getSession().getAttribute(LazadaConstant.ACCESS_TOKEN);
        Map<String, Object> result = orderService.ordersGet(accessToken, parameters);
        return result;
    }

    @RequestMapping("/exit.htm")
    /*@ResponseBody*/
    public String exit(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:https://sellercenter.lazada.com.my/seller/login";
    }

    @RequestMapping("/callback")
    public String callback(HttpServletRequest request) {
        String code = request.getParameter("code");

//        String accessToken = LazadaUtil.getAccessToken(code);
        JSONObject jsonObject = LazadaUtil.getAccessToken(code);
        String accessToken = jsonObject.getString("access_token");
        String account = jsonObject.getString("account");
        request.getSession().setAttribute(LazadaConstant.ACCOUNT, account);
        request.getSession().setAttribute(LazadaConstant.ACCESS_TOKEN, accessToken);
        return "redirect:/";
    }

    @RequestMapping("/getPrintTemplate.json")
    @ResponseBody
    public Map<String, Object> getPrintTemplate(HttpServletRequest request) {
        String url = ControllerCommonUtil.getSessionInvalidUrl(request);
        if (StringUtils.isNotEmpty(url)) {
            throw new LazadaException("Session Invalid, Please re login!");
        }

        String account = ControllerCommonUtil.getAccount(request);
        Map<String, Object> result = new HashMap<>();
        List<PrintTemplateVO> printTemplateVOS = printTemplateService.printTemplatesGetForPrint(account);
        result.put("success", true);
        result.put("corpTemplates", printTemplateVOS);
        return result;
    }
}
