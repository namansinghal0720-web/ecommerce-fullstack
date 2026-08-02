package com.naman.ecom_proj.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

@Data
public class ProductDTO {

    private Integer id;

    private String name;

    private String description;

    private String brand;

    private BigDecimal price;

    private String category;

    private Date releaseDate;

    private boolean productAvailable;

    private Integer stockQuantity;

    private String imageUrl;
}