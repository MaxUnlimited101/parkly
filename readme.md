This is an upload of a project for Programming Multilayered Applications with React. I (Maksym Nosal) have been responsible for backend and helped with the frontend.

## Project Structure

- **backend-master/**: Spring Boot backend (Java, Maven, MySQL)
- **parkly-admin-panel-main/**: Admin panel (React, TypeScript, Vite, TailwindCSS)
- **parkly-front-main/**: Mobile app (React Native, Expo)

## Quick Start

### Prerequisites

- Java 17+ (preferably 21)
- Maven
- Node.js & npm
- MySQL Community Server
- Git

### Backend

1. Configure environment variables (see `backend-master/README.md` for AWS/Azure/Docker setup).
2. Build and run:
    ```sh
    cd backend-master
    ./mvnw spring-boot:run
    ```
3. API docs: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

### Admin Panel

1. Install dependencies:
    ```sh
    cd parkly-admin-panel-main
    npm install
    ```
2. Start dev server:
    ```sh
    npm run dev
    ```

### Mobile App

1. Install dependencies:
    ```sh
    cd parkly-front-main
    npm install
    ```
2. Start Expo:
    ```sh
    npx expo start
    ```

## Deployment

- See `backend-master/README.md` for AWS and Azure deployment instructions.
- Docker support available for backend.

## Additional Resources

- Swagger API: `/swagger-ui/index.html`
- ESLint/TypeScript config: see admin panel `README.md`
- For Azure: allow access to Azure services and configure firewall rules for MySQL.

---
For more details, see the individual `README.md` files in each subproject.
