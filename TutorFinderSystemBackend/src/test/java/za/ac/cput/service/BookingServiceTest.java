package za.ac.cput.service;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.Bookings;
import za.ac.cput.domain.Courses;
import za.ac.cput.domain.Tutors;
import za.ac.cput.factory.BookingsFactory;
import za.ac.cput.factory.TutorsFactory;
import za.ac.cput.factory.UserFactory;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BookingServiceTest {

    @Autowired
    private BookingService bookingsService;

    private static Bookings booking;

    private static final Courses testCourse = new Courses.Builder()
            .setName("Computer Science")
            .setDescription("Intro to CS")
            .build();

    private static final Tutors testTutor = TutorsFactory.createTutor(
            "John Doe",
            "Mathematics",
            "Experienced tutor",
            "Cape Town",
            "Mon-Fri 8AM-5PM",
            "http://example.com/image.jpg",
            testCourse
    );

    @Test
    @Order(1)
    void a_create() {
        // Create booking using new attributes
        booking = BookingsFactory.createBooking(
                "Lennox",                          // firstName
                "Smith",                          // lastName
                "lennox.smith@example.com",       // email
                "3rd Year",                      // yearOfStudy
                "Cape Town Campus",               // campus
                Bookings.Level.UNDERGRADUATE,    // level (assuming this enum exists)
               "thabo",                       // Tutor object
                LocalDateTime.now().plusDays(1)  // bookingDate
        );

        // Save the booking via the service
        Bookings created = bookingsService.save(booking);

        // Assertions
        assertNotNull(created);
        assertNotNull(created.getId());
        assertEquals("Lennox", created.getFirstName());
        assertEquals("Smith", created.getLastName());
        assertEquals("lennox.smith@example.com", created.getEmail());
        assertEquals("3rd Year", created.getYearOfStudy());
        assertEquals("Cape Town Campus", created.getCampus());
        assertEquals(Bookings.Level.UNDERGRADUATE, created.getLevel());
        assertEquals("thabo", created.getTutorName());
        assertEquals(LocalDateTime.now().plusDays(1).getDayOfYear(), created.getBookingDate().getDayOfYear());

        // Store for reuse in other tests
        booking = created;

        System.out.println("Created Booking with new attributes: " + created);
    }

    @Test
    @Order(2)
    void b_read() {
        Bookings read = bookingsService.read(booking.getId());
        assertNotNull(read);
        assertEquals(booking.getId(), read.getId());
        System.out.println("Read Booking: " + read);
    }

    @Test
    @Order(3)
    void c_update() {
        Bookings updatedBooking = new Bookings.Builder()
                .copy(booking)
                .build();

        Bookings updated = bookingsService.save(updatedBooking);
        assertNotNull(updated);

        System.out.println("Updated Booking: " + updated);
    }

    @Test
    @Order(4)
    void d_delete() {
        bookingsService.deleteById(booking.getId());
        Bookings deleted = bookingsService.read(booking.getId());
        assertNull(deleted);
        System.out.println("Deleted Booking with ID: " + booking.getId());
    }
}
