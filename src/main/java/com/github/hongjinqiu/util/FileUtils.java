package com.github.hongjinqiu.util;

import java.io.IOException;
import java.io.InputStream;

public class FileUtils {
    private static int readSize = 1024;
    private static String charsetName = "UTF-8";

    public static String readText(InputStream in) throws IOException {
        StringBuffer rtn = new StringBuffer();
        if (readSize <= 0) {
            readSize = 1024;
        }

        int realReadSize = readSize;
        byte[] data = new byte[readSize];

        while(realReadSize > 0) {
            realReadSize = in.read(data);
            if (realReadSize > 0) {
                rtn.append(new String(data, 0, realReadSize, charsetName));
            }
        }

        if (rtn.length() > 0) {
            return rtn.toString();
        } else {
            return null;
        }
    }
}
