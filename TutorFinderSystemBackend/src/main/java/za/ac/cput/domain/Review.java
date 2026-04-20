package za.ac.cput.domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String feedback;
    private String email;

    @Column(name = "tutor_id")
    private Long tutorId;

    private Integer rating; // 1-5 rating

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Review() {
        this.createdAt = LocalDateTime.now();
    }

    public Review(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.feedback = builder.feedback;
        this.email = builder.email;
        this.tutorId = builder.tutorId;
        this.rating = builder.rating;
        this.createdAt = builder.createdAt != null ? builder.createdAt : LocalDateTime.now();
    }

    public String getFeedback() {
        return feedback;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public Integer getRating() {
        return rating;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Review{" +
                "feedback='" + feedback + '\'' +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", tutorId=" + tutorId +
                ", rating=" + rating +
                ", createdAt=" + createdAt +
                '}';
    }

    public static class Builder {
        private String feedback;
        private Long id;
        private String name;
        private String email;
        private Long tutorId;
        private Integer rating;
        private LocalDateTime createdAt;

        public Builder setFeedback(String feedback) {
            this.feedback = feedback;
            return this;
        }

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setTutorId(Long tutorId) {
            this.tutorId = tutorId;
            return this;
        }

        public Builder setRating(Integer rating) {
            this.rating = rating;
            return this;
        }

        public Builder setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder copy(Review review) {
            this.feedback = review.feedback;
            this.id = review.id;
            this.name = review.name;
            this.email = review.email;
            this.tutorId = review.tutorId;
            this.rating = review.rating;
            this.createdAt = review.createdAt;
            return this;
        }

        public Review build() {
            return new Review(this);
        }
    }
}
