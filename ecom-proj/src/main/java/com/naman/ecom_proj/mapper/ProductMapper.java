package com.naman.ecom_proj.mapper;

import org.springframework.stereotype.Component;

import com.naman.ecom_proj.dto.ProductRequest;
import com.naman.ecom_proj.dto.ProductResponse;
import com.naman.ecom_proj.model.Product;

@Component
public class ProductMapper {

    public Product toProduct(ProductRequest request) {

        Product product = new Product();

        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setReleaseDate(request.getReleaseDate());
        product.setProductAvailable(request.isProductAvailable());
        product.setStockQuantity(request.getStockQuantity());

        return product;
    }

    public ProductResponse toResponse(Product product) {

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setName(product.getName());
        response.setBrand(product.getBrand());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setCategory(product.getCategory());
        response.setReleaseDate(product.getReleaseDate());
        response.setProductAvailable(product.isProductAvailable());
        response.setStockQuantity(product.getStockQuantity());

        return response;
    }
}