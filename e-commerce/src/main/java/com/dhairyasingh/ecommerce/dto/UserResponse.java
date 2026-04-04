package com.dhairyasingh.ecommerce.dto;


import com.dhairyasingh.ecommerce.model.User;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private User user;
    private String token;
}
