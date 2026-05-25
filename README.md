# Stock Trading Application

A full-stack stock trading demo application built with a Spring Boot backend and a React frontend.

## Overview

This project demonstrates a stock trading platform with user authentication, stock market data retrieval, portfolio management, trading operations, and interactive charts.

## Key Features

- User registration and login
- Stock market browsing and search by symbol
- Buy and sell stocks
- Portfolio view with real-time holdings
- Transaction history display
- Interactive charts for stock performance and portfolio distribution
- Swagger API documentation for backend endpoints

## Tech Stack

- Backend: Java 17, Spring Boot, Spring Data JPA, MySQL
- Frontend: React, React Router, Axios, Chart.js / react-chartjs-2
- API documentation: Springdoc OpenAPI / Swagger UI

## Architecture

- `stock-app-backend/` - Spring Boot REST API and data layer
- `stock-app-frontend/` - React single-page application

## Setup

### 1. Backend

1. Navigate to the backend folder:
   ```bash
   cd stock-app-backend
   ```
2. Update database credentials in `src/main/resources/application.properties` if needed.
3. Build and run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend runs on `http://localhost:8081` by default.

### 2. Frontend

1. Navigate to the frontend folder:
   ```bash
   cd stock-app-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the React app:
   ```bash
   npm start
   ```

The frontend runs on `http://localhost:3000` by default and calls the backend API.

## API Documentation

After starting the backend, access Swagger UI at:

- `http://localhost:8081/swagger-ui.html`

## Project Notes

- The backend uses `spring.jpa.hibernate.ddl-auto=update`, so database tables are created automatically.
- MySQL connection settings are configured in `stock-app-backend/src/main/resources/application.properties`.
- Build artifacts are ignored by `.gitignore` so the repository remains clean.

## Recommended Resume Link

Once pushed, use the GitHub repo URL in your resume:

`https://github.com/rishiklucky/Stock_Trading_Application`

## Git Setup

To initialize and connect this project to the remote repository:

```bash
cd "c:/MRU/3-2/Java Projects/stock-app-demo/stock-app-demo"
git init
Git remote add origin https://github.com/rishiklucky/Stock_Trading_Application.git
git add .
git commit -m "Initial commit: stock trading application"
git branch -M main
git push -u origin main
```

If your local git credentials are not configured, configure them first or use GitHub CLI.
