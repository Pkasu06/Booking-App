package com.dsd.reservationsystem;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import com.dsd.reservationsystem.database.Db;

@Configuration
@Profile("test")
public class TestConfig {

    @Bean
    @Primary
    public Db database() {
        return Mockito.mock(Db.class);
    }
}
