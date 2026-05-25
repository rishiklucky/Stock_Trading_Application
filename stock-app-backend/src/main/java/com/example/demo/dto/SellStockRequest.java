package com.example.demo.dto;

import lombok.Data;

@Data
public class SellStockRequest {

    private Long userId;
    private String symbol;
    private Integer quantity;
    private String buyerName;
}
