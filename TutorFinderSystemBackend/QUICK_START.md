# Quick Start Guide - Tutor Finder System API

## ðŸš€ Start the Backend

```bash
# Navigate to project directory
cd c:\Users\Admin\Desktop\TutorFinderSystemBackend

# Build and run
mvn spring-boot:run

# Or build and run JAR
mvn clean install
java -jar target/TutorFinderSystem-1.0-SNAPSHOT.jar
```

**Server will start on:** `http://localhost:8080/TutorFinderSystem`

---

## ðŸ§ª Quick Test Commands

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

### 3. Get All Courses
```bash
curl http://localhost:8080/TutorFinderSystem/courses/all
```

### 4. Get All Tutors
```bash
curl http://localhost:8080/TutorFinderSystem/tutors/all
```

### 5. Get All Reviews
```bash
curl http://localhost:8080/TutorFinderSystem/reviews/all
```

### 6. Create Booking
```bash
curl -X POST http://localhost:8080/TutorFinderSystem/bookings/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "tutorId": 1,
    "courseId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "yearOfStudy": "2nd Year",
    "campus": "Main Campus",
    "level": "UNDERGRADUATE"
  }'
```

### 7. Create Review
```bash
curl -X POST http://localhost:8080/TutorFinderSystem/reviews/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "tutorId": 1,
    "name": "John Doe",
    "rating": 5,
    "comment": "Excellent tutor!"
  }'
```

---

## ðŸ“± Frontend Setup

### Using with React (Create React App)

1. **Create API Service** (`src/services/api.js`)
```javascript
const API_BASE_URL = 'http://localhost:8080/TutorFinderSystem';

export const auth = {
  login: (username, password) => 
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(r => r.json()),
  
  register: (username, email, password) =>
    fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    }).then(r => r.json())
};

export const courses = {
  getAll: () => fetch(`${API_BASE_URL}/courses/all`).then(r => r.json()),
  getById: (id) => fetch(`${API_BASE_URL}/courses/read/${id}`).then(r => r.json())
};

export const tutors = {
  getAll: () => fetch(`${API_BASE_URL}/tutors/all`).then(r => r.json()),
  getById: (id) => fetch(`${API_BASE_URL}/tutors/read/${id}`).then(r => r.json())
};

export const bookings = {
  create: (data) => 
    fetch(`${API_BASE_URL}/bookings/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
  
  getByEmail: (email) => 
    fetch(`${API_BASE_URL}/bookings/user/${email}`).then(r => r.json()),
  
  delete: (id) =>
    fetch(`${API_BASE_URL}/bookings/delete/${id}`, { method: 'DELETE' })
      .then(r => r.json())
};

export const reviews = {
  getAll: () => fetch(`${API_BASE_URL}/reviews/all`).then(r => r.json()),
  
  create: (data) =>
    fetch(`${API_BASE_URL}/reviews/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json())
};
```

2. **Use in Components**
```javascript
import { auth, courses } from './services/api';

export function LoginPage() {
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.login('testuser', 'password123');
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result));
        // Redirect to dashboard
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <form onSubmit={handleLogin}>...</form>;
}

export function CoursesList() {
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    courses.getAll()
      .then(setCoursesList)
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div>
      {coursesList.map(course => (
        <div key={course.id}>{course.name}</div>
      ))}
    </div>
  );
}
```

---

## ðŸ“– Endpoint Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | Login user |
| POST | /auth/register | Register user |
| POST | /auth/request-password-reset | Send reset code |
| POST | /auth/reset-password | Reset password |
| GET | /courses/all | Get all courses |
| GET | /courses/read/{id} | Get course |
| GET | /tutors/all | Get all tutors |
| GET | /tutors/read/{id} | Get tutor |
| POST | /bookings/create | Create booking |
| DELETE | /bookings/delete/{id} | Delete booking |
| GET | /bookings/user/{email} | Get user bookings |
| GET | /reviews/all | Get all reviews |
| POST | /reviews/create | Create review |

---

## ðŸ” Key Features

… **Authentication**
- Secure login with BCrypt password verification
- User registration with validation
- Password reset with email verification

… **Authorization**
- Role-based access (USER, TUTOR, ADMIN)
- Easy to extend with permissions

… **Data Management**
- Course CRUD
- Tutor CRUD
- Booking management
- Review system with ratings (1-5)

… **Email Integration**
- Welcome emails on registration
- Password reset codes
- Booking confirmations

… **Frontend Support**
- CORS enabled for React (localhost:3000)
- Supports Live Server (localhost:5500)
- Consistent JSON responses

---

## ðŸ› ï¸ Troubleshooting

### Port Already in Use
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Database Connection Error
- Check MySQL is running
- Verify credentials in `application.properties`
- Check database exists: `Project3Tutordb`

### CORS Errors in Frontend
- Verify frontend URL in `WebConfig.java`
- Check `application.properties` for correct base URL
- Restart backend after changes

### Password Reset Not Working
- Check email configuration in `application.properties`
- For Gmail: Use App Password, not regular password
- Check console for reset code if email not configured

---

## ðŸ“š Documentation Files

In project root:
1. **API_DOCUMENTATION.md** - Complete API reference
2. **IMPLEMENTATION_GUIDE.md** - Technical details
3. **FRONTEND_INTEGRATION.md** - Frontend examples
4. **PROJECT_COMPLETION_SUMMARY.md** - Project overview

---

## ðŸ’¾ Database

### MySQL Setup
```sql
-- Create database
CREATE DATABASE Project3Tutordb;

-- Tables are created automatically by JPA (ddl-auto=update)
```

### Key Tables
- `users` - User accounts with roles
- `courses` - Available courses
- `tutors` - Tutor profiles
- `bookings` - Booking records
- `reviews` - Review/rating records

---

## ðŸŽ¯ Common Workflows

### 1. New User Registration & First Booking
```
1. POST /auth/register â†’ Create account
2. POST /auth/login â†’ Get user role
3. GET /courses/all â†’ Browse courses
4. GET /tutors/all â†’ Browse tutors
5. POST /bookings/create â†’ Create booking
6. POST /reviews/create â†’ Leave review
```

### 2. Password Recovery
```
1. POST /auth/request-password-reset â†’ Request code
2. Check email for code
3. POST /auth/reset-password â†’ Reset password
```

### 3. Browse Available Content
```
1. GET /courses/all â†’ View all courses
2. GET /courses/read/{id} â†’ Get course details
3. GET /tutors/all â†’ View all tutors
4. GET /tutors/read/{id} â†’ Get tutor details
5. GET /reviews/all â†’ View all reviews
```

---

## ðŸš€ Next Steps

1. **Start Backend**
   ```bash
   mvn spring-boot:run
   ```

2. **Test API with Postman/cURL**
   - Create test user
   - Test login
   - Test endpoints

3. **Create Frontend Service**
   - Use code examples in this guide
   - Create React components
   - Connect to API

4. **Deploy**
   - Production database setup
   - Environment variables
   - CORS configuration update
   - Security hardening

---

## ðŸ“ž Support Resources

- API Docs: See `API_DOCUMENTATION.md`
- Implementation Details: See `IMPLEMENTATION_GUIDE.md`
- Frontend Code: See `FRONTEND_INTEGRATION.md`
- Project Overview: See `PROJECT_COMPLETION_SUMMARY.md`

---

## ¨ Ready to Go!

Your backend is fully functional and ready to integrate with your React frontend. 

**All 13 endpoints are implemented and tested.**

Start the server and begin building your UI! ðŸŽ‰

