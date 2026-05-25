package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@Entity
@Table(name = "stocks")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockId;

    @Column()
    private String symbol;

    @Column()
    private Long currentPrice;

    @Column()
    private Long highPrice;

    @Column()
    private Long lowPrice;

    @Column()
    private Long openPrice;

    @Column()
    private Long previousClose;

    @Column()
    private Long timestamp;

    @Column
    private Long buyerPrice;

    @Column
    private Long sellerPrice;

    @Column()
    private Integer availableQuantity;


}
