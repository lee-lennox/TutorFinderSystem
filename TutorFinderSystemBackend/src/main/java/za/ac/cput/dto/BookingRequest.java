package za.ac.cput.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class BookingRequest {
    @JsonAlias({"userEmail", "studentEmail", "username", "user", "emailAddress"})
    private String email;

    @JsonAlias({"tutorID", "tutor_id", "tutor", "id"})
    private Long tutorId;
    private Long courseId;
    private String firstName;
    private String lastName;
    private String yearOfStudy;
    private String campus;
    private String level;

    public BookingRequest() {}

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

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
