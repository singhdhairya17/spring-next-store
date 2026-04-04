package com.dhairyasingh.ecommerce.dto;

import com.dhairyasingh.ecommerce.model.Category;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponse {
    private Category category;
}
