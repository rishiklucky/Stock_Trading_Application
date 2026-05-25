# Swagger/OpenAPI Setup Guide

## Configuration Added

I've configured Swagger/OpenAPI for your Spring Boot application.

## How to Access Swagger UI

After starting your Spring Boot application, access Swagger at:

### Swagger UI (Interactive Documentation)
```
http://localhost:8080/swagger-ui.html
```
or
```
http://localhost:8080/swagger-ui/index.html
```

### OpenAPI JSON Documentation
```
http://localhost:8080/v3/api-docs
```

## Troubleshooting

If you still can't see the APIs:

### 1. Restart the Application
Make sure to restart your Spring Boot application after the configuration changes:
```bash
cd Demo
mvn clean install
mvn spring-boot:run
```

### 2. Check Console Output
When the application starts, you should see logs like:
```
Swagger UI available at: http://localhost:8080/swagger-ui.html
OpenAPI docs available at: http://localhost:8080/v3/api-docs
```

### 3. Verify Controllers are Scanned
Make sure your controllers are in the package: `com.example.demo.controller`

### 4. Check for Errors
Look for any errors in the console related to:
- SpringDoc
- OpenAPI
- Swagger

### 5. Alternative URLs to Try
- http://localhost:8080/swagger-ui/
- http://localhost:8080/swagger-ui/index.html
- http://localhost:8080/swagger-ui.html

## What You Should See

Once working, Swagger UI will display all your API endpoints organized by tags:
- **User Management** - Registration, Login, User operations
- **Stock Market** - Stock listing and details
- **Trading Operations** - Buy/Sell stocks, Portfolio, Transactions

## Configuration Details

The following properties were added to `application.properties`:
```properties
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
springdoc.api-docs.enabled=true
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha
springdoc.packages-to-scan=com.example.demo.controller
springdoc.paths-to-match=/**
```

## Testing the API

Once Swagger UI loads:
1. Expand any endpoint
2. Click "Try it out"
3. Fill in the parameters
4. Click "Execute"
5. See the response

This makes testing your APIs much easier!
