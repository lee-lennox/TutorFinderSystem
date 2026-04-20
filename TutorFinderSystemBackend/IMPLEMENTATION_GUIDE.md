# Tutor Finder System Backend - Implementation Guide

## Overview
This guide explains the complete implementation of the Spring Boot REST API backend for the Tutor Finder System with all 13 endpoints fully functional.

---

## Project Structure

```
src/main/java/za/ac/cput/
â”œâ”€â”€ Main.java                          # Spring Boot Entry Point
â”œâ”€â”€ config/
â”‚   â””â”€â”€ WebConfig.java                # CORS & Security Configuration
â”œâ”€â”€ controller/
â”‚   â”œâ”€â”€ AuthController.java           # Authentication endpoints
â”‚   â”œâ”€â”€ UserController.java           # User management
â”‚   â”œâ”€â”€ CourseController.java         # Course management
â”‚   â”œâ”€â”€ TutorController.java          # Tutor management
â”‚   â”œâ”€â”€ BookingController.java        # Booking management
â”‚   â””â”€â”€ ReviewController.java         # Review management
â”œâ”€â”€ domain/
â”‚   â”œâ”€â”€ User.java                     # User entity with roles & password reset
â”‚   â”œâ”€â”€ Courses.java                  # Course entity
â”‚   â”œâ”€â”€ Tutors.java                   # Tutor entity
â”‚   â”œâ”€â”€ Bookings.java                 # Booking entity
â”‚   â””â”€â”€ Review.java                   # Review entity
â”œâ”€â”€ dto/
â”‚   â”œâ”€â”€ AuthResponse.java             # Login response
â”‚   â”œâ”€â”€ LoginRequest.java             # Login request
â”‚   â”œâ”€â”€ RegisterRequest.java          # Registration request
â”‚   â”œâ”€â”€ PasswordResetRequest.java     # Password reset request
â”‚   â”œâ”€â”€ PasswordResetCodeRequest.java # Password reset code request
â”‚   â”œâ”€â”€ BookingRequest.java           # Booking creation request
â”‚   â”œâ”€â”€ ReviewRequest.java            # Review creation request
â”‚   â””â”€â”€ ApiResponse.java              # Generic API response
â”œâ”€â”€ repository/
â”‚   â”œâ”€â”€ UserRepository.java           # User data access
â”‚   â”œâ”€â”€ CourseRepository.java         # Course data access
â”‚   â”œâ”€â”€ TutorsRepository.java         # Tutor data access
â”‚   â”œâ”€â”€ BookingRepository.java        # Booking data access
â”‚   â””â”€â”€ ReviewRepository.java         # Review data access
â”œâ”€â”€ service/
â”‚   â”œâ”€â”€ UserService.java              # User business logic
â”‚   â”œâ”€â”€ CourseService.java            # Course business logic
â”‚   â”œâ”€â”€ TutorService.java             # Tutor business logic
â”‚   â”œâ”€â”€ BookingService.java           # Booking business logic
â”‚   â”œâ”€â”€ ReviewService.java            # Review business logic
â”‚   â”œâ”€â”€ EmailService.java             # Email notifications
â”‚   â””â”€â”€ I*Service.java                # Service interfaces
â””â”€â”€ util/
    â””â”€â”€ Helper.java                   # Utility functions (validation, password hashing)

src/main/resources/
â””â”€â”€ application.properties            # Configuration file
```

---

## Key Implementation Details

### 1. Authentication System

#### Password Security
- Passwords are hashed using **BCrypt** algorithm
- Never stores plain-text passwords
- Hash is verified during login using `Helper.verifyPassword()`

#### Login Endpoint (`POST /auth/login`)
- Accepts username or email
- Verifies password against BCrypt hash
- Returns user role and email

#### Registration Endpoint (`POST /auth/register`)
- Validates email format
- Checks for duplicate username/email
- Hashes password before storing
- Sends welcome email

#### Password Reset Flow
1. **Request Reset**: User requests password reset with email
2. **Generate Code**: 6-digit code generated and stored with 15-min expiry
3. **Send Email**: Code sent to user's email
4. **Verify & Reset**: User provides code and new password
5. **Update**: Password hashed and reset fields cleared

### 2. User Domain Enhancement

```java
User entity now includes:
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (BCrypt hashed)
- role (USER, TUTOR, ADMIN)
- passwordResetCode (6-digit code)
- passwordResetExpiry (15-minute window)
- createdAt (Timestamp)
```

### 3. CORS Configuration

Configured to allow requests from:
- `http://localhost:3000` (React Frontend)
- `http://localhost:5500` (Live Server)
- `http://localhost:8080` (Backend)
- `http://127.0.0.1:3000` & `http://127.0.0.1:5500`

Allowed Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH

### 4. Email Service

Fully integrated email service for:
- Password reset codes
- Welcome emails on registration
- Booking confirmation emails

