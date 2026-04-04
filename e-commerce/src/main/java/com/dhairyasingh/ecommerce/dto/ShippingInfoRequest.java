package com.dhairyasingh.ecommerce.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShippingInfoRequest {
    private String local_address;
    private String city;
    private String phone_number;
}
