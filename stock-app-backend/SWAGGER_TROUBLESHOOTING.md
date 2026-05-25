# Swagger "No operations defined in spec!" - Fix Guide

## Problem
Swagger UI shows "No operations defined in spec!" error.

## Solution Steps

### Step 1: Update Maven Dependencies
I've updated the SpringDoc version to 2.6.0 (compatible with Spring Boot 4.x).

Run this command to update dependencies:
```bash
cd Demo
mvn clean install -U
```

### Step 2: Restart the Application
```bash
mvn spring-boot:run
```

### Step 3: Access Swagger UI
Try these URLs in order:
1. http://localhost:8080/swagger-ui/index.html
2. http://localhost:8080/swagger-ui.html
3. http://localhost:8080/swagger-ui/

### Step 4: Verify API Docs JSON
Check if the OpenAPI spec is generated:
```
http://localhost:8080/v3/api-docs
```

You should see a JSON response with your API definitions.

## What I Changed

### 1. Updated `pom.xml`
- Changed SpringDoc version from 2.3.0 to 2.6.0
- This version is compatible with Spring Boot 4.x

### 2. Updated `application.properties`
Removed package scanning (let Spring Boot auto-detect):
```properties
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
springdoc.api-docs.enabled=true
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha
springdoc.default-produces-media-type=application/json
springdoc.default-consumes-media-type=application/json
```

### 3. Added `WebConfig.java`
Created a CORS configuration to ensure proper API access.

## Verification Checklist

After restarting, verify:

✅ Application starts without errors
✅ Console shows: "Swagger UI available at..."
✅ http://localhost:8080/v3/api-docs returns JSON
✅ Swagger UI loads at http://localhost:8080/swagger-ui/index.html
✅ You can see 3 sections:
   - User Management
   - Stock Market
   - Trading Operations

## If Still Not Working

### Check 1: Verify Controllers are Loaded
Look for these logs in console:
```
Mapped "{[/api/users/register]}" onto ...
Mapped "{[/api/stocks/]}" onto ...
Mapped "{[/api/trading/buy]}" onto ...
```

### Check 2: Check for Errors
Look for errors containing:
- "springdoc"
- "swagger"
- "openapi"

### Check 3: Verify Package Structure
Ensure your controllers are in: `com.example.demo.controller`

### Check 4: Clean Build
```bash
mvn clean
mvn install
mvn spring-boot:run
```

### Check 5: Check Port
Make sure nothing else is running on port 8080:
```bash
netstat -ano | findstr :8080
```

## Expected Result

Once working, Swagger UI will show:

### User Management
- POST /api/users/register
- POST /api/users/login
- GET /api/users/{userId}
- GET /api/users/username/{username}
- GET /api/users/all
- DELETE /api/users/{userId}

### Stock Market
- GET /api/stocks/
- GET /api/stocks/quote/{symbol}

### Trading Operations
- POST /api/trading/buy
- POST /api/trading/sell
- GET /api/trading/transactions/{userId}
- GET /api/trading/portfolio/{userId}
- GET /api/trading/portfolio

## Quick Test

Once Swagger loads:
1. Expand "POST /api/users/register"
2. Click "Try it out"
3. Enter test data:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```
4. Click "Execute"
5. You should see a 201 Created response

This confirms your API is working!
