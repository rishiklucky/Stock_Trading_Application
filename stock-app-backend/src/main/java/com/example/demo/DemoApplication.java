package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication{

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("stock-app-backend Started!");
        System.out.println("API Base URL: http://localhost:8081/api");
        System.out.println("Swagger UI: http://localhost:8081/swagger-ui.html");
        System.out.println("API Docs: http://localhost:8081/v3/api-docs");
        System.out.println("Database: MySQL (stock_app_db)");
        System.out.println("========================================\n");
    }

}
