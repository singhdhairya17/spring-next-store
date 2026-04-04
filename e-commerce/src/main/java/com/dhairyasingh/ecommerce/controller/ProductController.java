package com.dhairyasingh.ecommerce.controller;


import com.dhairyasingh.ecommerce.dto.ProductRequest;
import com.dhairyasingh.ecommerce.dto.ProductResponse;
import com.dhairyasingh.ecommerce.model.Product;
import com.dhairyasingh.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;




@RequiredArgsConstructor
@RestController
@RequestMapping("api/products")

public class ProductController {
    private final ProductService productService;



    @GetMapping("/all")
    public List<Product> index() {
        return productService.activeProducts();
    }

    @GetMapping("/{id}")
    public Optional<Product> show(@PathVariable String id) {
        return productService.getProductById(id);
    }




    @GetMapping("/latest")
    public List<Product> latestProducts() {
        return productService.getLatestProducts(6);
    }
}
