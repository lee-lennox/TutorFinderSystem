package za.ac.cput.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class ReviewRequest {
    @JsonAlias({"userEmail", "studentEmail", "username", "user", "emailAddress"})
    private String email;

    @JsonAlias({"tutorID", "tutor_id", "tutor", "id"})
    private Long tutorId;

    @JsonAlias({"stars", "score"})
    private Integer rating;

    @JsonAlias({"feedback", "review", "reviewText", "message", "text"})
    private String comment;

    @JsonAlias({"username", "userName", "fullName", "studentName"})
    private String name;

    public ReviewRequest() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
