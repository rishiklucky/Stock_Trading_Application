package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Portfolio;

public interface PortfolioRepository extends JpaRepository<Portfolio,Long> {
    Optional<Portfolio> findByUserIdAndStockId(Long userId,Long stockId);

    Optional<Portfolio> findByUserId(Long userId);
    
    List<Portfolio> findAllByUserId(Long userId);
}
