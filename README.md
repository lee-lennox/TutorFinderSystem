# 🎓 Tutor Finder System

A complete, full-stack **Tutor Finder Platform** that connects students with qualified tutors. This system includes a modern mobile application built with React Native and a robust backend API built with Spring Boot.

**Live Demo** | **Documentation** | **Contributing** | **License**

---

## 🌟 System Overview

The **Tutor Finder System** is a comprehensive platform designed to bridge the gap between students seeking academic help and tutors offering specialized instruction. The system consists of:

- 📱 **Mobile App** - Cross-platform React Native application (iOS, Android, Web)
- 🔧 **Backend API** - RESTful Spring Boot service with JWT authentication
- 🗄️ **Database** - MySQL/PostgreSQL with Spring Data JPA
- 🔐 **Security** - Spring Security, JWT tokens, encrypted passwords

---

## 🎯 Quick Start (All-in-One)

### Prerequisites

**Global Requirements:**
- Git for version control
- Postman or cURL for API testing (optional)

**Backend Requirements:**
- Java 21+
- Maven 3.9+
- MySQL 8.0+ or PostgreSQL 12+

**Mobile Requirements:**
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator/Xcode (macOS) or Android Studio (all platforms)

### One-Command Setup

#### Option 1: Backend Only (5 minutes)
```bash
cd TutorFinderSystemBackend
mvn clean install
mvn spring-boot:run
```
Backend running on: `http://localhost:8080/TutorFinderSystem`

#### Option 2: Mobile Only (5 minutes)
```bash
cd TutorFinderMobile
npm install
npm start
```

#### Option 3: Full Stack (10 minutes)

**Terminal 1 - Start Backend:**
```bash
cd TutorFinderSystemBackend
mvn clean install
mvn spring-boot:run
```

**Terminal 2 - Start Mobile:**
```bash
cd TutorFinderMobile
npm install
npm start
```

Then press:
- `a` for Android emulator
- `i` for iOS simulator
- `w` for web browser
- or scan QR code with Expo Go app

---

## 📁 Project Structure

```
TUTORFINDER MOBILE SYSTEM/
├── README.md                          # This file
├── TutorFinderMobile/                 # React Native Mobile App
│   ├── README.md                      # Mobile app documentation
│   ├── package.json                   # Dependencies
│   ├── app.json                       # Expo configuration
│   ├── src/
│   │   ├── screens/                   # Screen components
│   │   ├── services/                  # API services
│   │   ├── components/                # Reusable components
│   │   ├── navigation/                # Navigation setup
│   │   ├── styles/                    # Theme & styling
│   │   └── types/                     # TypeScript definitions
│   ├── QUICK_START.md
│   ├── COMPLETE_GUIDE.md
│   └── IMPLEMENTATION_STATUS.md
│
├── TutorFinderSystemBackend/          # Spring Boot Backend API
│   ├── README.md                      # Backend documentation
│   ├── pom.xml                        # Maven configuration
│   ├── src/
│   │   ├── main/java/za/ac/cput/
│   │   │   ├── controller/            # REST endpoints
│   │   │   ├── service/               # Business logic
│   │   │   ├── repository/            # Data access
│   │   │   ├── entity/                # Database models
│   │   │   ├── dto/                   # Data transfer objects
│   │   │   ├── security/              # JWT & security config
│   │   │   └── config/                # App configuration
│   │   └── test/                      # Unit & integration tests
│   ├── QUICK_START.md
│   ├── API_DOCUMENTATION.md
│   └── IMPLEMENTATION_GUIDE.md
│
└── Design Tutor Picker Website/       # Frontend Web App (separate)
```

---

## 📱 Mobile App (`TutorFinderMobile`)

A cross-platform React Native application for discovering tutors, booking sessions, and managing profiles.

### Tech Stack
- **Framework:** React Native with Expo
- **Language:** TypeScript
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Navigation:** React Navigation
- **Styling:** Tailwind CSS (Web), React Native defaults

### Features
✅ User authentication (login/register)  
✅ Tutor discovery with search & filters  
✅ Tutor ratings & reviews  
✅ Booking management  
✅ User profiles  
✅ Course browsing  
✅ Dark/Light theme support  
✅ iOS, Android, Web support  

### Quick Start
```bash
cd TutorFinderMobile
npm install
npm start

# Choose platform:
# Press 'a' for Android
# Press 'i' for iOS
# Press 'w' for Web
```

**Full Documentation:** [TutorFinderMobile/README.md](./TutorFinderMobile/README.md)

---

## 🔧 Backend API (`TutorFinderSystemBackend`)

A robust Spring Boot REST API providing authentication, tutor discovery, course management, and booking operations.

