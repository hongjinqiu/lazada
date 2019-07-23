package com.github.hongjinqiu;

import com.github.hongjinqiu.util.FileUtils;
import com.hongjinqiu.pdfservice.PrintmetaInterpreterService;
import com.lazada.lazop.api.LazopClient;
import com.lazada.lazop.api.LazopRequest;
import com.lazada.lazop.api.LazopResponse;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import org.apache.tomcat.util.http.fileupload.IOUtils;

import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.SimpleScriptContext;
import java.io.File;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Test {
    private static String url = "https://api.lazada.com.my/rest";
    private static String appkey = "109861";
    private static String appSecret = "CpJhsbUdgwpPyvsuoRJlq92zbpshCCrL";

    /**
     * 正常的accessToken 结构,
     * {"access_token":"50000400125bjXwUpCdwzIxEjlQxmseadIuDj134bcb9atasrCfbAv8NPj8Xu","country":"my","refresh_token":"50001400c25sugApxPsgDdm1eJSbrrhYGDqem118fb239vudiDSgVjvVhSS05","account_platform":"seller_center","refresh_expires_in":2592000,"country_user_info":[{"country":"my","user_id":"69904","seller_id":"33747","short_code":"MY10RVM"}],"expires_in":604800,"account":"asctest8@mailinator.com","code":"0","request_id":"0ba9f84415579064983495523"}
     * 异常的 accessToken 结构
     * @param code
     * @throws Exception
     */
    public static void getAccessToken(String code) throws Exception {
        LazopClient client = new LazopClient("https://auth.lazada.com/rest", appkey, appSecret);
        LazopRequest request = new LazopRequest("/auth/token/create");
        request.addApiParameter("code", code);
        LazopResponse response = client.execute(request);
        System.out.println(response.getBody());
    }

    /**
     * 订单结构
     * {"data":{"voucher":0.00,"customer_first_name":"D**** ","order_number":346928836,"created_at":"2016-09-25 15:14:34 +0800","voucher_code":"","gift_option":false,"shipping_fee":0.00,"customer_last_name":"","updated_at":"2019-05-09 18:47:41 +0800","promised_shipping_times":"","items_count":1,"price":"1.00","delivery_info":"","statuses":["delivered"],"address_billing":{"country":"Malaysia","address3":"S******r","address2":"","city":"Petaling Jaya","phone":"01******86","address1":"N***************************************************L","post_code":"47400","phone2":"","last_name":"","address5":"4***0","address4":"P***********a","first_name":"D**** "},"national_registration_number":"","extra_attributes":"{\"TaxInvoiceRequested\":false}","order_id":6639637,"gift_message":"","payment_method":"COD","remarks":"","address_shipping":{"country":"Malaysia","address3":"S******r","address2":"","city":"Petaling Jaya","phone":"01******86","address1":"N***************************************************L","post_code":"47400","phone2":"","last_name":"","address5":"4***0","address4":"P***********a","first_name":"D**** "}},"code":"0","request_id":"0b8fda7b15579068378521186"}
     * @param accessToken
     * @throws Exception
     */
    public static void getOrderTest(String accessToken) throws Exception {
        LazopClient client = new LazopClient(url, appkey, appSecret);
        LazopRequest request = new LazopRequest();
        request.setApiName("/order/get");
        request.setHttpMethod("GET");
        request.addApiParameter("order_id", "346928836");
//        String accessToken="50000401037pjlqbabi0HMwhtQFYbdu5PUuDhhKhyDzsji1lM192916f5e6B5";
        LazopResponse response = client.execute(request, accessToken);
        System.out.println(response.getBody());
    }

    /**
     * 结构
     * {"data":[{"paid_price":1.00,"product_main_image":"https://my-live-03.slatic.net/p/test-sku-please-do-not-place-orders-live-sku-7104-21475141-70bdb87757ae8e8e9f777c69bf3edeff-catalog.jpg","tax_amount":0.00,"voucher_platform":0,"reason":"","product_detail_url":"https://www.lazada.com.my/14157412.html","promised_shipping_time":"","purchase_order_id":"","voucher_seller":0,"shipping_type":"Dropshipping","created_at":"2016-09-25 15:14:34 +0800","voucher_code":"","package_id":"OP055911419509","variation":"","updated_at":"2019-05-09 18:47:41 +0800","purchase_order_number":"","currency":"MYR","shipping_provider_type":"standard","sku":"ASC Test 8 Live - HL/King","invoice_number":"3","cancel_return_initiator":"","shop_sku":"OE702HLAA8FFXGANMY-17933918","is_digital":0,"item_price":1.00,"shipping_service_cost":0,"tracking_code_pre":"","tracking_code":"MPDS-346928836-2732","shipping_amount":0.00,"order_item_id":10933454,"reason_detail":"","shop_id":"Chris","return_status":"","name":"Test SKU (Please DO NOT place orders) - ASC Test 1 Live - HL","shipment_provider":"LEX MY","voucher_amount":0.00,"digital_delivery_info":"","extra_attributes":"","order_id":1408089606159,"status":"delivered"}],"code":"0","request_id":"0ba9636315579102034436378"}
     * @param accessToken
     * @throws Exception
     */
    public static void getOrderItemsTest(String accessToken) throws Exception {
        LazopClient client = new LazopClient(url, appkey, appSecret);
        LazopRequest request = new LazopRequest();
        request.setApiName("/order/items/get");
        request.setHttpMethod("GET");
        request.addApiParameter("order_id", "346928836");
        LazopResponse response = client.execute(request, accessToken);
        System.out.println(response.getBody());
    }

    /**
     * 结构
     * {"data":{"document":{"file":"P**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************=","mime_type":"text/html","document_type":"invoice"}},"code":"0","request_id":"0b86d3f115579102038496313"}
     * @param accessToken
     * @throws Exception
     */
    public static void getDocument(String accessToken) throws Exception {
        LazopClient client = new LazopClient(url, appkey, appSecret);
        LazopRequest request = new LazopRequest();
        request.setApiName("/order/document/get");
        request.setHttpMethod("GET");
        request.addApiParameter("doc_type", "invoice");
        request.addApiParameter("order_item_ids", "[10933454]");
        LazopResponse response = client.execute(request, accessToken);
        System.out.println(response.getBody());
    }

    private static void pdfTest() throws Exception {
        PrintmetaInterpreterService printmetaInterpreterService = new PrintmetaInterpreterService();
        Map<String, Object> env = new HashMap<String, Object>(){
            {
                put("amountPrecision", "2");
                put("numberPrecision", "0");
                put("unitPricePrecision", "2");
            }
        };
        {
            Map<String, Object> printConfigTemplate = new HashMap<String, Object>();
            printConfigTemplate.put("fontSize", "0");
            printConfigTemplate.put("fontFamily", "Arial");
            env.put("printConfigTemplate", printConfigTemplate);
        }
        String fileName = "lazada";
        InputStream in = null;
        try {
            in = Test.class.getResourceAsStream("/templates/printconfig/{fileName}.xml".replace("{fileName}", fileName));
            String xmlText = FileUtils.readText(in);
            xmlText = xmlText.replaceAll("\r", "");
            xmlText = xmlText.replaceAll("\n", "");
            xmlText = xmlText.replaceAll("'", "&apos;");
            byte[] bytes = printmetaInterpreterService.interpreterString(xmlText, env);
            org.apache.commons.io.FileUtils.writeByteArrayToFile(new File("E:\\hongjinqiu\\tmp\\tmp\\lazada.pdf"), bytes);
        } finally {
            IOUtils.closeQuietly(in);
        }
    }

    private static void dateTest() throws Exception {
        Date date = new Date();
//        "2019-02-24T16:00:00+08:00"
//        "2019-05-24T11:40:41+08:00"
//        2019-05-24T05:41:18+02:00
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX");
//        sdf.setTimeZone(TimeZone.getTimeZone("CET"));
        {
            String text = sdf.format(date);
            System.out.println("text is:" + text);
        }
        {
            Date date2 = sdf.parse("2019-05-24T11:40:41+08:00");
            System.out.println("date2 is:" + date2);
        }
    }

    private static void testScript() throws Exception {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("nashorn");
        ScriptContext scriptContext = new SimpleScriptContext();
        String functionString = "function tmpF(){var firstName=\"First Name\";var lastName=\"Last Name\";var bottomCls=\"tl tdBorderBottomCls1\";var colspanCount=6;var unitPricePrecision=\"2\";var printConfigTemplate={\"templateType\":\"\",\"no\":\"1\",\"fileName\":\"standard\",\"roundingFlag\":\"\",\"orderNumber\":\"1\",\"orderDateHtml\":\"\",\"shopSKUWidth\":\"24\",\"templateId\":\"5\",\"productName\":\"1\",\"fontFamily\":\"Arial Unicode MS\",\"taxInvoice\":\"1\",\"paper\":\"A4\",\"price\":\"1\",\"noWidth\":\"4\",\"totalChecked\":\"1\",\"headerPhoneHtml\":\"\",\"invoiceNumber\":\"1\",\"headerAddress\":\"1\",\"netPaidChecked\":\"1\",\"headerPhone\":\"1\",\"invoiceTo\":\"1\",\"sellerSKU\":\"1\",\"headerAddressHtml\":\"\",\"productNameWidth\":\"38\",\"invoiceDateHtml\":\"\",\"invoiceNumberHtml\":\"\",\"shippingChecked\":\"1\",\"taxInvoiceHtml\":\"\",\"headerName\":\"1\",\"voucherAppliedChecked\":\"1\",\"sellerSKUWidth\":\"18\",\"subtotalChecked\":\"1\",\"invoiceDate\":\"1\",\"headerNameHtml\":\"\",\"orderNumberHtml\":\"\",\"priceWidth\":\"8\",\"remarkCheckedHtml\":\"\",\"columnWidthSetting\":\"1\",\"paidPriceWidth\":\"8\",\"paidPrice\":\"1\",\"itemInfoChecked\":\"1\",\"fontFamilyName\":\"Arial\",\"shopSKU\":\"1\",\"templateName\":\"3333\",\"invoiceToHtml\":\"\",\"remarkChecked\":\"1\",\"orderDate\":\"1\"};var formatFunc={\"unitPrice\":{},\"num\":{},\"amt\":{}};var amountPrecision=\"2\";var numberPrecision=\"2\";var order={\"currencyShow\":\"SGB\",\"voucher\":\"0.00\",\"order_number\":\"300034416\",\"created_at\":\"2014-10-15 18:36:05 +0800\",\"voucher_code\":\"3432\",\"gift_option\":\"0\",\"itemLi\":[1,2,3],\"paid_price_sum\":\"2.00\",\"created_at_show\":\"15 Oct 2014\",\"customer_last_name\":\"last_name\",\"updated_at\":\"2014-10-15 18:36:05 +0800\",\"promised_shipping_times\":\"2017-03-24 16:09:22\",\"price\":\"99.00\",\"national_registration_number\":\"1123\",\"payment_method\":\"COD\",\"invoice_date_show\":\"04 Jue 2019\",\"customer_first_name\":\"First Name\",\"shipping_fee\":\"0.00\",\"branch_number\":\"2222\",\"tax_code\":\"1234\",\"paid_price_voucher_sum\":\"2.00\",\"items_count\":\"1\",\"delivery_info\":\"1\",\"statuses\":\"delivered\",\"address_billing\":{\"country\":\"Singapore\",\"address3\":\"address3\",\"address2\":\"address2\",\"city\":\"Singapore-Central\",\"phone\":\"81***8\",\"address1\":\"22 leonie hill road, #13-01\",\"post_code\":\"239195\",\"phone2\":\"24***22\",\"last_name\":\"Last Name\",\"address5\":\"address5\",\"address4\":\"address4\",\"first_name\":\"First Name\"},\"extra_attributes\":\"{\\\"TaxInvoiceRequested\\\":\\\"true\\\"}\",\"order_id\":\"16090\",\"gift_message\":\"Gift\",\"remarks\":\"remarks\",\"address_shipping\":{\"country\":\"Singapore\",\"address3\":\"address3\",\"address2\":\"address2\",\"city\":\"Singapore-Central\",\"phone\":\"94236248\",\"address1\":\"318 tanglin road, phoenix park, #01-59\",\"post_code\":\"247979\",\"phone2\":\"1******2\",\"last_name\":\"Last Name\",\"address5\":\"1******2\",\"address4\":\"address4\",\"first_name\":\"First Name\"}};return [{name: 'name', age: 1}];}tmpF()";
//        List obj = (List)engine.eval(functionString.toString(), scriptContext);
        Object obj = engine.eval(functionString.toString(), scriptContext);
        ScriptObjectMirror scriptObjectMirror = (ScriptObjectMirror)obj;
        System.out.println(scriptObjectMirror.getClassName());
        System.out.println(scriptObjectMirror.to(List.class));
        List list = scriptObjectMirror.to(List.class);
        System.out.println("list.0.class is:" + list.get(0).getClass().getName());
        System.out.println(obj.getClass().getName());
        /*
        List<Object> list = obj.to(List.class);
        System.out.println(list);
        */
    }

    public static void main(String[] args) throws Exception {
//        getAccessToken("0_109861_vhdp0eMi96odex5dLPPH3SAk4345");
//        getOrderTest("50000400125bjXwUpCdwzIxEjlQxmseadIuDj134bcb9atasrCfbAv8NPj8Xu");
//        getOrderItemsTest("50000400125bjXwUpCdwzIxEjlQxmseadIuDj134bcb9atasrCfbAv8NPj8Xu");
//        getDocument("50000400125bjXwUpCdwzIxEjlQxmseadIuDj134bcb9atasrCfbAv8NPj8Xu");
//        dateTest();
//        pdfTest();
        testScript();
    }
}
