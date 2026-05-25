package com.example.demo.service;

import com.example.demo.entity.Stock;
import com.example.demo.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockService {
    private final StockRepository stockRepository;

    public Stock getStocksByStockSymbol(String symbol){
        return stockRepository.findBySymbol(symbol)
                .orElseThrow(()->new RuntimeException("Stock not found"+symbol));
    }

    public List<Stock> getAllStocks(){
        return stockRepository.findAll();
    }
}
