package za.ac.cput.factory;

import za.ac.cput.domain.Review;
import java.util.UUID;

/**
 * Factory class for creating Review instances.
 */
public class ReviewFactory {

    public static Review createReview(String name, String feedback) {
        // Generate a random ID using UUID hashCode for demonstration
//        Long id = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;

        return new Review.Builder()
                .setName(name)
                .setFeedback(feedback)
                .build();
    }
}
