package com.github.hongjinqiu.web.service;

import com.github.hongjinqiu.util.DateUtil;
import com.github.hongjinqiu.util.LazadaUtil;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
/*@Transactional*/
public class OrderService {
    /**
     * 获取订单
     * @param accessToken
     * @param parameters
     * @return
     */
    public Map<String, Object> ordersGet(String accessToken, Map<String, Object> parameters) {
        String createdBefore = (String)parameters.get("created_before");
        if (StringUtils.isNotEmpty(createdBefore)) {
            if (createdBefore.length() == 10) {
                Date date = DateUtil.parseDate(createdBefore + " 23:59:59", "MM/dd/yyyy HH:mm:ss");
                createdBefore = DateUtil.getISODateFormat(date);
            } else {
                createdBefore = "";
            }
        }
        String createdAfter = (String)parameters.get("created_after");
        // createdAfter 为空时要赋值,赋3个月前的值,
        if (StringUtils.isNotEmpty(createdAfter)) {
            if (createdAfter.length() == 10) {
                Date date = DateUtil.parseDate(createdAfter, "MM/dd/yyyy");
                createdAfter = DateUtil.getISODateFormat(date);
            } else {
                createdAfter = getDefaultCreatedAfter();
            }
        } else {
            createdAfter = getDefaultCreatedAfter();
        }

        String status = (String)parameters.get("status");
        ServiceCommon serviceCommon = new ServiceCommon();
        Integer page = serviceCommon.getPage(parameters);
        Integer rows = serviceCommon.getRows(parameters);
        String limit = String.valueOf(rows);
        String offset = String.valueOf((page - 1) * rows);
        JSONObject jsonObject = LazadaUtil.ordersGet(accessToken, createdBefore, createdAfter, status, limit, offset);
        JSONObject data = jsonObject.getJSONObject("data");
        List<Object> orders = data.getJSONArray("orders").toList();
        for (Object orderO: orders) {
            Map<String, Object> order = (Map<String, Object>)orderO;
            order.put("id", order.get("order_id"));
            {
                String created_at = (String)order.get("created_at");
                String created_at_show = getDateForShow(created_at);
                order.put("created_at_show", created_at_show);
            }
            {
                String updated_at = (String)order.get("updated_at");
                String updated_at_show = getDateForShow(updated_at);
                order.put("updated_at_show", updated_at_show);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("total", data.get("count"));
        result.put("rows", orders);
        return result;
    }

    private String getDefaultCreatedAfter() {
        String createdAfter;Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.MONTH, -3);
        createdAfter = DateUtil.getISODateFormat(calendar.getTime());
        return createdAfter;
    }

    /**
     * 接口返回的日期，有可能是:
     * 2019-05-23 12:22:12 +0800
     * 或
     * 2019-02-24T16:00:00+08:00
     * @param text
     * @return
     */
    private String getDateForShow(String text) {
        return DateUtil.getDateForShow(text);
    }
}
