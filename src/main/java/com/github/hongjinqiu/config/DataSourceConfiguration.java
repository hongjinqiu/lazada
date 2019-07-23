package com.github.hongjinqiu.config;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;

@SpringBootConfiguration
public class DataSourceConfiguration {
    @Value("${spring.datasource.driver-class-name}")
    private String driver;
    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;
    @Value("${spring.datasource.c3p0_initialPoolSize}")
    private String c3p0_initialPoolSize;
    @Value("${spring.datasource.c3p0_minPoolSize}")
    private String c3p0_minPoolSize;
    @Value("${spring.datasource.c3p0_maxPoolSize}")
    private String c3p0_maxPoolSize;

    @Bean
    public DataSource createDataSource() throws PropertyVetoException {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass(driver);
        dataSource.setJdbcUrl(url);
        dataSource.setUser(username);
        dataSource.setPassword(password);
        dataSource.setAutoCommitOnClose(false);
        dataSource.setInitialPoolSize(Integer.valueOf(c3p0_initialPoolSize));
        dataSource.setMinPoolSize(Integer.valueOf(c3p0_minPoolSize));
        dataSource.setMaxPoolSize(Integer.valueOf(c3p0_maxPoolSize));
        System.out.print("=========================================" + dataSource + "===========================================");
        return dataSource;
    }
}
