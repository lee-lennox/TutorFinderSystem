package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.User;
import za.ac.cput.dto.*;
import za.ac.cput.repository.UserRepository;
import za.ac.cput.service.EmailService;
import za.ac.cput.util.Helper;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "*"})
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public AuthController() {}

    // =============================
    // … LOGIN ENDPOINT
    // =============================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String identifier = loginRequest.getLoginIdentifier();
            if (Helper.isNullOrBlank(identifier) || Helper.isNullOrBlank(loginRequest.getPassword())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Missing email/username or password"));
            }

            // Try to find by email or username
            Optional<User> userOptional = userRepository.findByEmail(identifier);
            if (userOptional.isEmpty()) {
                userOptional = userRepository.findByUsername(identifier);
            }

            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Wrong email or username or password"));
            }

            User user = userOptional.get();

            // Verify password using BCrypt
            if (!Helper.verifyPassword(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Wrong email or username or password"));
            }

            AuthResponse authResponse = new AuthResponse("Login successful", user.getEmail(), user.getRole());
            return ResponseEntity.ok(authResponse);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Login failed: " + e.getMessage()));
        }
    }

    // =============================
    // … REGISTER ENDPOINT
    // =============================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            // Validation
            if (Helper.isNullOrBlank(registerRequest.getUsername()) ||
                    Helper.isNullOrBlank(registerRequest.getEmail()) ||
                    Helper.isNullOrBlank(registerRequest.getPassword())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Username, email, and password are required"));
            }

            if (!Helper.isValidEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Invalid email format"));
            }

            if (!Helper.isValidUsername(registerRequest.getUsername())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Username must be 3-50 characters and contain only letters and numbers"));
            }

            if (!Helper.isValidPassword(registerRequest.getPassword())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, Helper.getStrongPasswordPolicyDescription()));
            }

            // Check if user already exists
            if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Email already exists"));
            }

            if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Username already taken"));
            }

            // Create new user
            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setEmail(registerRequest.getEmail());
            user.setPassword(Helper.hashPassword(registerRequest.getPassword())); // Hash password
            user.setRole(registerRequest.getRole() != null ? registerRequest.getRole() : "USER");
            user.setCreatedAt(LocalDateTime.now());

            User savedUser = userRepository.save(user);

            // Send welcome email
            emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Registration successful", savedUser.getId()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Registration failed: " + e.getMessage()));
        }
    }

    // =============================
    // … REQUEST PASSWORD RESET
    // =============================
    @PostMapping("/request-password-reset")
    public ResponseEntity<?> requestPasswordReset(@RequestBody PasswordResetCodeRequest request) {
        try {
            if (Helper.isNullOrBlank(request.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Email is required"));
            }

            Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
            if (userOptional.isEmpty()) {
                // Return success anyway to prevent email enumeration
                return ResponseEntity.ok(new ApiResponse(true, "If email exists, reset code has been sent"));
            }

            User user = userOptional.get();
            String resetCode = Helper.generatePasswordResetCode();
            LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(15);

            user.setPasswordResetCode(resetCode);
            user.setPasswordResetExpiry(expiryTime);
            userRepository.save(user);

            // Send email
            emailService.sendPasswordResetEmail(user.getEmail(), resetCode);

            return ResponseEntity.ok(new ApiResponse(true, "Password reset code sent to email"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to process request: " + e.getMessage()));
        }
    }

    // =============================
    // … RESET PASSWORD
    // =============================
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {
        try {
            if (Helper.isNullOrBlank(request.getEmail()) ||
                    Helper.isNullOrBlank(request.getCode()) ||
                    Helper.isNullOrBlank(request.getNewPassword())) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Email, code, and new password are required"));
            }

                if (!Helper.isValidPassword(request.getNewPassword())) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, Helper.getStrongPasswordPolicyDescription()));
                }

            Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "User not found"));
            }

            User user = userOptional.get();

            // Validate reset code
            if (user.getPasswordResetCode() == null || !user.getPasswordResetCode().equals(request.getCode())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Invalid reset code"));
            }

            // Check expiry
            if (user.getPasswordResetExpiry() == null || LocalDateTime.now().isAfter(user.getPasswordResetExpiry())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Reset code has expired"));
            }

            // Update password
            user.setPassword(Helper.hashPassword(request.getNewPassword()));
            user.setPasswordResetCode(null);
            user.setPasswordResetExpiry(null);
            userRepository.save(user);

            return ResponseEntity.ok(new ApiResponse(true, "Password reset successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to reset password: " + e.getMessage()));
        }
    }
}
