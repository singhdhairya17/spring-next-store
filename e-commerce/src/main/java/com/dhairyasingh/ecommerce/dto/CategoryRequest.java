package com.dhairyasingh.ecommerce.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryRequest {
    private String name;
    private String description;
    private String image_url;

}
