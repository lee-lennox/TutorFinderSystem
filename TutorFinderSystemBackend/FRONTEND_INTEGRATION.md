# Frontend Integration Guide

This guide explains how to integrate the Tutor Finder System REST API with your React or JavaScript frontend.

## Base URL Configuration

```javascript
const API_BASE_URL = 'http://localhost:8080/TutorFinderSystem';
```

---

## Authentication Service Example (React)

### 1. Login
```javascript
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store user info
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userRole', data.role);
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
```

### 2. Register
```javascript
export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};
```

### 3. Request Password Reset
```javascript
export const requestPasswordReset = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/request-password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Password reset request failed:', error);
    throw error;
  }
};
```

### 4. Reset Password
```javascript
export const resetPassword = async (email, code, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code, newPassword }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
};
```

---

## Courses Service Example

### Get All Courses
```javascript
export const fetchAllCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
};
```

### Get Course by ID
```javascript
export const fetchCourseById = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/read/${courseId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch course:', error);
    throw error;
  }
};
```

---

## Tutors Service Example

### Get All Tutors
```javascript
export const fetchAllTutors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tutors/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch tutors:', error);
    throw error;
  }
};
```

### Get Tutor by ID
```javascript
export const fetchTutorById = async (tutorId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tutors/read/${tutorId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch tutor:', error);
    throw error;
  }
};
```

---

## Bookings Service Example

### Create Booking
```javascript
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Booking creation failed:', error);
    throw error;
  }
};

// Usage:
// const booking = await createBooking({
//   email: 'student@example.com',
//   tutorId: 1,
//   courseId: 1,
//   firstName: 'John',
//   lastName: 'Doe',
//   yearOfStudy: '2nd Year',
//   campus: 'Main Campus',
//   level: 'UNDERGRADUATE'
// });
```

### Get User Bookings
```javascript
export const getUserBookings = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/user/${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    throw error;
  }
};
```

### Delete Booking
```javascript
export const deleteBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/delete/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Booking deletion failed:', error);
    throw error;
  }
};
```

---

## Reviews Service Example

### Get All Reviews
```javascript
export const fetchAllReviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    throw error;
  }
};
```

### Create Review
```javascript
export const createReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Review creation failed:', error);
    throw error;
  }
};

// Usage:
// const review = await createReview({
//   email: 'student@example.com',
//   tutorId: 1,
//   name: 'John Doe',
//   rating: 5,
//   comment: 'Excellent tutor!'
// });
```

---

## API Service Module (Recommended Structure)

Create a file `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/TutorFinderSystem';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API Error');
  }
  
  return data;
};

// Authentication
export const auth = {
  login: (username, password) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
    
  register: (username, email, password) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }),
    
  requestPasswordReset: (email) =>
    apiCall('/auth/request-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
    
  resetPassword: (email, code, newPassword) =>
    apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, code, newPassword }),
    }),
};

// Courses
export const courses = {
  getAll: () => apiCall('/courses/all'),
  getById: (id) => apiCall(`/courses/read/${id}`),
};

// Tutors
export const tutors = {
  getAll: () => apiCall('/tutors/all'),
  getById: (id) => apiCall(`/tutors/read/${id}`),
};

// Bookings
export const bookings = {
  create: (data) =>
    apiCall('/bookings/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  getByEmail: (email) =>
    apiCall(`/bookings/user/${email}`),
    
  delete: (id) =>
    apiCall(`/bookings/delete/${id}`, {
      method: 'DELETE',
    }),
};

// Reviews
export const reviews = {
  getAll: () => apiCall('/reviews/all'),
  
  create: (data) =>
    apiCall('/reviews/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
```

---

## Usage in React Components

### Login Component Example
```javascript
import { useState } from 'react';
import { auth } from '../services/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await auth.login(username, password);
      localStorage.setItem('user', JSON.stringify(result));
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username or Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Tutors List Component Example
```javascript
import { useEffect, useState } from 'react';
import { tutors } from '../services/api';

export default function TutorsList() {
  const [tutorsList, setTutorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await tutors.getAll();
        setTutorsList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTutors();
  }, []);

  if (loading) return <p>Loading tutors...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="tutors-container">
      {tutorsList.map((tutor) => (
        <div key={tutor.id} className="tutor-card">
          <h3>{tutor.name}</h3>
          <p>{tutor.specialization}</p>
          <p>{tutor.description}</p>
          <button onClick={() => bookTutor(tutor.id)}>Book Now</button>
        </div>
      ))}
    </div>
  );
}
```

### Booking Form Component Example
```javascript
import { useState } from 'react';
import { bookings } from '../services/api';

export default function BookingForm({ tutorId }) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    yearOfStudy: '',
    campus: '',
    level: 'UNDERGRADUATE',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await bookings.create({
        ...formData,
        tutorId,
        courseId: 1, // From context or props
      });
      setSuccess('Booking created successfully!');
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        yearOfStudy: '',
        campus: '',
        level: 'UNDERGRADUATE',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="yearOfStudy"
        placeholder="Year of Study"
        value={formData.yearOfStudy}
        onChange={handleChange}
      />
      <input
        type="text"
        name="campus"
        placeholder="Campus"
        value={formData.campus}
        onChange={handleChange}
      />
      <select
        name="level"
        value={formData.level}
        onChange={handleChange}
      >
        <option value="UNDERGRADUATE">Undergraduate</option>
        <option value="POSTGRADUATE">Postgraduate</option>
        <option value="DIPLOMA">Diploma</option>
        <option value="CERTIFICATE">Certificate</option>
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Create Booking'}
      </button>
    </form>
  );
}
```

---

## Error Handling Best Practices

```javascript
// Wrap API calls in try-catch
try {
  const result = await api.someEndpoint();
  // Handle success
} catch (error) {
  // Handle error
  if (error.message === 'Invalid credentials') {
    // Handle login error
  } else if (error.message === 'Email already registered') {
    // Handle registration error
  } else {
    // Handle generic error
  }
}
```

---

## CORS Configuration Notes

The backend already has CORS enabled for:
- `http://localhost:3000` (React)
- `http://localhost:5500` (Live Server)
- `http://localhost:8080`

If running frontend on different port, update `WebConfig.java` and rebuild.

---

## Testing with Postman

1. Import collection or create requests for each endpoint
2. Set base URL: `http://localhost:8080/TutorFinderSystem`
3. Use JSON body for POST requests
4. Test each endpoint before using in frontend

---

## Troubleshooting CORS Issues

**If you see CORS errors in browser console:**

1. Check that frontend URL is in `WebConfig.allowedOrigins`
2. Verify `Content-Type: application/json` header is set
3. Check browser console for exact error message
4. Restart backend after configuration changes

---

## Production Considerations

- Remove localhost from CORS origins
- Add JWT token authentication
- Implement request rate limiting
- Use environment variables for API URL
- Add proper error boundary components
- Implement loading states and error handling
- Use state management (Redux/Zustand) for global auth state

---

## Useful Resources

- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- React Hooks: https://reactjs.org/docs/hooks-intro.html
- CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- LocalStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
