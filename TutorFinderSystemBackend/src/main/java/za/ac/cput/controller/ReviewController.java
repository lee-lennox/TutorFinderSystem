package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Review;
import za.ac.cput.dto.ApiResponse;
import za.ac.cput.dto.ReviewRequest;
import za.ac.cput.service.ReviewService;
import za.ac.cput.util.Helper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "*"})
@RestController
@RequestMapping({"/reviews", "/api/review", "/api/reviews"})
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // =============================
    // … GET ALL REVIEWS
    // =============================
    @GetMapping("/all")
    public ResponseEntity<?> getAllReviews() {
        try {
            List<Review> reviews = reviewService.findAll();
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error retrieving reviews: " + e.getMessage()));
        }
    }

    // =============================
    // … CREATE REVIEW
    // =============================
    @PostMapping("/create")
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest reviewRequest) {
        try {
            if (reviewRequest.getTutorId() == null) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "tutorId is required"));
            }

            Integer rating = reviewRequest.getRating() != null ? reviewRequest.getRating() : 5;
            if (rating < 1 || rating > 5) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Rating must be between 1 and 5"));
            }

            Review review = new Review();
            review.setEmail(Helper.isNullOrBlank(reviewRequest.getEmail()) ? "" : reviewRequest.getEmail().trim());
            review.setTutorId(reviewRequest.getTutorId());
            review.setRating(rating);
            review.setFeedback(Helper.isNullOrBlank(reviewRequest.getComment()) ? "" : reviewRequest.getComment().trim());
            review.setName(Helper.isNullOrBlank(reviewRequest.getName()) ? "Anonymous" : reviewRequest.getName().trim());
            review.setCreatedAt(LocalDateTime.now());

            Review savedReview = reviewService.save(review);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Review created successfully", savedReview.getId()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to create review: " + e.getMessage()));
        }
    }

    // =============================
    // … GET REVIEW BY ID
    // =============================
    @GetMapping("/read/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id) {
        try {
            Review review = reviewService.read(id);
            if (review == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Review not found"));
            }
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error retrieving review: " + e.getMessage()));
        }
    }

    // =============================
    // … GET REVIEW BY NAME
    // =============================
    @GetMapping("/read-by-name/{name}")
    public ResponseEntity<?> getReviewByName(@PathVariable String name) {
        try {
            Optional<Review> review = reviewService.findByName(name);
            if (review.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Review not found"));
            }
            return ResponseEntity.ok(review.get());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error retrieving review: " + e.getMessage()));
        }
    }

    // =============================
    // … UPDATE REVIEW
    // =============================
    @PutMapping("/update")
    public ResponseEntity<?> updateReview(@RequestBody Review review) {
        try {
            if (review.getId() == null) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Review ID is required"));
            }
            Review updated = reviewService.update(review);
            return ResponseEntity.ok(new ApiResponse(true, "Review updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update review: " + e.getMessage()));
        }
    }

    // =============================
    // … DELETE REVIEW
    // =============================
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        try {
            Review review = reviewService.read(id);
            if (review == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Review not found"));
            }
            reviewService.deleteById(id);
            return ResponseEntity.ok(new ApiResponse(true, "Review deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to delete review: " + e.getMessage()));
        }
    }
}
