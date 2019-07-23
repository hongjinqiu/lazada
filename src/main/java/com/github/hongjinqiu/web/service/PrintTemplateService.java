package com.github.hongjinqiu.web.service;

import com.github.hongjinqiu.util.DateUtil;
import com.github.hongjinqiu.util.LazadaUtil;
import com.github.hongjinqiu.web.model.PrintConfigVO;
import com.github.hongjinqiu.web.model.PrintTemplateVO;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
/*@Transactional*/
public class PrintTemplateService {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public Map<String, Object> printTemplatesGet(String account, Map<String, Object> parameters) {
        Map<String, Object> result = new HashMap<>();

        StringBuilder listSb = new StringBuilder();
        listSb.append(" select * from sys_print_template ");
        listSb.append(" where create_user=:account ");
        listSb.append(" order by update_time desc ");
        listSb.append(" limit :offset,:length ");

        ServiceCommon serviceCommon = new ServiceCommon();
        Integer page = serviceCommon.getPage(parameters);
        Integer rows = serviceCommon.getRows(parameters);

        Map<String, Object> sqlParam = new HashMap<>();
        sqlParam.put("account", account);
        sqlParam.put("offset", (page - 1) * rows);
        sqlParam.put("length", rows);

        List<Map<String, Object>> list = this.namedParameterJdbcTemplate.queryForList(listSb.toString(), sqlParam);

        StringBuilder countSb = new StringBuilder();
        countSb.append(" select count(*) from sys_print_template ");
        countSb.append(" where create_user=:account ");
        int count = this.namedParameterJdbcTemplate.queryForObject(countSb.toString(), sqlParam, Integer.class);

        List<PrintTemplateVO> printTemplateVOS = new ArrayList<>();
        for (Map<String, Object> item: list) {
            PrintTemplateVO printTemplateVO = new PrintTemplateVO();
            printTemplateVO.setId(Long.valueOf(item.get("ID").toString()));
            printTemplateVO.setTemplateName((String)item.get("TEMPLATE_NAME"));
            printTemplateVO.setCreateUser((String)item.get("CREATE_USER"));
            printTemplateVO.setCreateTime(getDateShowCommon((String)item.get("CREATE_TIME")));
            printTemplateVO.setUpdateTime(getDateShowCommon((String)item.get("UPDATE_TIME")));
            printTemplateVOS.add(printTemplateVO);
        }
        result.put("total", count);
        result.put("rows", printTemplateVOS);
        return result;
    }

    private String getDateShowCommon(String dateTime) {
        if (StringUtils.isNotEmpty(dateTime)) {
            Date date = DateUtil.parseDate(dateTime, "yyyyMMddHHmmss");
            return DateUtil.getLazadaShowFormat(date);
        }
        return null;
    }

    /**
     * 删除打印模版
     * @param account
     * @param id
     */
    public void deletePrintTemplate(String account, String id) {
        StringBuilder sb = new StringBuilder();
        sb.append(" delete from sys_print_template ");
        sb.append(" where id=:id ");
        sb.append(" and create_user=:account ");

        Map<String, Object> sqlParam = new HashMap<>();
        sqlParam.put("id", id);
        sqlParam.put("account", account);
        this.namedParameterJdbcTemplate.update(sb.toString(), sqlParam);
    }

    /**
     * 读取打印的配置
     */
    public List<PrintConfigVO> getPrintConfig(String templateId, String createUser) {
        StringBuilder listSb = new StringBuilder();
        listSb.append(" select * from sys_print_config ");
        listSb.append(" where template_id=:templateId ");
        if (StringUtils.isNotEmpty(createUser)) {
            listSb.append(" and create_user=:createUser ");
        }

        Map<String, Object> sqlParam = new HashMap<>();
        sqlParam.put("templateId", templateId);
        if (StringUtils.isNotEmpty(createUser)) {
            sqlParam.put("createUser", createUser);
        }

        List<Map<String, Object>> list = this.namedParameterJdbcTemplate.queryForList(listSb.toString(), sqlParam);

        List<PrintConfigVO> printConfigVOS = new ArrayList<>();
        for (Map<String, Object> item: list) {
            PrintConfigVO printConfigVO = new PrintConfigVO();
            printConfigVO.setId(Long.valueOf(item.get("ID").toString()));
            printConfigVO.setTemplateId(Long.valueOf(item.get("TEMPLATE_ID").toString()));
            printConfigVO.setConfigItem((String)item.get("CONFIG_ITEM"));
            printConfigVO.setConfigValue((String)item.get("CONFIG_VALUE"));
            printConfigVO.setCreateUser((String)item.get("CREATE_USER"));
            printConfigVO.setCreateTime((String)item.get("CREATE_TIME"));
            printConfigVO.setUpdateTime((String)item.get("UPDATE_TIME"));
            printConfigVOS.add(printConfigVO);
        }
        return printConfigVOS;
    }

    /**
     * 写入配置项
     * @param printTemplateVO
     * @param printConfigVOS
     * @return
     */
    public String insertPrintConfig(PrintTemplateVO printTemplateVO, List<PrintConfigVO> printConfigVOS) {
        StringBuilder mainSql = new StringBuilder();
        mainSql.append(" INSERT INTO `sys_print_template` (`id`, `template_name`, `create_user`, `is_system`, `create_time`, `update_time`) ");
        mainSql.append(" VALUES ");
        mainSql.append("  ('0', :templateName, :createUser, '0', :createTime, :updateTime) ");
        Map<String, Object> mainParam = new HashMap<>();
        mainParam.put("templateName", printTemplateVO.getTemplateName());
        mainParam.put("createUser", printTemplateVO.getCreateUser());
        mainParam.put("createTime", printTemplateVO.getCreateTime());
        mainParam.put("updateTime", printTemplateVO.getUpdateTime());
        this.namedParameterJdbcTemplate.update(mainSql.toString(), mainParam);

        Long templateId = this.jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Long.class);

