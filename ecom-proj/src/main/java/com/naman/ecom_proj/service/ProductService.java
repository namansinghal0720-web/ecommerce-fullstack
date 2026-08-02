package com.naman.ecom_proj.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.naman.ecom_proj.dto.ProductRequest;
import com.naman.ecom_proj.dto.ProductResponse;
import com.naman.ecom_proj.mapper.ProductMapper;
import com.naman.ecom_proj.model.Product;
import com.naman.ecom_proj.repository.ProductRepo;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    @Autowired
    private ProductMapper mapper;

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(int id) {
        return repo.findById(id).orElse(null);
    }

    public ProductResponse addProduct(ProductRequest request,
                                      MultipartFile imageFile) throws IOException {

        Product product = mapper.toProduct(request);

        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageDate(imageFile.getBytes());
        }

        Product saved = repo.save(product);

        return mapper.toResponse(saved);
    }

    public ProductResponse updateProduct(int id,
                                         ProductRequest request,
                                         MultipartFile imageFile) throws IOException {

        Product existing = repo.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        Product product = mapper.toProduct(request);
        product.setId(id);

        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageDate(imageFile.getBytes());
        } else {
            product.setImageName(existing.getImageName());
            product.setImageType(existing.getImageType());
            product.setImageDate(existing.getImageDate());
        }

        Product updated = repo.save(product);

        return mapper.toResponse(updated);
    }

    public void deleteProduct(int id) {
        repo.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
}