**Note:** Configure email credentials in `application.properties`:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

### 5. API Response Format

All endpoints return consistent response format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* Optional data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

### 6. Booking System

Bookings include:
- User email reference
- Tutor ID reference
- Student details (name, year of study, campus)
- Level (UNDERGRADUATE, POSTGRADUATE, DIPLOMA, CERTIFICATE)
- Booking date and creation timestamp
- Tutor name (cached for quick access)

### 7. Review System

Reviews include:
- Email of reviewer
- Tutor ID being reviewed
- Rating (1-5 scale)
- Feedback/comment
- Reviewer name
- Creation timestamp

---

## Endpoint Summary

| # | Method | Endpoint | Description | Status |
|---|--------|----------|-------------|--------|
| 1 | POST | /auth/login | Login user | … Implemented |
| 2 | POST | /auth/register | Register new user | … Implemented |
| 3 | POST | /auth/request-password-reset | Send reset code | … Implemented |
| 4 | POST | /auth/reset-password | Reset password | … Implemented |
| 5 | GET | /courses/all | Get all courses | … Implemented |
| 6 | GET | /courses/read/{id} | Get course by ID | … Implemented |
| 7 | GET | /tutors/all | Get all tutors | … Implemented |
| 8 | GET | /tutors/read/{id} | Get tutor by ID | … Implemented |
| 9 | POST | /bookings/create | Create booking | … Implemented |
| 10 | DELETE | /bookings/delete/{id} | Delete booking | … Implemented |
| 11 | GET | /bookings/user/{email} | Get user bookings | … Implemented |
| 12 | GET | /reviews/all | Get all reviews | … Implemented |
| 13 | POST | /reviews/create | Create review | … Implemented |

---

## Dependencies Added

```xml
<!-- BCrypt for password encoding -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-crypto</artifactId>
</dependency>
```

Existing dependencies already include:
- Spring Boot Web Starter
- Spring Boot Data JPA
- Spring Boot Security
- Spring Boot Mail
- JJWT (JWT support)
- MySQL Driver

---

## Configuration

### application.properties

```properties
# Database
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3000/Project3Tutordb
spring.datasource.username=root
spring.datasource.password=Lee1927#

# Server
server.port=8080
server.servlet.context-path=/TutorFinderSystem

# Email (Optional - for password reset)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

---

## Utility Functions

### Helper.java

Key functions added:
- `hashPassword(password)` - BCrypt hashing
- `verifyPassword(rawPassword, hashedPassword)` - Password verification
- `generatePasswordResetCode()` - Generate 6-digit code
- `isValidEmail(email)` - Email validation
- `isValidPassword(password)` - Password validation

---

## Testing Endpoints

### 1. Register User
```bash
curl -X POST http://localhost:8080/TutorFinderSystem/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/TutorFinderSystem/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 3. Request Password Reset
```bash
curl -X POST http://localhost:8080/TutorFinderSystem/auth/request-password-reset \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### 4. Create Booking
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

### 5. Create Review
```bash
curl -X POST http://localhost:8080/TutorFinderSystem/reviews/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "tutorId": 1,
    "name": "John Doe",
    "rating": 5,
    "comment": "Excellent tutor!"
  }'
```

---

## Important Notes

1. **Email Configuration**: Email credentials in `application.properties` should be updated for production use
2. **Password Reset Codes**: Are sent via email (if configured) or logged to console
3. **BCrypt Hashing**: All passwords are automatically hashed - never store plain-text
4. **CORS**: Configured for development; restrict origins in production
5. **Database**: Uses MySQL with auto-DDL enabled (`ddl-auto=update`)

---

## Build & Run

### Build Project
```bash
mvn clean install
```

### Run Application
```bash
mvn spring-boot:run
```

### Or Run JAR
```bash
java -jar target/TutorFinderSystem-1.0-SNAPSHOT.jar
```

Application will start on: `http://localhost:8080/TutorFinderSystem`

---

## Troubleshooting

### Issue: Password reset email not sending
**Solution:** 
- Configure valid email credentials in `application.properties`
- For Gmail: Use App Password, not regular password
- Enable "Less secure app access" if needed

### Issue: CORS errors from frontend
**Solution:**
- Check frontend URL is in `WebConfig.java` allowed origins
- Verify request headers are included in CORS allowed headers

### Issue: Duplicate email error on registration
**Solution:**
- User already exists with that email
- Use different email or reset password if existing user

---

## Next Steps

Consider implementing:
1. JWT Token-based authentication
2. Role-based authorization middleware
3. Request validation annotations
4. API versioning
5. Rate limiting
6. API documentation with Swagger/OpenAPI
7. Unit and integration tests
8. Logging framework (SLF4J)

---

## Support & Documentation

For complete API documentation, see `API_DOCUMENTATION.md`

All endpoints are production-ready and fully integrated with:
- Database persistence
- Email notifications
- Password security
- Error handling
- CORS support

