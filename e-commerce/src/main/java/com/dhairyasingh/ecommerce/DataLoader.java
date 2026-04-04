package com.dhairyasingh.ecommerce;

import com.dhairyasingh.ecommerce.model.Role;
import com.dhairyasingh.ecommerce.model.User;
import com.dhairyasingh.ecommerce.repository.RoleRepository;
import com.dhairyasingh.ecommerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class DataLoader implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public DataLoader(RoleRepository roleRepository,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Ensure the "USER" role exists
        ensureRoleExists("ROLE_USER");
        // Ensure the "ADMIN" role exists
        ensureRoleExists("ROLE_ADMIN");

        // Ensure admin user exists
        String name = "Dhairya Singh";
        String adminEmail = "admin@example.com";
        String adminPassword = "12345678";
        ensureAdminUserExists(name,adminEmail, adminPassword);
    }

    private void ensureRoleExists(String roleName) {
        if (!roleRepository.existsByName(roleName)) {
            Role role = new Role();
            role.setName(roleName);
            roleRepository.save(role);
        }
    }

    private void ensureAdminUserExists(String nameParam, String adminEmailParam, String adminPasswordParam) {
        String name = nameParam;
        String adminEmail = adminEmailParam;
        String adminPassword = adminPasswordParam;

        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setName(name);
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));

            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseThrow(() -> new RuntimeException("ADMIN role not found"));

            admin.setRole(adminRole);
            userRepository.save(admin);
        }
    }
}
