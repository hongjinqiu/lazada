package com.github.hongjinqiu;

import com.github.hongjinqiu.config.YmlConfig;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@EnableScheduling
@SpringBootApplication
@EnableConfigurationProperties({YmlConfig.class})
public class App implements CommandLineRunner {

    public static void main(String[] args) throws Exception {
//        SpringApplication.run(App.class, args);
        {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/lazada?useUnicode=true&characterEncoding=UTF8", "root", "3564764");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("select * from sys_print_template");
            while (rs.next()) {
                String templateName = rs.getString("template_name");
                System.out.println("templateName is:" + templateName);
            }
        }
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("app.run do nothing");
    }

}
