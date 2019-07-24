package com.github.hongjinqiu;

import com.github.hongjinqiu.config.YmlConfig;
import com.hongjinqiu.pdfservice.PrintmetaInterpreterService;
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
        new PrintmetaInterpreterService();
        System.out.println("init finish");
//        SpringApplication.run(App.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("app.run do nothing");
    }

}
