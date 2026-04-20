package za.ac.cput.domain;



import javax.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "role", columnDefinition = "VARCHAR(50) DEFAULT 'USER'")
    private String role = "USER"; // USER, TUTOR, ADMIN

    @Column(name = "password_reset_code")
    private String passwordResetCode;

    @Column(name = "password_reset_expiry")
    private LocalDateTime passwordResetExpiry;

    public User() {
        this.createdAt = LocalDateTime.now();
        this.role = "USER";
    }

    private User(Builder builder) {
        this.id = builder.id;
        this.username = builder.username;
        this.email = builder.email;
        this.password = builder.password;
        this.createdAt = builder.createdAt != null ? builder.createdAt : LocalDateTime.now();
        this.role = builder.role != null ? builder.role : "USER";
        this.passwordResetCode = builder.passwordResetCode;
        this.passwordResetExpiry = builder.passwordResetExpiry;
    }

    public User(LocalDateTime createdAt, String email, Long id, String password, String username) {
        this.createdAt = createdAt;
        this.email = email;
        this.id = id;
        this.password = password;
        this.username = username;
        this.role = "USER";
    }

    public User(String lennox, String mail, String password123) {
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getEmail() {
        return email;
    }

    public Long getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPasswordResetCode() {
        return passwordResetCode;
    }

    public void setPasswordResetCode(String passwordResetCode) {
        this.passwordResetCode = passwordResetCode;
    }

    public LocalDateTime getPasswordResetExpiry() {
        return passwordResetExpiry;
    }

    public void setPasswordResetExpiry(LocalDateTime passwordResetExpiry) {
        this.passwordResetExpiry = passwordResetExpiry;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "User{" +
                "createdAt=" + createdAt +
                ", id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    public static class Builder {
        private Long id;
        private String username;
        private String email;
        private String password;
        private LocalDateTime createdAt;
        private String role;
        private String passwordResetCode;
        private LocalDateTime passwordResetExpiry;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder setRole(String role) {
            this.role = role;
            return this;
        }

        public Builder setPasswordResetCode(String passwordResetCode) {
            this.passwordResetCode = passwordResetCode;
            return this;
        }

        public Builder setPasswordResetExpiry(LocalDateTime passwordResetExpiry) {
            this.passwordResetExpiry = passwordResetExpiry;
            return this;
        }

        public Builder copy(User user) {
            this.id = user.id;
            this.username = user.username;
            this.email = user.email;
            this.password = user.password;
            this.createdAt = user.createdAt;
            this.role = user.role;
            this.passwordResetCode = user.passwordResetCode;
            this.passwordResetExpiry = user.passwordResetExpiry;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}
