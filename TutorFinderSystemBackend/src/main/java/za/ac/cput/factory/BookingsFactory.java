package za.ac.cput.factory;

import za.ac.cput.domain.Bookings;
import za.ac.cput.domain.Tutors;

import java.time.LocalDateTime;

public class BookingsFactory {


    // Create booking with all mandatory fields
    public static Bookings createBooking(String firstName, String lastName, String email,
                                         String yearOfStudy, String campus, Bookings.Level level,
                                         String tutorName, LocalDateTime bookingDate) {

        // Validate inputs
        if (firstName == null || firstName.isEmpty())
            throw new IllegalArgumentException("First name is required");

        if (lastName == null || lastName.isEmpty())
            throw new IllegalArgumentException("Last name is required");

        if (email == null || email.isEmpty())
            throw new IllegalArgumentException("Email is required");

        if (yearOfStudy == null || yearOfStudy.isEmpty())
            throw new IllegalArgumentException("Year of study is required");

        if (campus == null || campus.isEmpty())
            throw new IllegalArgumentException("Campus is required");

        if (level == null)
            throw new IllegalArgumentException("Level is required");

        if (tutorName == null)
            throw new IllegalArgumentException("Tutor cannot be null");

        if (bookingDate == null || bookingDate.isBefore(LocalDateTime.now()))
            throw new IllegalArgumentException("Booking date must be in the future");

        return new Bookings.Builder()
                .setFirstName(firstName)
                .setLastName(lastName)
                .setEmail(email)
                .setYearOfStudy(yearOfStudy)
                .setCampus(campus)
                .setLevel(level)
                .setTutorName(tutorName)
                .setBookingDate(bookingDate)

                .setCreatedAt(LocalDateTime.now())
                .build();
    }
}