### Tech Stack
- **Language:** Java 21
- **Framework:** Spring Boot 2.7.18 (LTS)
- **Build Tool:** Maven 3.9+
- **Database:** MySQL 8.0+ / PostgreSQL 12+
- **Security:** Spring Security + JWT
- **ORM:** Spring Data JPA + Hibernate

### Features
✅ User management (Student, Tutor, Admin roles)  
✅ JWT-based authentication  
✅ RESTful API design  
✅ Advanced search & filtering  
✅ Booking & scheduling system  
✅ Admin dashboard  
✅ Unit & integration tests  
✅ CVE-patched dependencies  

### Quick Start
```bash
cd TutorFinderSystemBackend

# Setup database (MySQL)
mysql -u root -p
CREATE DATABASE tutorfinder;
CREATE USER 'tutorfinder'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON tutorfinder.* TO 'tutorfinder'@'localhost';
FLUSH PRIVILEGES;

# Build and run
mvn clean install
mvn spring-boot:run

# Server running on: http://localhost:8080/TutorFinderSystem
```

**Full Documentation:** [TutorFinderSystemBackend/README.md](./TutorFinderSystemBackend/README.md)

---

## 🔗 API Integration

The mobile app communicates with the backend via REST API:

### Core Endpoints

**Authentication:**
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login, get JWT token
POST   /api/auth/refresh           # Refresh token
```

**Tutors:**
```
GET    /api/tutors/all             # Get all tutors
GET    /api/tutors/{id}            # Get tutor details
GET    /api/tutors/search          # Search tutors
```

**Courses:**
```
GET    /api/courses/all            # Get all courses
GET    /api/courses/{id}           # Get course details
```

**Bookings:**
```
GET    /api/bookings               # Get user's bookings
POST   /api/bookings               # Create booking
PUT    /api/bookings/{id}          # Update booking
DELETE /api/bookings/{id}/cancel   # Cancel booking
```

**User:**
```
GET    /api/user/profile           # Get profile
PUT    /api/user/profile/update    # Update profile
```

See [API_DOCUMENTATION.md](./TutorFinderSystemBackend/API_DOCUMENTATION.md) for complete endpoint reference.

---

## 🗄️ Database Schema

### Core Entities

```sql
-- Users table (Students, Tutors, Admins)
users (id, username, email, password, role, created_at)

-- Tutors table
tutors (id, user_id, bio, qualifications, hourly_rate, rating, created_at)

-- Courses table
courses (id, name, description, subject, level, created_at)

-- Bookings table
bookings (id, student_id, tutor_id, course_id, start_time, end_time, status, created_at)

-- Reviews table
reviews (id, student_id, tutor_id, rating, comment, created_at)
```

Database auto-creates via Hibernate with `spring.jpa.hibernate.ddl-auto=update`

---

## 🔐 Security

### Authentication Flow

1. User registers → hashed password stored
2. User logs in → JWT token issued
3. Mobile app stores token securely
4. All API requests include token in header:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```
5. Backend validates token, processes request
6. Token expires after 24 hours → user refreshes or re-logs in

### Security Features

- ✅ Spring Security framework
- ✅ Password encryption (bcrypt)
- ✅ JWT token validation
- ✅ CORS configuration
- ✅ Input validation & sanitization
- ✅ XSS protection
- ✅ CSRF protection (for form submissions)
- ✅ CVE-patched dependencies (PostgreSQL 42.5.5, MySQL 8.4.0)

---

## 🧪 Testing

### Backend Tests

```bash
cd TutorFinderSystemBackend

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Generate coverage report
mvn test jacoco:report
```

### Mobile Tests

```bash
cd TutorFinderMobile

# Lint code
npm run lint

# (Unit tests setup available in test/ directory)
```

---

## 📚 Documentation

### Mobile App
- [README.md](./TutorFinderMobile/README.md) - Complete mobile app guide
- [QUICK_START.md](./TutorFinderMobile/QUICK_START.md) - 5-minute setup
- [COMPLETE_GUIDE.md](./TutorFinderMobile/COMPLETE_GUIDE.md) - In-depth guide
- [IMPLEMENTATION_STATUS.md](./TutorFinderMobile/IMPLEMENTATION_STATUS.md) - Feature status
- [CUSTOMIZATION_GUIDE.md](./TutorFinderMobile/CUSTOMIZATION_GUIDE.md) - Customization

### Backend API
- [README.md](./TutorFinderSystemBackend/README.md) - Complete backend guide
- [QUICK_START.md](./TutorFinderSystemBackend/QUICK_START.md) - 5-minute setup
- [API_DOCUMENTATION.md](./TutorFinderSystemBackend/API_DOCUMENTATION.md) - API reference
- [IMPLEMENTATION_GUIDE.md](./TutorFinderSystemBackend/IMPLEMENTATION_GUIDE.md) - Implementation details
- [CHANGE_LOG.md](./TutorFinderSystemBackend/CHANGE_LOG.md) - Version history

---

