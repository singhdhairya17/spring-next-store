package com.dhairyasingh.ecommerce.controller;


import com.dhairyasingh.ecommerce.dto.CategoryRequest;
import com.dhairyasingh.ecommerce.dto.CategoryResponse;
import com.dhairyasingh.ecommerce.model.Category;
import com.dhairyasingh.ecommerce.model.Product;
import com.dhairyasingh.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public List<Category> index(){
        return categoryService.getAllCategories();
    }



    @GetMapping("/{id}")
    public Category show(@PathVariable String id) {
        return categoryService.getCategoryById(id);
    }


    @GetMapping("/{id}/products")
    public List<Product> getProducts(@PathVariable String id)
    {
        return categoryService.getProducts(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id)
    {
        categoryService.deleteCategory(id);
    }



}
