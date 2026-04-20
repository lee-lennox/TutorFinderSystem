package za.ac.cput.factory;


import za.ac.cput.domain.Courses;
import za.ac.cput.domain.Tutors;

public class TutorsFactory {

    public static Tutors createTutor(String name, String specialization, String description,
                                     String location, String availableTime, String imageUrl, Courses course) {
        return new Tutors.Builder()
                .setName(name)
                .setSpecialization(specialization)
                .setDescription(description)
                .setLocation(location)
                .setAvailableTime(availableTime)
                .setImageUrl(imageUrl)
                .setCourse(course)
                .build();
    }
}
