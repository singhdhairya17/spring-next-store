package com.dhairyasingh.ecommerce;

import com.dhairyasingh.ecommerce.model.Category;
import com.dhairyasingh.ecommerce.model.Product;
import com.dhairyasingh.ecommerce.model.Role;
import com.dhairyasingh.ecommerce.model.User;
import com.dhairyasingh.ecommerce.repository.CategoryRepository;
import com.dhairyasingh.ecommerce.repository.ProductRepository;
import com.dhairyasingh.ecommerce.repository.RoleRepository;
import com.dhairyasingh.ecommerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;


@Component
public class DataLoader implements CommandLineRunner {

    /** Verified Unsplash CDN links (some older photo IDs now return 404). */
    private static final Map<String, String> DEMO_CATEGORY_IMAGES = Map.of(
            "Electronics",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
            "Home",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
            "Apparel",
            "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80",
            "Sports",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80");

    private static final Map<String, String> DEMO_CATEGORY_DESCRIPTIONS = Map.of(
            "Electronics", "Phones, audio, and accessories.",
            "Home", "Everyday essentials for living spaces.",
            "Apparel", "Comfortable layers and basics.",
            "Sports", "Gear for training and the outdoors.");

    /** Unsplash hotlinks for resume/demo storefront only. */
    private static final Map<String, String> DEMO_PRODUCT_IMAGE_URLS = Map.of(
            "Wireless headphones",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
            "USB-C hub",
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=80",
            "Ceramic mug set",
            "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop&q=80",
            "Cotton crew tee",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=80",
            "Insulated water bottle",
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80");
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataLoader(RoleRepository roleRepository,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder,
                      CategoryRepository categoryRepository,
                      ProductRepository productRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
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

        ensureDemoCategories();
        seedDemoCatalogIfEmpty();
        backfillDemoProductImages();
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

    /** Ensures demo departments exist with cover images (safe to run every startup). */
    private void ensureDemoCategories() {
        DEMO_CATEGORY_DESCRIPTIONS.forEach(
                (name, description) ->
                        ensureCategory(
                                name, description, DEMO_CATEGORY_IMAGES.get(name)));
    }

    /** Demo rows so the storefront is not empty on a fresh database. */
    private void seedDemoCatalogIfEmpty() {
        if (productRepository.count() > 0) {
            return;
        }
        Category electronics =
                ensureCategory(
                        "Electronics",
                        DEMO_CATEGORY_DESCRIPTIONS.get("Electronics"),
                        DEMO_CATEGORY_IMAGES.get("Electronics"));
        Category home =
                ensureCategory(
                        "Home",
                        DEMO_CATEGORY_DESCRIPTIONS.get("Home"),
                        DEMO_CATEGORY_IMAGES.get("Home"));
        Category apparel =
                ensureCategory(
                        "Apparel",
                        DEMO_CATEGORY_DESCRIPTIONS.get("Apparel"),
                        DEMO_CATEGORY_IMAGES.get("Apparel"));
        Category sports =
                ensureCategory(
                        "Sports",
                        DEMO_CATEGORY_DESCRIPTIONS.get("Sports"),
                        DEMO_CATEGORY_IMAGES.get("Sports"));

        productRepository.save(Product.builder()
                .name("Wireless headphones")
                .price(new BigDecimal("79.99"))
                .description("Over-ear ANC headphones with 30h battery.")
                .active(true)
                .quantity(40)
                .imageUrl(DEMO_PRODUCT_IMAGE_URLS.get("Wireless headphones"))
                .category(electronics)
                .build());
        productRepository.save(Product.builder()
                .name("USB-C hub")
                .price(new BigDecimal("44.50"))
                .description("7-in-1 hub: HDMI, SD, USB-A, pass-through charging.")
                .active(true)
                .quantity(120)
                .imageUrl(DEMO_PRODUCT_IMAGE_URLS.get("USB-C hub"))
                .category(electronics)
                .build());
        productRepository.save(Product.builder()
                .name("Ceramic mug set")
                .price(new BigDecimal("28.00"))
                .description("Set of 4 stackable mugs, microwave safe.")
                .active(true)
                .quantity(200)
                .imageUrl(DEMO_PRODUCT_IMAGE_URLS.get("Ceramic mug set"))
                .category(home)
                .build());
        productRepository.save(Product.builder()
                .name("Cotton crew tee")
                .price(new BigDecimal("22.00"))
                .description("Relaxed fit, garment-dyed organic cotton.")
                .active(true)
                .quantity(85)
                .imageUrl(DEMO_PRODUCT_IMAGE_URLS.get("Cotton crew tee"))
                .category(apparel)
                .build());
        productRepository.save(Product.builder()
                .name("Insulated water bottle")
                .price(new BigDecimal("18.99"))
                .description("24oz stainless steel, keeps drinks cold for hours.")
                .active(true)
                .quantity(150)
                .imageUrl(DEMO_PRODUCT_IMAGE_URLS.get("Insulated water bottle"))
                .category(sports)
                .build());
    }

    /** Sets or fixes image URLs on seeded demo products (e.g. replaces known-broken Unsplash IDs). */
    private void backfillDemoProductImages() {
        productRepository
                .findAll()
                .forEach(
                        p -> {
                            String canonical = DEMO_PRODUCT_IMAGE_URLS.get(p.getName());
                            if (canonical == null) {
                                return;
                            }
                            String cur = p.getImageUrl();
                            boolean missing = cur == null || cur.isBlank();
                            boolean brokenUsbHub =
                                    "USB-C hub".equals(p.getName())
                                            && cur != null
                                            && cur.contains("1625948515291");
                            if (missing || brokenUsbHub) {
                                p.setImageUrl(canonical);
                                productRepository.save(p);
                            }
                        });
    }

    private Category ensureCategory(String name, String description, String imageUrl) {
        Optional<Category> existing =
                categoryRepository.findAll().stream()
                        .filter(c -> name.equals(c.getName()))
                        .findFirst();
        if (existing.isPresent()) {
            Category c = existing.get();
            boolean dirty = false;
            if (description != null
                    && (c.getDescription() == null || c.getDescription().isBlank())) {
                c.setDescription(description);
                dirty = true;
            }
            if (imageUrl != null
                    && (c.getImage_url() == null || c.getImage_url().isBlank())) {
                c.setImage_url(imageUrl);
                dirty = true;
            }
            if (dirty) {
                return categoryRepository.save(c);
            }
            return c;
        }
        return categoryRepository.save(
                Category.builder()
                        .name(name)
                        .description(description)
                        .image_url(imageUrl)
                        .build());
    }
}
