package com.dhairyasingh.ecommerce.dto;

import com.dhairyasingh.ecommerce.model.Product;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ProductResponse {
    private Product product;
}
