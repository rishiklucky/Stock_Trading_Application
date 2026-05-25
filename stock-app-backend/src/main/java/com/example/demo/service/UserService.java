package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserRegistrationRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public User registerUser(UserRegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setUserName(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setBalance(Long.valueOf(50000));

        User savedUser = userRepository.save(user);

        return savedUser;
    }

        public User login(LoginRequest request){
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(()->new RuntimeException("Invalid email or password"));

            if(!user.getPassword().equals(request.getPassword())){
                throw new RuntimeException("invalid email or password");
            }



        return user;


    }

    public User getUserByUserId(Long userId){
        return userRepository.findByUserId(userId)
                .orElseThrow(()-> new RuntimeException("User not found with user id"+userId));
    }

    public User getUserByUserName(String username){
        return userRepository.findByUserName(username)
                .orElseThrow(()-> new RuntimeException("User not found with user id"+username));
    }

    public List<User> getAllUsers(){
        return  userRepository.findAll();

    }

    public void deleteUserByUserId(Long userId){
        if(!userRepository.existsByUserId(userId)){
            throw new RuntimeException("user not found with user id : "+userId);
        }
        userRepository.deleteById(userId);
    }
}
