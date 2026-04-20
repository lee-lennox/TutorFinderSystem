package za.ac.cput.factory;

import org.junit.jupiter.api.Test;
import za.ac.cput.domain.Bookings;
import za.ac.cput.domain.Tutors;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class BookingsFactoryTest {

    @Test
    void createBooking_ValidInput_Success() {
        String firstName = "John";
        String lastName = "Doe";
        String email = "john.doe@example.com";
        String yearOfStudy = "3rd Year";
        String campus = "Main Campus";
        Bookings.Level level = Bookings.Level.UNDERGRADUATE;
        String tutorName = "lee";// add tutor setup as needed
        LocalDateTime bookingDate = LocalDateTime.now().plusDays(2);

        Bookings booking = BookingsFactory.createBooking(
                firstName, lastName, email,
                yearOfStudy, campus, level,
                tutorName, bookingDate);

        assertNotNull(booking);
        assertEquals(firstName, booking.getFirstName());
        assertEquals(lastName, booking.getLastName());
        assertEquals(email, booking.getEmail());
        assertEquals(yearOfStudy, booking.getYearOfStudy());
        assertEquals(campus, booking.getCampus());
        assertEquals(level, booking.getLevel());
        assertEquals(tutorName, booking.getTutorName());
        assertEquals(bookingDate, booking.getBookingDate());

        assertNotNull(booking.getCreatedAt());
    }

    @Test
    void createBooking_MissingFirstName_ThrowsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            BookingsFactory.createBooking(
                    "", "Doe", "john.doe@example.com",
                    "3rd Year", "Main Campus", Bookings.Level.UNDERGRADUATE,
                    "Lee", LocalDateTime.now().plusDays(1));
        });

        assertEquals("First name is required", exception.getMessage());
    }

    @Test
    void createBooking_PastBookingDate_ThrowsException() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            BookingsFactory.createBooking(
                    "John", "Doe", "john.doe@example.com",
                    "3rd Year", "Main Campus", Bookings.Level.UNDERGRADUATE,
                    "Lee", LocalDateTime.now().minusDays(1));
        });

        assertEquals("Booking date must be in the future", exception.getMessage());
    }
}
