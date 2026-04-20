package za.ac.cput.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Bookings;
import za.ac.cput.domain.Tutors;
import za.ac.cput.dto.ApiResponse;
import za.ac.cput.dto.BookingRequest;
import za.ac.cput.service.BookingService;
import za.ac.cput.service.TutorService;
import za.ac.cput.util.Helper;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "*"})
@RestController
@RequestMapping({"/bookings", "/api/bookings", "/api/booking"})
public class BookingController {

    private final BookingService bookingService;
    private final TutorService tutorService;

    @Autowired
    public BookingController(BookingService bookingService, TutorService tutorService) {
        this.bookingService = bookingService;
        this.tutorService = tutorService;
    }

    // =============================
    // … CREATE BOOKING
    // =============================
    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest bookingRequest) {
        try {
            if (bookingRequest.getTutorId() == null) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "tutorId is required"));
            }

            // Get tutor details for booking
            Tutors tutor = tutorService.read(bookingRequest.getTutorId());
            if (tutor == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Tutor not found"));
            }

            // Create booking
            Bookings booking = new Bookings();
            booking.setEmail(Helper.isNullOrBlank(bookingRequest.getEmail()) ? "" : bookingRequest.getEmail().trim());
            booking.setFirstName(bookingRequest.getFirstName());
            booking.setLastName(bookingRequest.getLastName());
            booking.setYearOfStudy(bookingRequest.getYearOfStudy());
            booking.setCampus(bookingRequest.getCampus());
            if (bookingRequest.getLevel() != null) {
                try {
                    booking.setLevel(Bookings.Level.valueOf(bookingRequest.getLevel().toUpperCase()));
                } catch (IllegalArgumentException e) {
                    // Ignore unknown level values to keep booking creation resilient for frontend payloads.
                }
            }
            booking.setTutorName(tutor.getName());
            booking.setBookingDate(LocalDateTime.now());
            booking.setCreatedAt(LocalDateTime.now());

            Bookings savedBooking = bookingService.save(booking);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Booking created successfully", savedBooking.getId()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to create booking: " + e.getMessage()));
        }
    }

    // =============================
    // … GET BOOKING BY ID
    // =============================
    @GetMapping("/read/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id) {
        try {
            Bookings booking = bookingService.read(id);
            if (booking == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Booking not found"));
            }
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error retrieving booking: " + e.getMessage()));
        }
    }

    // =============================
    // … UPDATE BOOKING
    // =============================
    @PostMapping("/update")
    public ResponseEntity<?> updateBooking(@RequestBody Bookings booking) {
        try {
            if (booking.getId() == null) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Booking ID is required"));
            }
            Bookings updated = bookingService.save(booking);
            return ResponseEntity.ok(new ApiResponse(true, "Booking updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to update booking: " + e.getMessage()));
        }
    }

    // =============================
    // … DELETE BOOKING
    // =============================
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        try {
            Bookings booking = bookingService.read(id);
            if (booking == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Booking not found"));
            }
            bookingService.deleteById(id);
            return ResponseEntity.ok(new ApiResponse(true, "Booking deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Failed to delete booking: " + e.getMessage()));
        }
    }

    // =============================
    // … GET ALL BOOKINGS
    // =============================
    @GetMapping("/all")
    public ResponseEntity<?> getAllBookings() {
        try {
            List<Bookings> bookings = bookingService.findAll();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error retrieving bookings: " + e.getMessage()));
        }
    }

    // =============================
    // … GET BOOKINGS BY USER EMAIL
    // =============================
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getBookingsByEmail(@PathVariable String email) {
        try {
            List<Bookings> bookings = bookingService.findByEmail(email);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error retrieving bookings: " + e.getMessage()));
        }
    }
}
