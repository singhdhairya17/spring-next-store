# Spring Next Store

Full-stack e-commerce: **Spring Boot 3** REST API + **Next.js 15** storefront and admin panel.

**Author:** Dhairya Singh

**Repository:** [github.com/singhdhairya17/spring-next-store](https://github.com/singhdhairya17/spring-next-store)  
If you use a different repo name on GitHub, update this line and `GITHUB_LINK.txt`.

---

## Publish to GitHub (fresh remote)

1. On GitHub: **delete** the old repository (Settings → Danger zone → Delete this repository), if you no longer want it.
2. Create a **new empty** repository (no README/license/gitignore). Suggested name: **`spring-next-store`**.
3. In your project folder:

```powershell
git remote remove origin
git remote add origin https://github.com/singhdhairya17/spring-next-store.git
git push -u origin main
```

Use your real username/repo in the URL if different.

---

## Overview

| Module | Path | Description |
|--------|------|-------------|
| **API** | [`e-commerce/`](./e-commerce/) | REST API, JWT auth, JPA, MySQL, file uploads |
| **Web** | [`frontend-ecommerce/`](./frontend-ecommerce/) | Next.js App Router — shop + `/admin` |

Start the API first, then the frontend. The UI talks to the API via `NEXT_PUBLIC_BACKEND_URL`.

---

## Tech stack

**Backend**

- Java **21**, Spring Boot **3.4**, Maven  
- Spring Security (JWT), Spring Data JPA  
- MySQL  

**Frontend**

- Next.js **15**, React **19**, TypeScript  
- Tailwind CSS, HeroUI, Framer Motion  
- npm / pnpm

---

## Prerequisites

- **JDK 21** (Spring Boot 3.4) — IntelliJ: set **Project SDK** to 21  
- **Node.js** 18+ (20+ recommended)  
- **MySQL** 8+ (local or remote)

---

## Configuration

### Database (backend)

Edit [`e-commerce/src/main/resources/application.properties`](./e-commerce/src/main/resources/application.properties) or set environment variables.

Default password uses a placeholder; override with:

```bash
# Windows PowerShell
$env:MYSQL_PASSWORD = "your_real_password"

# macOS / Linux
export MYSQL_PASSWORD=your_real_password
```

Or replace `${MYSQL_PASSWORD:changeme}` in `application.properties` locally (do not commit real credentials).

See also [`application.properties.example`](./e-commerce/src/main/resources/application.properties.example).

### Frontend

```bash
cd frontend-ecommerce
cp .envexample .env.local
```

`.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

(No trailing slash required; the app normalizes the base URL.)

---

## Run locally

### 1. MySQL

Create database `ecommerce-db` (or match your JDBC URL). The URL in properties can create the DB if the server allows it.

### 2. API

```bash
cd e-commerce
./mvnw spring-boot:run
```

**Windows:**

```powershell
cd e-commerce
.\mvnw.cmd spring-boot:run
```

API: **http://localhost:8080**

### 3. Frontend

```bash
cd frontend-ecommerce
npm install
npm run dev
```

Or with pnpm: `pnpm install` && `pnpm dev`

App: **http://localhost:3000**

---

## Production build

**API**

```bash
cd e-commerce
./mvnw clean package
java -jar target/e-commerce-0.0.1-SNAPSHOT.jar
```

**Frontend**

```bash
cd frontend-ecommerce
npm run build
npm start
```

Set `NEXT_PUBLIC_BACKEND_URL` to your deployed API URL. Configure CORS / security on the API for your web origin.

---

## Project layout

```
SPRING_NEXT_STORE/
├── e-commerce/                 # Spring Boot API
│   ├── pom.xml
│   └── src/main/java/com/dhairyasingh/ecommerce/
│   └── src/main/resources/application.properties
├── frontend-ecommerce/         # Next.js app
│   ├── src/app/(user)/         # Storefront
│   ├── src/app/(admin)/        # Admin
│   ├── src/components/
│   └── package.json
├── LICENSE
└── README.md
```

---

## Features

- Storefront: categories, products, product detail, cart, register/login, orders  
- Admin: dashboard stats, products & categories CRUD (admin role)  
- JWT-based API security; static uploads under configured `upload.path`

---

## Contributing

1. Fork the repo and create a branch.  
2. Keep commits focused; follow existing style.  
3. Open a PR with a short description and how you tested.

---

## License

[MIT License](./LICENSE)