## 🚀 Deployment

### Backend Deployment

**Using Docker:**
```bash
cd TutorFinderSystemBackend
docker build -t tutorfinder-backend:latest .
docker run -p 8080:8080 tutorfinder-backend:latest
```

**On Server:**
```bash
# Build JAR
mvn clean package

# Copy to server
scp target/TutorFinderSystem-1.0-SNAPSHOT.jar user@server:/opt/app/

# Run on server
ssh user@server
cd /opt/app/
java -jar TutorFinderSystem-1.0-SNAPSHOT.jar --spring.profiles.active=prod
```

### Mobile Deployment

**iOS App Store:**
```bash
cd TutorFinderMobile
eas build --platform ios
eas submit --platform ios
```

**Google Play Store:**
```bash
eas build --platform android
eas submit --platform android
```

**Web Deployment:**
```bash
npm run build
# Deploy the `dist` folder to any web server
```

---

## 🛠️ Development Workflow

### For Backend Developers

1. Clone the repo and open `TutorFinderSystemBackend` in your IDE
2. Configure database in `application.properties`
3. Run: `mvn spring-boot:run`
4. API available at `http://localhost:8080/TutorFinderSystem`
5. Make changes, commit, and push to feature branch

### For Mobile Developers

1. Clone the repo and open `TutorFinderMobile` directory
2. Run: `npm install`
3. Run: `npm start`
4. Choose platform (iOS/Android/Web)
5. Make changes, they hot-reload automatically
6. Commit and push to feature branch

### For Full-Stack Developers

1. Start backend (Terminal 1)
2. Start mobile (Terminal 2)
3. Mobile will connect to backend API
4. Test end-to-end functionality
5. Commit both changes together with descriptive message

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8080
kill -9 <PID>
```

**Database connection failed:**
```bash
# Verify MySQL is running
mysql -u tutorfinder -p

# Check connection string in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/tutorfinder
```

**Maven build fails:**
```bash
mvn clean install -U
```

### Mobile Issues

**Port 8081 already in use:**
```bash
npm start -- --clear
```

**Node modules issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Emulator not responding:**
```bash
# Android: Restart emulator
# iOS: Close simulator and reopen from Xcode
npm start -- --clear
```

See individual project READMEs for more troubleshooting.

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to contribute:

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes and commit: `git commit -m 'Add amazing feature'`
5. **Push** to your fork: `git push origin feature/amazing-feature`
6. **Open** a Pull Request with a clear description

### Contribution Guidelines
- Follow existing code style and conventions
- Write unit tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Provide clear commit messages

### Areas for Contribution
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🧪 Test coverage
- 🎨 UI/UX improvements
- 🔐 Security enhancements

---

## 📊 Project Statistics

- **Backend:** Java Spring Boot, 47+ classes, 90%+ test coverage
- **Mobile:** React Native, 50+ screens/components, cross-platform
- **Database:** MySQL with JPA/Hibernate
- **API Endpoints:** 30+ RESTful endpoints
- **Authentication:** JWT-based with role management

---

## 🔄 Version History

### v1.0.0 - Release (April 2026)
- ✅ Full stack implementation
- ✅ Mobile app (iOS, Android, Web)
- ✅ REST API with JWT auth
- ✅ User authentication & authorization
- ✅ Tutor discovery & booking
- ✅ Admin dashboard
- ✅ Unit & integration tests
- ✅ CVE vulnerabilities patched

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team & Contact

- **Backend Developer:** Java/Spring Boot specialist
- **Mobile Developer:** React Native specialist
- **Database Admin:** MySQL/PostgreSQL expert

For questions or support:
- 📧 Email: support@tutorfinder.com
- 💬 GitHub Issues: [Open an issue](../../issues)
- 📖 Documentation: [Wiki](../../wiki)

---

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) - Mobile framework
- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework
- [Expo](https://expo.dev/) - React Native tooling
- [Maven](https://maven.apache.org/) - Build management
- [JWT](https://jwt.io/) - Secure token authentication

---

## 📅 Project Timeline

```
Apr 2024 - Project Kickoff
Jun 2024 - Backend API v1
Aug 2024 - Mobile App v1
Oct 2024 - Security Updates & CVE Fixes
Jan 2026 - Full System Integration
Apr 2026 - v1.0 Release 🎉
```

---

## 🎯 Roadmap

### Q2 2026
- [ ] Payment integration (Stripe)
- [ ] Video call integration
- [ ] Analytics dashboard

### Q3 2026
- [ ] AI-powered tutor recommendations
- [ ] Scheduling optimization
- [ ] Performance monitoring

### Q4 2026
- [ ] Mobile app offline mode
- [ ] Real-time notifications
- [ ] Advanced reporting

---

**⭐ If this project helps you, please star it on GitHub!**

**Made with ❤️ by the Tutor Finder Team**
