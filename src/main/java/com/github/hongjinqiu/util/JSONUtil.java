package com.github.hongjinqiu.util;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class JSONUtil {
    private static Logger logger = LoggerFactory.getLogger(JSONUtil.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public JSONUtil() {
    }

    public static <T> T stringToObject(String jsonString, Class<T> clazz) {
        try {
            return objectMapper.readValue(jsonString, clazz);
        } catch (IOException var3) {
            logger.error(var3.getMessage(), var3);
            return null;
        }
    }

    public static <T> T stringToList(String jsonString, Class... valueType) {
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, valueType);

        try {
            return objectMapper.readValue(jsonString, javaType);
        } catch (IOException var4) {
            logger.error(var4.getMessage(), var4);
            return null;
        }
    }

    public static <T> T stringToSet(String jsonString, Class... valueType) {
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(Set.class, valueType);

        try {
            return objectMapper.readValue(jsonString, javaType);
        } catch (IOException var4) {
            logger.error(var4.getMessage(), var4);
            return null;
        }
    }

    public static String objectToString(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (IOException var2) {
            logger.error(var2.getMessage(), var2);
            return null;
        }
    }

    public static String arrayToString(Object[] objectArray) {
        StringBuilder jsonSB = new StringBuilder();
        jsonSB.append('[');

        for(int i = 0; i < objectArray.length; ++i) {
            jsonSB.append(objectToString(objectArray[i]));
            if (i < objectArray.length - 1) {
                jsonSB.append(',');
            }
        }

        jsonSB.append(']');
        return jsonSB.toString();
    }

    public static String listToString(List<?> list) {
        try {
            return objectMapper.writeValueAsString(list);
        } catch (IOException var2) {
            logger.error(var2.getMessage(), var2);
            return null;
        }
    }

    public static String mapToString(Map<?, ?> map) {
        try {
            return objectMapper.writeValueAsString(map);
        } catch (IOException var2) {
            logger.error(var2.getMessage(), var2);
            return null;
        }
    }

    public static <T> T stringToBean(String jsonString, Class<T> toValueType) {
        try {
            return objectMapper.readValue(jsonString, toValueType);
        } catch (IOException var3) {
            logger.error(var3.getMessage(), var3);
            return null;
        }
    }

    public static <T> T objectToBean(Object object, Class<T> toValueType) {
        return objectMapper.convertValue(object, toValueType);
    }

    public static <T> T objectToList(Object object, Class<?> valueType) {
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, new Class[]{valueType});
        return objectMapper.convertValue(object, javaType);
    }

    public static <T> T objectToSet(Object object, Class<?> valueType) {
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(Set.class, new Class[]{valueType});
        return objectMapper.convertValue(object, javaType);
    }
}
