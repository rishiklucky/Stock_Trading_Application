package com.example.demo.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.BuyStockRequest;
import com.example.demo.dto.SellStockRequest;
import com.example.demo.entity.Portfolio;
import com.example.demo.entity.Transaction;
import com.example.demo.repository.PortfolioRepository;
import com.example.demo.service.TradingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/trading")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name="Trading Operations",description = "APIs for buying and selling stocks")
public class TradingController {

    private final TradingService tradingService;
    private final PortfolioRepository portfolioRepository;

    @Operation(summary = "Buy stocks",
            description = "Purchase stocks . Requires userId,stock symbol,and quantity. Deducts amount from user balance")
    @PostMapping("/buy")
    public ResponseEntity<ApiResponse> buyStock(@RequestBody BuyStockRequest request){
        try{
            String message = tradingService.buyStock(request);

            return ResponseEntity.ok(new ApiResponse(true,message,null));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false,e.getMessage()));
        }
    }

    @Operation(summary = "Sell stocks to another user",
            description = "sells stocks from seller's portfolio and transfers them to buyer's portfolio")
    @PostMapping("/sell")
    public ResponseEntity<ApiResponse> sellStock(@RequestBody SellStockRequest request){
        try{
            String message = tradingService.sellStock(request);
            return ResponseEntity.ok(new ApiResponse(true,message,null));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false,e.getMessage()));
        }
    }

    @Operation(summary = "Get transaction history",
            description = "retrive all buy/sell transactions for a specific user ordered by date(newwst first)")
    @GetMapping("/transactions/{userId}")
    public ResponseEntity<ApiResponse> getTransactionHistory(@PathVariable Long userId){
        try{
            List<Transaction> transactions = tradingService.getTransactions(userId);

            return ResponseEntity.ok(new ApiResponse(true,"Transaction history fetched successfully",transactions));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false,e.getMessage()));
        }
    }

    @Operation(summary = "Get user portfolio",
        description = "Retrieve all stock holdings for a specific user with current market value and real-time net profit/loss")
    @GetMapping("/portfolio/{userId}")
    public ResponseEntity<List<Portfolio>> getPortfolioByUserId(@PathVariable Long userId){
        try{
            List<Portfolio> portfolios = tradingService.getPortfolioByUserId(userId);
            return ResponseEntity.ok(portfolios);

        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @Operation(summary = "get users portfolio",
            description = "Retriving all users portfolio")
    @GetMapping("/portfolio")
    public List<Portfolio> getAllPortfolio(){
        return portfolioRepository.findAll().stream()
                .filter(p -> p.getQuantity() > 0)
                .toList();
    }
}
