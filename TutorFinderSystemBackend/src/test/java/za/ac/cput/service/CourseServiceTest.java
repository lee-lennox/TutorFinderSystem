package za.ac.cput.service;


import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Courses;
import za.ac.cput.factory.CoursesFactory;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class CourseServiceTest {

@Autowired
private CourseService courseService;

    private static final Courses course = CoursesFactory.createCourse(
            "CS101",
            "Introduction to Programming",
            "Basic programming fundamentals",
            "ytyt"
    );

    @Test
    @Order(1)
    void a_create() {
        Courses created = courseService.save(course);
        assertNotNull(created);
        assertEquals("CS101", created.getCode());
        System.out.println("Created Course: " + created);
    }

    @Test
    @Order(2)
    void b_read() {
        Optional<Courses> optionalCourse = courseService.findByCode(course.getCode());
        assertTrue(optionalCourse.isPresent());
        System.out.println("Read Course: " + optionalCourse.get());
    }

    @Test
    @Order(3)
    void c_update() {
        Courses updatedCourse = new Courses.Builder()
                .copy(course)
                .setName("Intro to Programming")
                .build();

        Courses updated = courseService.save(updatedCourse);
        assertEquals("Intro to Programming", updated.getName());
        System.out.println("Updated Course: " + updated);
    }

    @Test
    @Order(4)
    @Disabled("Delete test disabled for safety")
    void d_delete() {
        courseService.deleteById(course.getId());
        Optional<Courses> deleted = courseService.findByCode(course.getCode());
        assertFalse(deleted.isPresent());
    }
}
