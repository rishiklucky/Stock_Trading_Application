package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserName(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUserId(Long userId);



    boolean existsByEmail(String email);

    boolean existsByUserName(String username);

    boolean existsByUserId(Long userId);
}
