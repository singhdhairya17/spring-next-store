package com.dhairyasingh.ecommerce.controller;

import com.dhairyasingh.ecommerce.config.AuthProvider;
import com.dhairyasingh.ecommerce.config.RestExceptionHandler;
import com.dhairyasingh.ecommerce.dto.UserResponse;
import com.dhairyasingh.ecommerce.dto.UserSignUpRequest;
import com.dhairyasingh.ecommerce.model.Role;
import com.dhairyasingh.ecommerce.model.User;
import com.dhairyasingh.ecommerce.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        controllers = AuthController.class,
        excludeAutoConfiguration = {
            SecurityAutoConfiguration.class,
            SecurityFilterAutoConfiguration.class
        })
@AutoConfigureMockMvc(addFilters = false)
@Import(RestExceptionHandler.class)
class AuthControllerRegisterTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @MockBean
    private AuthProvider authProvider;

    @Test
    void registerReturns400WhenPayloadInvalid() throws Exception {
        String body =
                """
                {"name":"","email":"not-email","password":"short"}\
                """;

        mockMvc.perform(
                        post("/api/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    void registerReturns201WhenPayloadValid() throws Exception {
        Role role = Role.builder().id("role-id").name("ROLE_USER").build();
        User saved =
                User.builder()
                        .id("user-id")
                        .name("Test User")
                        .email("test@example.com")
                        .password("{noop}encoded")
                        .role(role)
                        .build();
        UserResponse response = UserResponse.builder().user(saved).build();

        when(userService.register(any())).thenReturn(response);
        when(authProvider.createToken(any(UserResponse.class))).thenReturn("mock-jwt-token");

        UserSignUpRequest req =
                UserSignUpRequest.builder()
                        .name("Test User")
                        .email("test@example.com")
                        .password("password12")
                        .build();
        String body = objectMapper.writeValueAsString(req);

        mockMvc.perform(
                        post("/api/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("mock-jwt-token"))
                .andExpect(jsonPath("$.user.email").value("test@example.com"));
    }
}
