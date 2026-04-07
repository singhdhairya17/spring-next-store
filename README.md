# Spring Next Store

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)](https://nextjs.org/)

Full-stack **e-commerce** demo: a **Spring Boot 3** REST API and a **Next.js 15** storefront with an **admin** area. JWT-secured API, JPA + MySQL, client-side cart, and order flow.

**Live repo:** [github.com/singhdhairya17/spring-next-store](https://github.com/singhdhairya17/spring-next-store) · **Author:** Dhairya Singh

---

## Table of contents

- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Run locally](#run-locally)
- [Tests](#tests)
- [Production builds](#production-builds)
- [Project structure](#project-structure)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

---

## Architecture

| Layer | Directory | Role |
|--------|-----------|------|
| **API** | [`e-commerce/`](./e-commerce/) | REST endpoints, JWT, Spring Data JPA, file uploads |
| **Web** | [`frontend-ecommerce/`](./frontend-ecommerce/) | Next.js App Router — public shop + `/admin` |

Run the **API first**, then the **frontend**. The UI calls the backend using `NEXT_PUBLIC_BACKEND_URL` (see [Configuration](#configuration)).

---

## Tech stack

**Backend:** Java 21 · Spring Boot 3.4 · Maven · Spring Security · Spring Data JPA · MySQL  

**Frontend:** Next.js 15 · React 19 · TypeScript · Tailwind CSS · HeroUI · Framer Motion  

---

## Prerequisites

- **JDK 21** (set as Project SDK in IntelliJ / `JAVA_HOME`)
- **Node.js** 18+ (20+ recommended)
- **MySQL** 8+

---

## Configuration

### Backend (MySQL)

Edit [`e-commerce/src/main/resources/application.properties`](./e-commerce/src/main/resources/application.properties). The datasource password defaults to `changeme` unless you set:

```powershell
# Windows PowerShell
$env:MYSQL_PASSWORD = "your_password"
```

```bash
# macOS / Linux
export MYSQL_PASSWORD=your_password
```

Do **not** commit real credentials. See [`application.properties.example`](./e-commerce/src/main/resources/application.properties.example).

### Frontend

```bash
cd frontend-ecommerce
cp .envexample .env.local
```

`.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

---

## Run locally

1. **MySQL** — Ensure a database exists for your JDBC URL (e.g. `ecommerce-db`; `createDatabaseIfNotExist` may apply depending on server settings). Set **`MYSQL_PASSWORD`** (or edit [`application.properties`](./e-commerce/src/main/resources/application.properties) locally **without committing** secrets).

2. **API**

   ```bash
   cd e-commerce
   ./mvnw spring-boot:run
   ```

   **Windows PowerShell:** use the wrapper with an explicit path (`mvnw` alone is not on `PATH`):

   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

   API base URL: **http://localhost:8080**

3. **Web**

   ```bash
   cd frontend-ecommerce
   npm install
   npm run dev
   ```

   Or: `pnpm install` && `pnpm dev`  
   App: **http://localhost:3000**

---

## Tests

The backend uses **in-memory H2** during **`mvn test`** (see [`e-commerce/src/test/resources/application.properties`](./e-commerce/src/test/resources/application.properties)), so you do **not** need MySQL running to execute the suite.

- **IntelliJ:** use JDK **21** as Project SDK and for **Maven → Runner → JRE**, then run all tests in `e-commerce`.
- **Command line (Windows):** ensure `java -version` is **21**, then from `e-commerce`:

  ```powershell
  .\mvnw.cmd test
  ```

Included checks: **`@SpringBootTest`** context load, **MockMvc** tests for **`POST /api/register`** (valid **201** / invalid **400**), **Bean Validation** on signup DTO, and **`MethodArgumentNotValidException`** handling in [`RestExceptionHandler`](./e-commerce/src/main/java/com/dhairyasingh/ecommerce/config/RestExceptionHandler.java).

---

## Production builds

**API**

```bash
cd e-commerce
./mvnw clean package   # Windows: .\mvnw.cmd clean package
java -jar target/e-commerce-0.0.1-SNAPSHOT.jar
```

**Frontend**

```bash
cd frontend-ecommerce
npm run build
npm start
```

Point `NEXT_PUBLIC_BACKEND_URL` at your deployed API and allow your web **origin** in API CORS / security settings.

---

## Project structure

```
spring-next-store/
├── e-commerce/                    # Spring Boot API
│   ├── pom.xml
│   ├── src/main/java/com/dhairyasingh/ecommerce/
│   ├── src/main/resources/
│   └── src/test/                  # H2-backed tests, MockMvc
├── frontend-ecommerce/              # Next.js
│   ├── src/app/(user)/             # Storefront routes
│   ├── src/app/(admin)/            # Admin routes
│   ├── src/components/
│   └── package.json
├── LICENSE
└── README.md
```

---

## Features

- **Storefront:** categories, catalog, product detail, cart (local storage), register / login, checkout flow  
- **Admin:** dashboard metrics, CRUD for products and categories (admin role)  
- **API:** JWT authentication, role-based access, static uploads via configured `upload.path`; **Bean Validation** on sign-up (`@Valid` + Jakarta constraints); global validation error responses via `@ControllerAdvice`

---

## Contributing

1. Fork the repository and create a feature branch.  
2. Keep commits focused; match existing style.  
3. Open a pull request describing changes and how you tested.

---

## License

This project is licensed under the [MIT License](./LICENSE).
