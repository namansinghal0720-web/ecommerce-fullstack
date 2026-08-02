package com.naman.ecom_proj.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String,Object> handleValidation(MethodArgumentNotValidException ex)
    {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp",LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        response.put("errors", errors);

        return response;
    }
    @ExceptionHandler(Exception.class)
    public Map<String, Object> handleException(Exception ex) {

        Map<String, Object> response = new HashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("message", ex.getMessage());

        return response;
    }
}
