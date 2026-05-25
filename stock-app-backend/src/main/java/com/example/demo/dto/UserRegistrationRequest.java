package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationRequest {
    @NotBlank(message = "Name is required")
    private String username;

    @NotBlank(message = "Email is Required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
