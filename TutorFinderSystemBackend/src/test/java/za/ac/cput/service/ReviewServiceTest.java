package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Review;
import za.ac.cput.factory.ReviewFactory;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ReviewServiceTest {

    @Autowired
    private ReviewService reviewService;

    private static Review review;

    @BeforeAll
    static void setup() {
        review = ReviewFactory.createReview("John Doe", "Excellent course material!");
    }

    @Test
    @Order(1)
    void a_create() {
        Review created = reviewService.save(review);
        assertNotNull(created);
        assertEquals(review.getName(), created.getName());
        System.out.println("Created Review: " + created);
    }

    @Test
    @Order(2)
    void b_read() {
        Review read = reviewService.read(review.getId());
        assertNotNull(read);
        assertEquals(review.getFeedback(), read.getFeedback());
        System.out.println("Read Review: " + read);
    }

    @Test
    @Order(3)
    void c_update() {
        Review updatedReview = new Review.Builder()
                .copy(review)
                .setFeedback("Updated feedback: Outstanding content.")
                .build();

        Review updated = reviewService.update(updatedReview);
        assertEquals("Updated feedback: Outstanding content.", updated.getFeedback());
        System.out.println("Updated Review: " + updated);
    }

    @Test
    @Order(4)
    void d_findByName() {
        Optional<Review> found = reviewService.findByName("John Doe");
        assertTrue(found.isPresent());
        assertEquals("John Doe", found.get().getName());
        System.out.println("Found by name: " + found.get());
    }

    @Test
    @Order(5)
    void e_findAll() {
        List<Review> reviews = reviewService.findAll();
        assertFalse(reviews.isEmpty());
        System.out.println("All Reviews: " + reviews);
    }

    @Test
    @Order(6)
    @Disabled("Disabled to preserve data")
    void f_delete() {
        reviewService.deleteById(review.getId());
        Optional<Review> deleted = reviewService.findById(review.getId());
        assertFalse(deleted.isPresent());
    }
}
