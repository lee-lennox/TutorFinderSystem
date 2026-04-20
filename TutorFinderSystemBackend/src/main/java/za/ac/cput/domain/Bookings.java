package za.ac.cput.domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String yearOfStudy;
    private String campus;

    @Enumerated(EnumType.STRING)
    private Level level;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String tutorName;

    // Default constructor for JPA
    public Bookings() {}

    // Enum for Booking Status


    // Enum for Level
    public enum Level {
        UNDERGRADUATE, POSTGRADUATE, DIPLOMA, CERTIFICATE
    }

    // Builder constructor
    private Bookings(Builder builder) {
        this.id = builder.id;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.yearOfStudy = builder.yearOfStudy;
        this.campus = builder.campus;
        this.level = builder.level;
        this.bookingDate = builder.bookingDate;
        this.tutorName = builder.tutorName; // <-- Add this lines
        this.createdAt = builder.createdAt;

    }

    // Getters
    public Long getId() { return id; }

    public String getFirstName() { return firstName; }

    public String getLastName() { return lastName; }

    public String getEmail() { return email; }

    public String getYearOfStudy() { return yearOfStudy; }

    public String getCampus() { return campus; }

    public Level getLevel() { return level; }

    public LocalDateTime getBookingDate() { return bookingDate; }



    public LocalDateTime getCreatedAt() { return createdAt; }



    public String getTutorName() {
        return tutorName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setYearOfStudy(String yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setTutorName(String tutorName) {
        this.tutorName = tutorName;
    }

    @Override
    public String toString() {
        return "Bookings{" +
                "bookingDate=" + bookingDate +
                ", id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", yearOfStudy='" + yearOfStudy + '\'' +
                ", campus='" + campus + '\'' +
                ", level=" + level +
                ", createdAt=" + createdAt +
                ", tutorName='" + tutorName + '\'' +
                '}';
    }

    // Builder class
    public static class Builder {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String yearOfStudy;
        private String campus;
        private Level level;
        private LocalDateTime bookingDate;

        private LocalDateTime createdAt;
        private String tutorName;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setYearOfStudy(String yearOfStudy) {
            this.yearOfStudy = yearOfStudy;
            return this;
        }

        public Builder setCampus(String campus) {
            this.campus = campus;
            return this;
        }

        public Builder setLevel(Level level) {
            this.level = level;
            return this;
        }

        public Builder setBookingDate(LocalDateTime bookingDate) {
            this.bookingDate = bookingDate;
            return this;
        }


        public Builder setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder setTutorName(String tutorName) {
            this.tutorName = tutorName;
            return this;
        }

        public Builder copy(Bookings booking) {
            this.id = booking.id;
            this.firstName = booking.firstName;
            this.lastName = booking.lastName;
            this.email = booking.email;
            this.yearOfStudy = booking.yearOfStudy;
            this.campus = booking.campus;
            this.level = booking.level;
            this.bookingDate = booking.bookingDate;

            this.createdAt = booking.createdAt;
        this.tutorName = booking.tutorName;
            return this;
        }

        public Bookings build() {
            return new Bookings(this);
        }
    }
}
