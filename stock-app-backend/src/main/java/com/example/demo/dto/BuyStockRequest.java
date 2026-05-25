package com.example.demo.dto;

import lombok.Data;

@Data
public class BuyStockRequest {

    private Long userId;
    private String symbol;
    private Integer quantity;
}
