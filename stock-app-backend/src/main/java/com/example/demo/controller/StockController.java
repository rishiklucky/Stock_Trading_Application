package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.entity.Stock;
import com.example.demo.service.StockService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@Tag(name="Stock Market",description="APIs for retriving stock market data")

public class StockController {

    private final StockService stockService;

    @Operation(summary = "get all stocks in db",
            description = "Retriving all stocks from db table stocks")
    @GetMapping("/")
    public ResponseEntity<List<Stock>> getAllStocks(){
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    @Operation(summary = "get stock by stock symbol",
    description = "Retriving stock using stock symbol")
    @GetMapping("quote/{symbol}")
    public ResponseEntity<Stock> getStockByStockSymbol(@PathVariable String symbol){
        try{
            Stock stock = stockService.getStocksByStockSymbol(symbol);
            return ResponseEntity.ok(stock);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }
}
