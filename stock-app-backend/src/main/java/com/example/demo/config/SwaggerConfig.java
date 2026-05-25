package com.example.demo.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI demoAPI(){
        Server localServer = new Server();
        localServer.setUrl("http://localhost:8081");
//        localServer.setUrl("http://3.227.243.75:8081");
        localServer.setDescription("Local Development Server");

        Contact contact = new Contact();
        contact.setName("MRU Trading Team");
        contact.setEmail("support@mrutrading.com");

        License license = new License()
                .name("Educational Use")
                .url("https://opensource.org/licenses/MIT");

        Info info = new Info()
                .title("MRU Stock Trading Platform API")
                .version("1.0.0")
                .description("REST API for Stock Trading Platform - User Management, Stock Trading, Portfolio Management")
                .contact(contact)
                .license(license);

        return new OpenAPI()
                .info(info)
                .servers(List.of(localServer));
    }
}
