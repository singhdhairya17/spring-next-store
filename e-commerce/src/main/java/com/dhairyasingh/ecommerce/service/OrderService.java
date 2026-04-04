package com.dhairyasingh.ecommerce.service;

import com.dhairyasingh.ecommerce.exceptions.AppException;
import com.dhairyasingh.ecommerce.model.Order;
import com.dhairyasingh.ecommerce.repository.OrderRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Data
@Builder
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    public Order save(Order order)
    {
        return orderRepository.save(order);
    }

    public Order getOrder(String id)
    {
        return orderRepository.findById(id).orElseThrow(
                ()-> new AppException("Order not found", HttpStatus.BAD_REQUEST)
        );
    }
}
