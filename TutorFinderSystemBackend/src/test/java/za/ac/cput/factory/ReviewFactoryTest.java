package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Review;

import static org.junit.jupiter.api.Assertions.*;

class ReviewFactoryTest {

    @Test
    void testCreateReview() {
        String name = "John Doe";
        String feedback = "Excellent service!";

        Review review = ReviewFactory.createReview(name, feedback);

        assertNotNull(review);
        assertEquals(name, review.getName());
        assertEquals(feedback, review.getFeedback());

        System.out.println(review);  // Optional: Print for manual verification
    }
}
