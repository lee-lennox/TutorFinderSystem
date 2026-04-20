# Tutor Finder System - REST API Documentation

## Base URL
```
http://localhost:8080/TutorFinderSystem
```

## Server Configuration
- **Port:** 8080
- **Context Path:** /TutorFinderSystem
- **CORS Enabled:** Yes (allows requests from localhost:3000, localhost:5500)

---

## Authentication Endpoints

### 1. POST /auth/login
**Description:** Authenticate user and return user data

**Request:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login successful",
  "email": "john@example.com",
  "role": "USER"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. POST /auth/register
**Description:** Register new user

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": 1
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### 3. POST /auth/request-password-reset
**Description:** Send reset code to email

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password reset code sent to email"
}
```

---

### 4. POST /auth/reset-password
**Description:** Reset password with verification code

**Request:**
```json
{
  "email": "john@example.com",
  "code": "123456",
  "newPassword": "newpassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## Courses Endpoints

### 5. GET /courses/all
**Description:** Get all available courses

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Advanced Java",
    "code": "JAVA101",
    "description": "Learn advanced Java programming",
    "imageUrl": "https://..."
  },
  {
    "id": 2,
    "name": "Python Basics",
    "code": "PY101",
    "description": "Introduction to Python",
    "imageUrl": "https://..."
  }
]
```

---

### 6. GET /courses/read/{id}
**Description:** Get single course by ID

**Request:** `GET /courses/read/1`

**Response (200):**
```json
{
  "id": 1,
  "name": "Advanced Java",
  "code": "JAVA101",
  "description": "Learn advanced Java programming",
  "imageUrl": "https://..."
}
```

---

## Tutors Endpoints

### 7. GET /tutors/all
**Description:** Get all tutors

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "James Smith",
    "specialization": "Java Development",
    "description": "Expert in Java with 10+ years experience",
    "location": "Cape Town",
    "availableTime": "Mon-Fri 3PM-6PM",
    "imageUrl": "https://..."
  }
]
```

---

### 8. GET /tutors/read/{id}
**Description:** Get single tutor by ID

**Request:** `GET /tutors/read/1`

**Response (200):**
```json
{
  "id": 1,
  "name": "James Smith",
  "specialization": "Java Development",
  "description": "Expert in Java with 10+ years experience",
  "location": "Cape Town",
  "availableTime": "Mon-Fri 3PM-6PM",
  "imageUrl": "https://..."
}
```

---

## Bookings Endpoints

### 9. POST /bookings/create
**Description:** Create new booking

**Request:**
```json
{
  "email": "student@example.com",
  "tutorId": 1,
  "courseId": 1,
  "firstName": "John",
  "lastName": "Doe",
  "yearOfStudy": "2nd Year",
  "campus": "Main Campus",
  "level": "UNDERGRADUATE"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": 5
}
```

---

### 10. DELETE /bookings/delete/{id}
**Description:** Delete booking by ID

**Request:** `DELETE /bookings/delete/5`

**Response (200):**
```json
{
  "success": true,
  "message": "Booking deleted successfully"
}
```

---

### 11. GET /bookings/user/{email}
**Description:** Get all bookings for a user by email

**Request:** `GET /bookings/user/student@example.com`

**Response (200):**
```json
[
  {
    "id": 1,
    "email": "student@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "tutorName": "James Smith",
    "yearOfStudy": "2nd Year",
    "campus": "Main Campus",
    "level": "UNDERGRADUATE",
    "bookingDate": "2026-03-04T10:30:00",
    "createdAt": "2026-03-04T09:00:00"
  }
]
```

---

## Reviews Endpoints

### 12. GET /reviews/all
**Description:** Get all reviews

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "tutorId": 1,
    "rating": 5,
    "feedback": "Excellent tutor! Very helpful.",
    "createdAt": "2026-03-04T10:30:00"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "tutorId": 1,
    "rating": 4,
    "feedback": "Great session, very informative.",
    "createdAt": "2026-03-03T14:20:00"
  }
]
```

---

### 13. POST /reviews/create
**Description:** Create new review

**Request:**
```json
{
  "email": "student@example.com",
  "tutorId": 1,
  "name": "John Doe",
  "rating": 5,
  "comment": "Excellent tutor! Very helpful and patient."
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Review created successfully",
  "data": 10
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Rating must be between 1 and 5"
}
```

---

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Email and TutorId are required"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Tutor not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Failed to create booking: [error details]"
}
```

---

## Authentication

Currently, the API uses role-based access control but does not use JWT tokens yet. 

### Supported Roles:
- `USER` - Regular user/student
- `TUTOR` - Tutor user
- `ADMIN` - Administrator

### Password Security:
- Passwords are hashed using BCrypt
- Password reset codes are 6-digit codes sent via email
- Reset codes expire after 15 minutes

---

## Features Implemented

… User Authentication (Login & Registration)
… Password Reset with Email Verification
… Course Management (CRUD operations)
… Tutor Management (CRUD operations)
… Bookings Management (Create, Read, Update, Delete)
… Reviews System (Create, Read, Update, Delete)
… Role-Based Access Control
… Password Hashing with BCrypt
… Email Notifications
… CORS Configuration
… Global Error Handling

---

## Future Enhancements

- JWT Token Implementation for stateless authentication
- Payment Gateway Integration
- Rating System Optimization
- Advanced Search and Filtering
- Real-time Notifications
- Admin Dashboard
- Analytics and Reporting

---

## Testing with cURL

### Example: Login
```bash
curl -X POST http://localhost:8080/TutorFinderSystem/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

### Example: Register
```bash
curl -X POST http://localhost:8080/TutorFinderSystem/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane_doe",
    "email": "jane@example.com",
    "password": "password123"
  }'
```

### Example: Get All Courses
```bash
curl -X GET http://localhost:8080/TutorFinderSystem/courses/all \
  -H "Content-Type: application/json"
```

### Example: Create Booking
```bash
curl -X POST http://localhost:8080/TutorFinderSystem/bookings/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "tutorId": 1,
    "courseId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "yearOfStudy": "2nd Year",
    "campus": "Main Campus",
    "level": "UNDERGRADUATE"
  }'
```

---

## Database Schema

### Key Tables:
- `users` - User accounts with role-based access
- `courses` - Available courses
- `tutors` - Tutor profiles linked to courses
- `bookings` - Booking records
- `reviews` - Review/rating records

---

## Contact & Support
For issues or feature requests, please refer to the project documentation or contact the development team.
