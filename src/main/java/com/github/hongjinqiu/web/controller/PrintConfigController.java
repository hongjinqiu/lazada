package com.github.hongjinqiu.web.controller;

import com.github.hongjinqiu.constant.LazadaConstant;
import com.github.hongjinqiu.exception.LazadaException;
import com.github.hongjinqiu.util.DateUtil;
import com.github.hongjinqiu.util.FileUtils;
import com.github.hongjinqiu.util.JSONUtil;
import com.github.hongjinqiu.util.LazadaUtil;
import com.github.hongjinqiu.web.model.PrintConfigVO;
import com.github.hongjinqiu.web.model.PrintTemplateVO;
import com.github.hongjinqiu.web.service.PrintTemplateService;
import com.hongjinqiu.pdfservice.PrintmetaInterpreterService;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 模板列表,
 */
@Controller
@RequestMapping("/printConfig")
public class PrintConfigController {
    private Logger logger = Logger.getLogger(getClass());
    private static final String CONTENT_DISPOSITION_HEADER_NAME = "Content-Disposition";

    @Autowired
    private PrintTemplateService printTemplateService;

    /**
     * 模板带配置项的设置页
     */
    @RequestMapping("/gotoPrintConfigPage.htm")
    public String gotoPrintConfigPage(HttpServletRequest request, HttpServletResponse response, Model model) {
        String url = ControllerCommonUtil.getSessionInvalidUrl(request);
        if (StringUtils.isNotEmpty(url)) {
            throw new LazadaException("Session Invalid, Please re login!");
        }
        String templateId = request.getParameter("id");
        if (StringUtils.isEmpty(templateId)) {
            templateId = LazadaConstant.STANDARD_TEMPLATE_ID;
        }
        request.setAttribute("templateId", templateId);

        String createUser = ControllerCommonUtil.getAccount(request);
        if (templateId.equals(LazadaConstant.STANDARD_TEMPLATE_ID)) {
            createUser = null;
        }
        List<PrintConfigVO> printConfigVOS = printTemplateService.getPrintConfig(templateId, createUser);
        request.setAttribute("configs", printConfigVOS);

        return "printconfig/printConfig";
    }

    /**
     * iframe 中的效果展示页
     */
    @RequestMapping("/gotoConfigResultPage.htm")
    public String gotoConfigResultPage(HttpServletRequest request, HttpServletResponse response, Model model) {
        String url = ControllerCommonUtil.getSessionInvalidUrl(request);
        if (StringUtils.isNotEmpty(url)) {
            throw new LazadaException("Session Invalid, Please re login!");
        }
//        String fileName = getFileName(printT.getTemplateType());
        String fileName = "lazada";

        InputStream in = null;
        try {
            // resources目录下的相对路径
            in = this.getClass().getResourceAsStream("/templates/printconfig/{fileName}.xml".replace("{fileName}", fileName));
            String xmlText = FileUtils.readText(in);
            xmlText = xmlText.replaceAll("\r", "");
            xmlText = xmlText.replaceAll("\n", "");
            xmlText = xmlText.replaceAll("'", "&apos;");
            model.addAttribute("xmlText", xmlText);
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
            throw new LazadaException(e);
        } finally {
            IOUtils.closeQuietly(in);
        }
        return "printconfig/lazada";
    }

