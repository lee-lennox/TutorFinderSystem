package za.ac.cput.factory;


import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Courses;
import za.ac.cput.domain.Tutors;

import static org.junit.jupiter.api.Assertions.*;

class TutorsFactoryTest {

    @Test
    void testCreateTutor() {
        Courses course = new Courses(); // or use a mock if needed

        Tutors tutor = TutorsFactory.createTutor(
                "John Doe",
                "Mathematics",
                "Experienced math tutor",
                "Cape Town",
                "Weekdays 9am-5pm",
                "https://example.com/john.jpg",
                course
        );

        assertNotNull(tutor);
        assertEquals("John Doe", tutor.getName());
        assertEquals("Mathematics", tutor.getSpecialization());
        assertEquals("Experienced math tutor", tutor.getDescription());
        assertEquals("Cape Town", tutor.getLocation());
        assertEquals("Weekdays 9am-5pm", tutor.getAvailableTime());
        assertEquals("https://example.com/john.jpg", tutor.getImageUrl());
        assertEquals(course, tutor.getCourse());
    }
}
