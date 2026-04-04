package com.dhairyasingh.ecommerce.dto;


import com.dhairyasingh.ecommerce.model.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductRequest {
    private String name;
    private BigDecimal price;
    private String description;
    private boolean active;
    private int quantity;
    private String category;

}
