package za.ac.cput.service;


import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Courses;
import za.ac.cput.domain.Tutors;
import za.ac.cput.factory.CoursesFactory;
import za.ac.cput.factory.TutorsFactory;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class TutorServiceTest {

    @Autowired
    private ICourseService courseService;

    @Autowired
    private ITutorService tutorService;

    private static Courses testCourse;
    private static Tutors testTutor;

    @Test
    @Order(1)
    void a_create() {
        // Save course first
        testCourse = CoursesFactory.createCourse(
                "CS201",
                "Intro to CS",
                "Basic Computer Science",
                "http://example.com/image.jpg"
        );
        testCourse = courseService.save(testCourse);

        // Then create and save tutor
        testTutor = TutorsFactory.createTutor(
                "John Doe",
                "Mathematics",
                "Experienced tutor",
                "Cape Town",
                "Mon-Fri 8AM-5PM",
                "http://example.com/image.jpg",
                testCourse
        );

        Tutors savedTutor = tutorService.save(testTutor);
        assertNotNull(savedTutor);
        System.out.println("Saved tutor: " + savedTutor);
    }

    @Test
    @Order(2)
    void b_read() {
        List<Tutors> read = tutorService.findByCourseId(testTutor.getCourse().getId());

        // Force initialize courses to avoid LazyInitializationException
        read.forEach(tutor -> {
            tutor.getCourse().getName(); // access a property to initialize
        });

        assertFalse(read.isEmpty(), "No tutors found for course");
        System.out.println("Read Tutor(s): " + read);
    }

    @Test
    @Order(3)
    void c_update() {
        Tutors updatedTutor = new Tutors.Builder()
                .copy(testTutor)
                .setName("Jane D.")
                .build();

        Tutors updated = tutorService.save(updatedTutor);
        assertEquals("Jane D.", updated.getName());
        System.out.println("Updated Tutor: " + updated);
    }

    @Test
    @Order(4)
    @Disabled("Delete test disabled for safety")
    void d_delete() {
        tutorService.deleteById(testTutor.getId());
        List<Tutors> deleted = tutorService.findByCourseId(testTutor.getCourse().getId());
        assertTrue(deleted.isEmpty(), "Tutor list should be empty after deletion");
        System.out.println("Deleted tutor with ID: " + testTutor.getId());
    }
}
