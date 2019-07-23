package com.github.hongjinqiu.util;

import com.github.hongjinqiu.exception.LazadaException;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateUtil {
    private static Logger logger = Logger.getLogger(LazadaUtil.class);
    private static String ISO_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";
//    25 Sep 2016 15:14
    private static String LAZADA_DATE_SHOW_FORMAT = "dd MMM yyyy HH:mm";

    public static String convertDateToString(Date date, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(date);
    }

    public static String getISODateFormat(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(ISO_DATE_FORMAT);
//        sdf.setTimeZone(TimeZone.getTimeZone("CET"));
        return sdf.format(date);
    }

    public static Date parseISODate(String text) {
        SimpleDateFormat sdf = new SimpleDateFormat(ISO_DATE_FORMAT);
//        sdf.setTimeZone(TimeZone.getTimeZone("CET"));
        try {
            return sdf.parse(text);
        } catch (ParseException e) {
            logger.error(e.getMessage(), e);
            throw new LazadaException(e);
        }
    }

    public static Date parseDate(String text, String pattern) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        try {
            return sdf.parse(text);
        } catch (ParseException e) {
            logger.error(e.getMessage(), e);
            throw new LazadaException(e);
        }
    }

    public static String getLazadaShowFormat(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(LAZADA_DATE_SHOW_FORMAT, Locale.ENGLISH);
//        sdf.setTimeZone(TimeZone.getTimeZone("CET"));
        return sdf.format(date);
    }

    public static String getDateForShow(String text) {
        if (StringUtils.isNotEmpty(text)) {
            Date date;
            if (text.indexOf("T") > 0) {
                date = DateUtil.parseISODate(text);
            } else {
                date = DateUtil.parseDate(text.substring(0, 19), "yyyy-MM-dd HH:mm:ss");
            }

            return DateUtil.getLazadaShowFormat(date);
        }
        return null;
    }

    public static void main(String[] args) throws Exception {
        String showDate = getLazadaShowFormat(new Date());
        String isoDate = getISODateFormat(new Date());
        System.out.println("show Date is:" + showDate);
        System.out.println("iso Date is:" + isoDate);
    }
}
