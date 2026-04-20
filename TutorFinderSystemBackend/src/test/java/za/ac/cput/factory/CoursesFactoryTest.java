package za.ac.cput.factory;



import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Courses;

import static org.junit.jupiter.api.Assertions.*;

class CoursesFactoryTest {

    @Test
    void testCreateCourse() {
        Courses course = CoursesFactory.createCourse(
                "CS101",
                "Computer Science",
                "Introductory computer science course",
                "https://example.com/img/cs101.png"
        );

        assertNotNull(course);
        assertEquals("CS101", course.getCode());
        assertEquals("Computer Science", course.getName());
        assertEquals("Introductory computer science course", course.getDescription());
        assertEquals("https://example.com/img/cs101.png", course.getImageUrl());
    }
}
