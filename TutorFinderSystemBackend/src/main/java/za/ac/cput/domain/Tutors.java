package za.ac.cput.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "tutors")
public class Tutors {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;

    private String specialization;

    @Column(length = 2000)
    private String description;

    private String location;

    @Column(name = "available_time")
    private String availableTime;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.EAGER) // instead of LAZY
    @JsonIgnoreProperties({"tutors"})
    private Courses course;


    public Tutors() {}

    public Tutors(String trim, String specialization, String description, String location, String availableTime, String imageUrl, Courses course) {
    }

    public String getAvailableTime() {
        return availableTime != null ? availableTime : "";
    }


    public Courses getCourse() {
        return course;
    }

    public String getDescription() {
        return description != null ? description : "";
    }

    public Long getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl != null ? imageUrl : "";
    }

    public String getLocation() {
        return location != null ? location : "";
    }

    public String getName() {
        return name != null ? name : "";
    }

    public String getSpecialization() {
        return specialization != null ? specialization : "";
    }

    public Tutors(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.specialization = builder.specialization;
        this.description = builder.description;
        this.location = builder.location;
        this.availableTime = builder.availableTime;
        this.imageUrl = builder.imageUrl;
        this.course = builder.course;

    }

    @Override
    public String toString() {
        return "Tutor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", specialization='" + specialization + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", availableTime='" + availableTime + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", course=" + (course != null ? course.getName() : "null") +
                '}';
    }

    public static class Builder {
        private Long id;
        private String name;
        private String specialization;
        private String description;
        private String location;
        private String availableTime;
        private String imageUrl;
        private Courses course;
        private List<Bookings> bookings;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setSpecialization(String specialization) {
            this.specialization = specialization;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setLocation(String location) {
            this.location = location;
            return this;
        }

        public Builder setAvailableTime(String availableTime) {
            this.availableTime = availableTime;
            return this;
        }

        public Builder setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public Builder setCourse(Courses course) {
            this.course = course;
            return this;
        }

        public Builder setBookings(List<Bookings> bookings) {
            this.bookings = bookings;
            return this;
        }

        public Builder copy(Tutors tutor) {
            this.id = tutor.id;
            this.name = tutor.name;
            this.specialization = tutor.specialization;
            this.description = tutor.description;
            this.location = tutor.location;
            this.availableTime = tutor.availableTime;
            this.imageUrl = tutor.imageUrl;
            this.course = tutor.course;

            return this;
        }

        public Tutors build() {
            return new Tutors(this);
        }
    }
}