        StringBuilder itemSql = new StringBuilder();
        itemSql.append(" INSERT INTO `sys_print_config` (`id`, `template_id`, `config_item`, `config_value`, `create_user`, `create_time`, `update_time`) ");
        itemSql.append(" VALUES ");
        itemSql.append("  ('0', :templateId, :configItem, :configValue, :createUser, :createTime, :updateTime) ");
        for (PrintConfigVO printConfigVO: printConfigVOS) {
            Map<String, Object> itemParam = new HashMap<>();
            itemParam.put("templateId", templateId);
            itemParam.put("configItem", printConfigVO.getConfigItem());
            itemParam.put("configValue", printConfigVO.getConfigValue());
            itemParam.put("createUser", printConfigVO.getCreateUser());
            itemParam.put("createTime", printConfigVO.getCreateTime());
            itemParam.put("updateTime", printConfigVO.getUpdateTime());
            this.namedParameterJdbcTemplate.update(itemSql.toString(), itemParam);
        }
        return String.valueOf(templateId);
    }

    /**
     * 编辑配置项,对子配置项,采用全删全增
     * @param printTemplateVO
     * @param printConfigVOS
     * @return
     */
    public void updatePrintConfig(PrintTemplateVO printTemplateVO, List<PrintConfigVO> printConfigVOS) {
        StringBuilder mainSql = new StringBuilder();
        mainSql.append(" update sys_print_template set template_name=:templateName, update_time=:updateTime ");
        mainSql.append(" where id=:id and create_user=:createUser ");
        Map<String, Object> mainParam = new HashMap<>();
        mainParam.put("templateName", printTemplateVO.getTemplateName());
        mainParam.put("updateTime", printTemplateVO.getUpdateTime());
        mainParam.put("id", printTemplateVO.getId());
        mainParam.put("createUser", printTemplateVO.getCreateUser());
        this.namedParameterJdbcTemplate.update(mainSql.toString(), mainParam);

        StringBuilder deleteSql = new StringBuilder();
        deleteSql.append(" delete from sys_print_config ");
        deleteSql.append(" where template_id=:templateId and create_user=:createUser ");
        Map<String, Object> deleteParam = new HashMap<>();
        deleteParam.put("templateId", printTemplateVO.getId());
        deleteParam.put("createUser", printTemplateVO.getCreateUser());
        this.namedParameterJdbcTemplate.update(deleteSql.toString(), deleteParam);

        StringBuilder itemSql = new StringBuilder();
        itemSql.append(" INSERT INTO `sys_print_config` (`id`, `template_id`, `config_item`, `config_value`, `create_user`, `create_time`, `update_time`) ");
        itemSql.append(" VALUES ");
        itemSql.append("  ('0', :templateId, :configItem, :configValue, :createUser, :createTime, :updateTime) ");
        for (PrintConfigVO printConfigVO: printConfigVOS) {
            Map<String, Object> itemParam = new HashMap<>();
            itemParam.put("templateId", printTemplateVO.getId());
            itemParam.put("configItem", printConfigVO.getConfigItem());
            itemParam.put("configValue", printConfigVO.getConfigValue());
            itemParam.put("createUser", printConfigVO.getCreateUser());
            itemParam.put("createTime", printConfigVO.getCreateTime());
            itemParam.put("updateTime", printConfigVO.getUpdateTime());
            this.namedParameterJdbcTemplate.update(itemSql.toString(), itemParam);
        }
    }

    /**
     * 首页点击打印后的弹窗,让用户可以选择模板
     * @param account
     * @return
     */
    public List<PrintTemplateVO> printTemplatesGetForPrint(String account) {
        Map<String, Object> result = new HashMap<>();

        StringBuilder listSb = new StringBuilder();
        listSb.append(" select * from sys_print_template ");
        listSb.append(" where id=1 ");
        listSb.append(" union ");
        listSb.append(" ( ");
        listSb.append(" select * from sys_print_template ");
        listSb.append(" where create_user=:account ");
        listSb.append(" order by update_time desc ");
        listSb.append(" ) ");

        Map<String, Object> parameter = new HashMap<>();
        parameter.put("account", account);
        List<Map<String, Object>> list = this.namedParameterJdbcTemplate.queryForList(listSb.toString(), parameter);

        List<PrintTemplateVO> printTemplateVOS = new ArrayList<>();
        for (Map<String, Object> item: list) {
            PrintTemplateVO printTemplateVO = new PrintTemplateVO();
            printTemplateVO.setId(Long.valueOf(item.get("ID").toString()));
            printTemplateVO.setTemplateName((String)item.get("TEMPLATE_NAME"));
            printTemplateVO.setCreateUser((String)item.get("CREATE_USER"));
            printTemplateVO.setCreateTime(getDateShowCommon((String)item.get("CREATE_TIME")));
            printTemplateVO.setUpdateTime(getDateShowCommon((String)item.get("UPDATE_TIME")));
            printTemplateVOS.add(printTemplateVO);
        }
        return printTemplateVOS;
    }
}
