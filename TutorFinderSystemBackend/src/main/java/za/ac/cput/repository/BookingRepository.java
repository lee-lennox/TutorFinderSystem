package za.ac.cput.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Bookings;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Repository
public interface BookingRepository extends JpaRepository<Bookings, Long> {
    List<Bookings> findByEmail(String email);

    List<Bookings> findByBookingDate(LocalDateTime bookingDate);
    Bookings findByIdAndBookingDate(Long id, LocalDateTime bookingDate);
}
