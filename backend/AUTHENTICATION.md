# Authentication Module Documentation

## Architecture
The authentication module follows a Clean Architecture design pattern. It separates concerns into different layers:
- **Validators**: (`src/validators`) Validates incoming HTTP requests (body, headers).
- **Controllers**: (`src/controllers`) Handles HTTP request/response formatting. Thin layer.
- **Services**: (`src/services`) Contains all business logic (password hashing, JWT generation, DB interactions).
- **Models**: (`src/models`) Mongoose schemas defining the data structure.

## Folder Structure
```text
backend/
├── src/
│   ├── models/
│   │   └── User.js               # User schema definition
│   ├── validators/
│   │   └── authValidator.js      # Request body validations
│   ├── services/
│   │   └── authService.js        # Business logic for auth
│   ├── controllers/
│   │   └── authController.js     # Express route handlers
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protection middleware
│   └── routes/
│       └── authRoutes.js         # API route definitions
```

## JWT Flow & Authentication Flow
1. **Registration**: User submits `name`, `email`, `password`. The system validates the input, checks for duplicates, hashes the password via `bcryptjs`, and saves to MongoDB.
2. **Login**: User submits `email` and `password`. The system checks if the user exists, compares the hashed password, and if valid, generates a JSON Web Token (JWT).
3. **Protected Routes**: Client sends the JWT in the `Authorization: Bearer <token>` header. `authMiddleware` verifies the token, decodes it, and attaches the payload to `req.user`.

## Endpoints

### 1. Register User
- **Method**: `POST`
- **URL**: `/api/v1/auth/register`
- **Request Example**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password123"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": { ... }
    }
  }
  ```

### 2. Login User
- **Method**: `POST`
- **URL**: `/api/v1/auth/login`
- **Request Example**:
  ```json
  {
    "email": "jane@example.com",
    "password": "Password123"
  }
  ```
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": { ... },
      "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
    }
  }
  ```

### 3. Get Current User (Protected)
- **Method**: `GET`
- **URL**: `/api/v1/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response (Success)**:
  ```json
  {
    "success": true,
    "message": "User profile fetched successfully",
    "data": {
      "user": { ... }
    }
  }
  ```

## Error Codes
All errors are returned in a standard format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```
- **400 Bad Request**: Validation failed (e.g., weak password, invalid email).
- **401 Unauthorized**: Invalid credentials, missing token, or expired token. Note: Returns a generic message "Invalid email or password" to prevent user enumeration.
- **404 Not Found**: Endpoint does not exist.
- **409 Conflict**: Email already registered.
- **500 Internal Server Error**: Unexpected server faults.

## Security Decisions
- **Password Hashing**: Done in the Service layer using `bcryptjs` with a salt factor of 10. Passwords are never stored in plain text and never returned in API responses (handled by `select: false` in Mongoose schema).
- **Generic Login Errors**: We deliberately do not specify whether the email was wrong or the password was wrong. This prevents attackers from guessing registered emails.
- **Data Validation**: `express-validator` strictly enforces constraints before the controller is even hit.
- **JWT Lifespan**: Set to 7 days, providing a balance between security and user convenience.

## Testing Guide
To test the APIs, use Postman or cURL.
1. Start MongoDB.
2. Run `npm run dev` in the backend directory.
3. Call `POST /api/v1/auth/register` to create a user.
4. Try registering again with the same email to test duplicate rejection (409).
5. Call `POST /api/v1/auth/login` with incorrect password to verify generic 401 error.
6. Login with correct credentials and capture the token.
7. Call `GET /api/v1/auth/me` providing the token in the `Authorization` header to test the protected route.
