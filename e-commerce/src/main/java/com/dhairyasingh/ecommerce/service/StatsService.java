package com.dhairyasingh.ecommerce.service;

import com.dhairyasingh.ecommerce.repository.OrderRepository;
import com.dhairyasingh.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatsService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public double getTotalSales() {
        return orderRepository.findTotalSales();
    }

    public int getTotalOrders() {
        return orderRepository.findAll().size();
    }

    public int getTotalCustomers() {
        return userRepository.countByRoleName("ROLE_USER");
    }
}
