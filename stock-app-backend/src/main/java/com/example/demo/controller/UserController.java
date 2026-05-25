package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.ApiResponse;
import com.example.demo.dto.UserRegistrationRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@Tag(name="User Management",description="APIs for user registration,login and profile management")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Register new user",
            description = "Register a new user with username,email,password")
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        try {
            User user = userService.registerUser(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "User registered successfully", user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }


    @Operation(summary = "User login",
            description = "Authenticate user with email and password")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.login(request);
            return ResponseEntity.ok(new ApiResponse(true, "Login successful", user));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @Operation(summary = "Get user by user id",
        description = "Retrive user details by userId")
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUserByUserId(@PathVariable Long userId){
        try{
            User user = userService.getUserByUserId(userId);
            return ResponseEntity.ok(new ApiResponse(true,"User details retrived by user id",user));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false,e.getMessage()));
        }
    }

    @Operation(summary = "Get user by username ",
            description = "Retrive user details by username")
    @GetMapping("/username/{username}")
    public ResponseEntity<ApiResponse> getUserByUserName(@PathVariable String username){
        try{
            User user = userService.getUserByUserName(username);
            return ResponseEntity.ok(new ApiResponse(true,"User details retrived by username",user));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false,e.getMessage()));
        }
    }

    @Operation(summary  ="Get all users",
        description = "retrive list of all users")
    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllUsers(){
        try{
            List<User> users = userService.getAllUsers();

            return ResponseEntity.ok(new ApiResponse(true,"All users retrieved successfully",users));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false,e.getMessage()));
        }
    }

    @Operation(summary  ="Delete user by userId",
            description = "Deleting user details by userID")
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUserByUserId(@PathVariable Long userId){
        try{
            userService.deleteUserByUserId(userId);

            return ResponseEntity.ok(new ApiResponse(true,"user deleted successfully"));

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false,e.getMessage()));
        }
    }
}
