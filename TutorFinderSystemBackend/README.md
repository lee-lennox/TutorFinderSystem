# Tutor Finder System - Backend

A robust Java Spring Boot REST API backend service for the Tutor Finder System, a platform that connects students with qualified tutors. The backend handles user authentication, tutor discovery, course management, booking operations, and administrative functions.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database Setup](#database-setup)
- [Authentication](#authentication)
- [Security Updates](#security-updates)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Overview

The Tutor Finder System Backend is a comprehensive REST API that provides:

- User Management - Registration, login, and role-based access control (Student, Tutor, Admin)
- Tutor Discovery - Search, filter, and view tutor profiles with ratings
- Course Management - Manage and browse available courses and subjects
- Booking System - Schedule, manage, and track tutoring sessions
- Admin Functions - User and content moderation
- Security - JWT-based authentication and Spring Security integration

Fully containerizable and deployable on any Java-compatible environment.

---

## Features

- Secure Authentication - JWT tokens, Spring Security, password encryption
- User Management - Student, Tutor, and Admin roles with permission-based access
- Advanced Search - Filter tutors by subject, location, availability, and rating
- Rating & Reviews - Student ratings and reviews for tutors
- Booking Management - Schedule, reschedule, and cancel tutoring sessions
- Admin Dashboard - User and booking analytics and management
- RESTful API - Industry-standard REST API design
- ORM Integration - Spring Data JPA with Hibernate
- Multi-Database Support - MySQL and PostgreSQL ready
- API Documentation - Comprehensive endpoint documentation
- Security - CORS configured, input validation, XSS protection
- Unit & Integration Tests - Mockito and JUnit 5

---

## Technologies

**Framework & Language:**
- Java 21
- Spring Boot 2.7.18 (Latest 2.x LTS)
- Maven 3.9+ for dependency management

**Database:**
- MySQL Database (Primary)
- PostgreSQL support
- Spring Data JPA with Hibernate ORM

**Security:**
- Spring Security 5.7.11
- JWT (JSON Web Tokens) 0.11.5
- JJWT library for token generation and validation

**Additional Libraries:**
- Lombok for reducing boilerplate code
- Google Authenticator support (2FA-ready)
- RESTful API design principles
- Jackson for JSON processing

**Development & Testing:**
- Mockito 5.2.0 for unit testing
- JUnit 5 (via Spring Boot Test)
- Spring Test for integration tests

**Build & DevOps:**
- Maven with Spring Boot Plugin
- Docker-ready configuration
- Application properties profiles (dev, test, prod)

---

## Prerequisites

Before setting up the backend, ensure you have:

- Java Development Kit (JDK) 21 or higher
- Maven 3.9+ for build management
- MySQL 8.0+ or PostgreSQL 12+ database
- Git for version control
- Postman or cURL for API testing (optional but recommended)

**System Requirements:**
- Minimum RAM: 2GB
- Disk Space: 1GB
- OS: Windows, macOS, or Linux

---

## Installation & Setup

### 1. Clone the Repository

```bash
cd c:\Users\Admin\Desktop\TUTORFINDER\ MOBILE\ SYSTEM
git clone <repository-url>
cd TutorFinderSystemBackend
```

### 2. Verify Java Installation

```bash
java -version
javac -version
```

Expected output: Java 21 or higher

### 3. Verify Maven Installation

```bash
mvn -version
```

### 4. Install Dependencies

```bash
mvn clean install
```

This downloads all required dependencies and compiles the project.

---

## Configuration

### 1. Create Database

**For MySQL:**
```sql
CREATE DATABASE tutorfinder;
CREATE USER 'tutorfinder'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON tutorfinder.* TO 'tutorfinder'@'localhost';
FLUSH PRIVILEGES;
```

**For PostgreSQL:**
```sql
CREATE DATABASE tutorfinder;
CREATE USER tutorfinder WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE tutorfinder TO tutorfinder;
```

### 2. Configure Application Properties

Create or update `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/TutorFinderSystem

# Database Configuration (MySQL)
spring.datasource.url=jdbc:mysql://localhost:3306/tutorfinder
spring.datasource.username=tutorfinder
spring.datasource.password=password123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=your-secret-key-min-32-characters-long-here
jwt.expiration=86400000

# Logging
logging.level.root=INFO
logging.level.za.ac.cput=DEBUG
```

### 3. Environment-Specific Configuration

**Development** (`application-dev.properties`):
```properties
spring.jpa.show-sql=true
logging.level.za.ac.cput=DEBUG
```

**Production** (`application-prod.properties`):
```properties
spring.datasource.url=jdbc:mysql://prod-db-host:3306/tutorfinder
spring.jpa.show-sql=false
logging.level.root=WARN
```

Set active profile:
```bash
export SPRING_PROFILES_ACTIVE=dev  # or prod
```

---

## Running the Application

### Option 1: Using Maven Spring Boot Plugin

```bash
mvn spring-boot:run
```

### Option 2: Build and Run JAR

```bash
# Build the project
mvn clean package

# Run the generated JAR
java -jar target/TutorFinderSystem-1.0-SNAPSHOT.jar
```

### Option 3: Run with Specific Profile

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

### Verify Server is Running

```bash
curl http://localhost:8080/TutorFinderSystem/health
```

Expected response: Server is running (HTTP 200 status)

---

## API Endpoints

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | User login, returns JWT token |
| POST | `/auth/refresh` | Refresh JWT token |
| POST | `/auth/logout` | User logout |

### User Endpoints (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/profile` | Get current user profile |
| PUT | `/user/profile/update` | Update user profile |
| PUT | `/user/change-password` | Change user password |
| GET | `/user/bookings` | Get user's bookings |

### Tutor Endpoints (`/api/tutors`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tutors/all` | Get all tutors (paginated) |
| GET | `/tutors/{id}` | Get tutor by ID |
| GET | `/tutors/search` | Search tutors (filters) |
| POST | `/tutors` | Create tutor profile (admin) |
| PUT | `/tutors/{id}` | Update tutor profile |
| DELETE | `/tutors/{id}` | Delete tutor (admin) |
| GET | `/tutors/{id}/reviews` | Get tutor reviews |

### Course Endpoints (`/api/courses`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses/all` | Get all courses |
| GET | `/courses/{id}` | Get course by ID |
| POST | `/courses` | Create course (admin) |
| PUT | `/courses/{id}` | Update course (admin) |
| DELETE | `/courses/{id}` | Delete course (admin) |
| GET | `/courses/search` | Search courses |

### Booking Endpoints (`/api/bookings`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bookings` | Get user's bookings |
| GET | `/bookings/{id}` | Get booking details |
| POST | `/bookings` | Create new booking |
| PUT | `/bookings/{id}` | Update booking |
| DELETE | `/bookings/{id}/cancel` | Cancel booking |
| GET | `/bookings/{id}/confirm` | Confirm booking |

### Admin Endpoints (`/api/admin`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | Get all users |
| GET | `/admin/bookings` | Get all bookings |
| POST | `/admin/ban-user/{id}` | Ban user |
| DELETE | `/admin/users/{id}` | Delete user |

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed endpoint specifications and request/response examples.

---

## Project Structure

```
TutorFinderSystemBackend/
├── src/
│   ├── main/
│   │   ├── java/za/ac/cput/
│   │   │   ├── controller/          # REST endpoints
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── TutorController.java
│   │   │   │   ├── CourseController.java
│   │   │   │   ├── BookingController.java
│   │   │   │   ├── UserController.java
│   │   │   │   └── AdminController.java
│   │   │   ├── service/             # Business logic
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── TutorService.java
│   │   │   │   ├── CourseService.java
│   │   │   │   ├── BookingService.java
│   │   │   │   └── UserService.java
│   │   │   ├── repository/          # Data access layer
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── TutorRepository.java
│   │   │   │   ├── CourseRepository.java
│   │   │   │   └── BookingRepository.java
│   │   │   ├── entity/              # Database entities/models
│   │   │   │   ├── User.java
│   │   │   │   ├── Tutor.java
│   │   │   │   ├── Course.java
│   │   │   │   ├── Booking.java
│   │   │   │   └── Review.java
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   │   ├── UserDTO.java
│   │   │   │   ├── TutorDTO.java
│   │   │   │   ├── CourseDTO.java
│   │   │   │   └── BookingDTO.java
│   │   │   ├── security/            # Security configuration
│   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── exception/           # Custom exceptions
│   │   │   ├── utils/               # Utility classes
│   │   │   ├── config/              # Configuration classes
│   │   │   └── TutorFinderSystemApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       └── schema.sql
│   └── test/
│       ├── java/za/ac/cput/
│       │   ├── controller/          # Controller tests
│       │   ├── service/             # Service tests
│       │   └── repository/          # Repository tests
│       └── resources/
│           └── application-test.properties
├── pom.xml                          # Maven configuration
├── API_DOCUMENTATION.md             # Detailed API docs
├── QUICK_START.md                   # Quick start guide
└── README.md                        # This file
```

---

## Database Setup

### Automatic Schema Creation

Hibernate automatically creates tables based on entities. Set in `application.properties`:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Options:
- `validate` - Validate schema only
- `update` - Update schema (recommended for development)
- `create` - Drop and recreate schema
- `create-drop` - Create schema, drop on shutdown

### Manual Database Initialization

If needed, import schema:

```bash
mysql -u tutorfinder -p tutorfinder < src/main/resources/schema.sql
```

---

## Authentication

### JWT Token Flow

1. **User Login**
   ```bash
   POST /api/auth/login
   {
     "username": "student@example.com",
     "password": "password123"
   }
   ```

2. **Response with Token**
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "type": "Bearer",
     "expiresIn": 86400
   }
   ```

3. **Use Token in Requests**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8080/TutorFinderSystem/api/user/profile
   ```

### Token Expiration

Tokens expire after 24 hours (configurable in `application.properties`). Use refresh endpoint:

```bash
POST /api/auth/refresh
{
  "token": "CURRENT_TOKEN"
}
```

---

## Security Updates

### Recent CVE Fixes

The project has been updated with the latest secure dependency versions:

- PostgreSQL Driver: Updated to 42.5.5 (fixes CVE-2024-1597 SQL Injection)
- MySQL Connector: Updated to 8.4.0 (fixes CVE-2023-22102 Takeover vulnerability)

All critical and high-severity vulnerabilities have been patched. Run CVE validation:

```bash
mvn dependency-check:check
```

---

## Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn test jacoco:report
```

Test reports generated in: `target/site/jacoco/index.html`

---

## Building for Production

### Create Production JAR

```bash
mvn clean package -P prod
```

### Docker Build (if Dockerfile exists)

```bash
docker build -t tutorfinder-backend:latest .
docker run -p 8080:8080 tutorfinder-backend:latest
```

### Deploy to Server

```bash
scp target/TutorFinderSystem-1.0-SNAPSHOT.jar user@server:/opt/app/
ssh user@server
cd /opt/app/
java -jar TutorFinderSystem-1.0-SNAPSHOT.jar --spring.profiles.active=prod
```

---

## Troubleshooting

### Issue: Connection to database refused
```
Solution: Verify MySQL/PostgreSQL is running and credentials are correct
mysql -u tutorfinder -p (Test connection)
```

### Issue: Port 8080 already in use
```bash
# Find process using port 8080
netstat -ano | findstr :8080  # Windows
lsof -i :8080  # macOS/Linux

# Kill process
taskkill /PID <PID> /F  # Windows
kill -9 <PID>  # macOS/Linux
```

### Issue: JWT token invalid/expired
```
Solution: Request new token via login endpoint
POST /api/auth/login with valid credentials
```

### Issue: Maven build fails
```bash
# Clear Maven cache and rebuild
mvn clean install -U
```

### Issue: Dependencies conflict
```bash
# Check dependency tree
mvn dependency:tree
```

---

## Additional Documentation

- [Quick Start Guide](./QUICK_START.md) - Get running in 5 minutes
- [API Documentation](./API_DOCUMENTATION.md) - Detailed endpoint reference
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md) - Feature details
- [Change Log](./CHANGE_LOG.md) - Version history and updates
- [Frontend Integration](./FRONTEND_INTEGRATION.md) - Mobile/Web integration guide

---

## Contributing

Contributions welcome! Follow these steps:

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

---

## Support & Contact

For issues or questions:
- Open an issue on GitHub
- Check [existing documentation](./API_DOCUMENTATION.md)
- Review [troubleshooting guide](#troubleshooting)

---

## License

This project is part of the TutorFinder System. See main project documentation for licensing details.
