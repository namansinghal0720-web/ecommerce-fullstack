package com.naman.ecom_proj.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Data;

@Data
public class ProductResponse {

    private int id;
    private String name;
    private String description;
    private String brand;
    private BigDecimal price;
    private String category;
    private Date releaseDate;
    private boolean productAvailable;
    private int stockQuantity;
    private String imageName;
}