    /**
     * 元数据打印生成 pdf
     * @param id
     * @param orderId
     * @param request
     * @param response
     */
    @RequestMapping("/metaPrint.htm")
    public void metaPrint(@RequestParam String id, @RequestParam String orderId, HttpServletRequest request, HttpServletResponse response) {
        try {
            String templateId = id;
            String createUser = ControllerCommonUtil.getAccount(request);
            if (templateId.equals(LazadaConstant.STANDARD_TEMPLATE_ID)) {
                createUser = null;
            }
            List<PrintConfigVO> printConfigVOS = printTemplateService.getPrintConfig(templateId, createUser);
            Map<String, Object> printConfigTemplate = new HashMap<>();
            for (PrintConfigVO printConfigVO: printConfigVOS) {
                printConfigTemplate.put(printConfigVO.getConfigItem(), printConfigVO.getConfigValue());
            }

            Map<String, Object> pdfMap = new HashMap<>();
            pdfMap.put("amountPrecision", "2");
            pdfMap.put("numberPrecision", "0");
            pdfMap.put("unitPricePrecision", "2");

            pdfMap.put("printConfigTemplate", printConfigTemplate);

            String accessToken = (String)request.getSession().getAttribute(LazadaConstant.ACCESS_TOKEN);
            JSONObject order = LazadaUtil.orderGet(accessToken, orderId);
            JSONObject itemObj = LazadaUtil.orderItemsGet(accessToken, orderId);
            JSONArray itemLi = itemObj.getJSONArray("data");
            String currencyShow = "SGB";
            BigDecimal paid_price_sum = BigDecimal.ZERO;
            BigDecimal voucher = BigDecimal.ZERO;
            if (itemLi != null && itemLi.length() > 0) {
                currencyShow = itemLi.getJSONObject(0).getString("currency");
                for (int i= 0; i < itemLi.length(); i++) {
                    JSONObject jsonObject = itemLi.getJSONObject(i);
                    String paid_price = jsonObject.get("paid_price").toString();
                    if (StringUtils.isEmpty(paid_price)) {
                        paid_price = "0";
                    }
                    paid_price_sum = paid_price_sum.add(new BigDecimal(paid_price));
                }
                String voucherStr = order.get("voucher").toString();
                if (StringUtils.isEmpty(voucherStr)) {
                    voucherStr = "0";
                }
                voucher = new BigDecimal(voucherStr);
            }
            order.put("itemLi", itemLi.toList());
            String created_at = (String)order.get("created_at");

            String created_at_show = DateUtil.getDateForShow(created_at);
            order.put("created_at_show", created_at_show);

            String invoice_date_show = DateUtil.getLazadaShowFormat(new Date());
            order.put("invoice_date_show", invoice_date_show);

            order.put("currencyShow", currencyShow);
            order.put("paid_price_sum", paid_price_sum.toString());
            order.put("paid_price_voucher_sum", paid_price_sum.add(voucher).toString());
            pdfMap.put("order", order.toMap());
            pdfMap.put("isCustomerConfig", "0");
            {
//                String fileName = getFileName(printT.getTemplateType());
                String fileName = "lazada";
                String xmlText;
                InputStream in = null;
                try {
                    // resources目录下的相对路径
                    in = this.getClass().getResourceAsStream("/templates/printconfig/{fileName}.xml".replace("{fileName}", fileName));
                    xmlText = FileUtils.readText(in);
                    xmlText = xmlText.replaceAll("\r", "");
                    xmlText = xmlText.replaceAll("\n", "");
                    xmlText = xmlText.replaceAll("'", "&apos;");
                } catch (IOException e) {
                    throw new LazadaException(e);
                } finally {
                    IOUtils.closeQuietly(in);
                }

                // pdfMap 中的 docBillVo, 传到 pdf-service 中后，变成: "m_headVo": {}, 因此,重新用 json2Object 包装一遍,
                PrintmetaInterpreterService printmetaInterpreterService = new PrintmetaInterpreterService();
                byte[] pdfArray = printmetaInterpreterService.interpreterString(xmlText, pdfMap);
                try {
                    String reportName = order.get("order_number").toString();
                    String download = request.getParameter("download");
                    if ("true".equals(download)) {
                        loadFile(pdfArray, reportName + ".pdf", response);
                    } else {
                        openPdfInBrowserByBytes(pdfArray, reportName, response);
                    }
                } catch (Exception e) {
                    logger.error(e.getMessage(), e);
                    throw new LazadaException(e);
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new LazadaException(e);
        }
    }

    private void openPdfInBrowserByBytes(byte[] files, String showName, HttpServletResponse res) throws IOException {
        OutputStream os = res.getOutputStream();
        try {
            res.reset();
            res.setContentType("application/pdf; charset=utf-8");
            res.setHeader(CONTENT_DISPOSITION_HEADER_NAME, "inline; filename=" + showName +".pdf;charset=utf-8");
            os.write(files);
            os.flush();
        } finally {
            if (os != null) {
                os.close();
            }
            //防止请求两次报错，在此处加上1秒钟休眠，不影响原来pdf加载。modify by huanglb at 2016-03-28
            /*try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                logger.error(e.getMessage(), e);
                Thread.currentThread().interrupt();
            }*/
        }
    }

    /**
     * 文件下载
     */
    private void loadFile(byte[] files, String showName, HttpServletResponse res) throws IOException {
        OutputStream os = res.getOutputStream();
        try {
            res.reset();
            res.setHeader(CONTENT_DISPOSITION_HEADER_NAME, "attachment; filename=" + showName + ";charset=utf-8");
            res.setContentType("application/octet-stream; charset=utf-8");
            os.write(files);
            os.flush();
        } finally {
            if (os != null) {
                os.close();
            }
        }
    }

    /**
     * 模板设置页的配置项保存
     */
    @RequestMapping("/save.json")
    @ResponseBody
    public Map<String, Object> save(@RequestParam String printConfigLi, @RequestParam String printTemplateVo, HttpServletRequest request) {
        String url = ControllerCommonUtil.getSessionInvalidUrl(request);
        if (StringUtils.isNotEmpty(url)) {
            throw new LazadaException("Session Invalid, Please re login!");
        }
        List<Long> systemTemplateIdLi = new ArrayList<>();
        systemTemplateIdLi.add(Long.valueOf(LazadaConstant.STANDARD_TEMPLATE_ID));
        PrintTemplateVO printTemplateVoObj = JSONUtil.stringToBean(printTemplateVo, PrintTemplateVO.class);
        List<PrintConfigVO> printConfigVOS = JSONUtil.stringToList(printConfigLi, PrintConfigVO.class);

        String timeInDb = DateUtil.convertDateToString(new Date(), LazadaConstant.DB_FORMAT_FOR_DATE);

        printTemplateVoObj.setCreateUser(ControllerCommonUtil.getAccount(request));
        printTemplateVoObj.setUpdateTime(timeInDb);

        for (PrintConfigVO printConfigVO: printConfigVOS) {
            printConfigVO.setCreateTime(timeInDb);// 子项全增全删,因此,要设置 createTime,
            printConfigVO.setCreateUser(ControllerCommonUtil.getAccount(request));
            printConfigVO.setUpdateTime(timeInDb);
        }

        String templateId = null;
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        if (systemTemplateIdLi.contains(printTemplateVoObj.getId())) {// save
            printTemplateVoObj.setCreateTime(timeInDb);
            templateId = printTemplateService.insertPrintConfig(printTemplateVoObj, printConfigVOS);
        } else {// edit
            printTemplateService.updatePrintConfig(printTemplateVoObj, printConfigVOS);
            templateId = String.valueOf(printTemplateVoObj.getId());
        }
        result.put("templateId", templateId);
        return result;
    }

}
