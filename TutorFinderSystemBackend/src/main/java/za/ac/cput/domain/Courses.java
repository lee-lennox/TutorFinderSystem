package za.ac.cput.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "courses")
public class Courses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true)
    private String code;


    private String name;

    @Column(length = 1000)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"course"})
    private List<Tutors> tutors;

    public Courses() {}

    public Courses(String code, String name, String description, String imageUrl) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Courses(Builder builder) {
        this.id = builder.id;
        this.code = builder.code;
        this.name = builder.name;
        this.description = builder.description;
        this.imageUrl = builder.imageUrl;
        this.tutors = builder.tutors;
    }

    public String getCode() {
        return code != null ? code : "";
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

    public String getName() {
        return name != null ? name : "";
    }

    public List<Tutors> getTutors() {
        return tutors;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }

    public static class Builder {
        private Long id;
        private String code;
        private String name;
        private String description;
        private String imageUrl;
        private List<Tutors> tutors;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setCode(String code) {
            this.code = code;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public Builder setTutors(List<Tutors> tutors) {
            this.tutors = tutors;
            return this;
        }

        public Builder copy(Courses course) {
            this.id = course.id;
            this.code = course.code;
            this.name = course.name;
            this.description = course.description;
            this.imageUrl = course.imageUrl;
            this.tutors = course.tutors;
            return this;
        }

        public Courses build() {
            return new Courses(this);
        }
    }
}
