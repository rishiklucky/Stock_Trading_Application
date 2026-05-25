package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.BuyStockRequest;
import com.example.demo.dto.SellStockRequest;
import com.example.demo.entity.Portfolio;
import com.example.demo.entity.Stock;
import com.example.demo.entity.Transaction;
import com.example.demo.entity.TransactionType;
import com.example.demo.entity.User;
import com.example.demo.repository.PortfolioRepository;
import com.example.demo.repository.StockRepository;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TradingService {

    private final UserRepository userRepository;
    private final StockRepository stockRepository;
    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;

    @Transactional
    public String buyStock(BuyStockRequest request) {


        User user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found with user id: "
                                + request.getUserId()));


        Stock stock = stockRepository.findBySymbol(request.getSymbol())
                .orElseThrow(() ->
                        new RuntimeException("Stock not found with symbol: "
                                + request.getSymbol()));


        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }


        long totalAmount = stock.getCurrentPrice() * request.getQuantity();


        if (user.getBalance() < totalAmount) {
            throw new RuntimeException("Insufficient balance");
        }


        user.setBalance(user.getBalance() - totalAmount);


        Portfolio portfolio = portfolioRepository
                .findByUserIdAndStockId(user.getUserId(), stock.getStockId())
                .orElse(null);

        if (portfolio == null) {
            // First time buying this stock
            portfolio = new Portfolio();
            portfolio.setUserId(user.getUserId());
            portfolio.setStockId(stock.getStockId());
            portfolio.setQuantity(request.getQuantity().longValue());
        } else {
            // Already owns this stock → increase quantity
            portfolio.setQuantity(
                    portfolio.getQuantity() + request.getQuantity()
            );
        }


        userRepository.save(user);
        portfolioRepository.save(portfolio);
        Transaction transaction = new Transaction();
        transaction.setUserId(user.getUserId());
        transaction.setStockId(stock.getStockId());
        transaction.setQuantity(request.getQuantity().longValue());
        transaction.setPrice(stock.getCurrentPrice());
        transaction.setType(TransactionType.BUY);
        transaction.setTimestamp(LocalDateTime.now());

        transactionRepository.save(transaction);

        return "Stock purchased successfully. Total deducted: " + totalAmount;
    }


    @Transactional
    public String sellStock(SellStockRequest request) {

        User seller = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("Seller not found"));

        User buyer = userRepository.findByUserName(request.getBuyerName())
                .orElseThrow(() ->
                        new RuntimeException("Buyer not found"));
        Stock stock = stockRepository.findBySymbol(request.getSymbol())
                .orElseThrow(() ->
                        new RuntimeException("Stock not found"));

        Portfolio sellerPortfolio = portfolioRepository
                .findByUserIdAndStockId(seller.getUserId(), stock.getStockId())
                .orElseThrow(() ->
                        new RuntimeException("Seller does not own this stock"));

        if (sellerPortfolio.getQuantity() < request.getQuantity()) {
            throw new RuntimeException("Seller does not have enough stock quantity");
        }

        long totalAmount = stock.getCurrentPrice() * request.getQuantity();

        if (buyer.getBalance() < totalAmount) {
            throw new RuntimeException("Buyer has insufficient balance");
        }


        buyer.setBalance(buyer.getBalance() - totalAmount);
        seller.setBalance(seller.getBalance() + totalAmount);

        sellerPortfolio.setQuantity(
                sellerPortfolio.getQuantity() - request.getQuantity()
        );

        Portfolio buyerPortfolio = portfolioRepository
                .findByUserIdAndStockId(buyer.getUserId(), stock.getStockId())
                .orElse(
                        new Portfolio(null, buyer.getUserId(), stock.getStockId(), 0L));

        buyerPortfolio.setQuantity(buyerPortfolio.getQuantity() + request.getQuantity());


        userRepository.save(buyer);
        userRepository.save(seller);
        portfolioRepository.save(sellerPortfolio);
        portfolioRepository.save(buyerPortfolio);

        Transaction sellerTransaction = new Transaction();
        sellerTransaction.setUserId(seller.getUserId());
        sellerTransaction.setStockId(stock.getStockId());
        sellerTransaction.setQuantity(request.getQuantity().longValue());
        sellerTransaction.setPrice(stock.getCurrentPrice());
        sellerTransaction.setType(TransactionType.SELL);
        sellerTransaction.setTimestamp(LocalDateTime.now());

        transactionRepository.save(sellerTransaction);


        return "Stock sold successfully and transferred to buyer";
    }

    public List<Transaction> getTransactions(Long userId) {
        userRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return transactionRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public List<Portfolio> getPortfolioByUserId(Long userId) {
        userRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Portfolio> portfolios = portfolioRepository.findAllByUserId(userId);
        
        // Filter out portfolios with zero quantity
        portfolios = portfolios.stream()
                .filter(p -> p.getQuantity() > 0)
                .toList();
        
        if (portfolios.isEmpty()) {
            throw new RuntimeException("User does not have any portfolio holdings");
        }
        
        return portfolios;
    }
}
