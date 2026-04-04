package com.dhairyasingh.ecommerce.repository;

import com.dhairyasingh.ecommerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, String> {
    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    double findTotalSales();
}
