package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Bookings;
import za.ac.cput.repository.BookingRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService implements IBookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public Bookings save(Bookings entity) {
        return bookingRepository.save(entity);
    }

    @Override
    public Bookings update(Bookings entity) {
        return bookingRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public Bookings read(Long id) {
        Optional<Bookings> booking = bookingRepository.findById(id);
        return booking.orElse(null);
    }

    @Override
    public List<Bookings> findAll() {
        return bookingRepository.findAll();
    }

    @Override
    public Bookings findById(Long id) {
        Optional<Bookings> booking = Optional.ofNullable(bookingRepository.findByIdAndBookingDate(id, null));
        return booking.orElse(null);
    }

    @Override
    public Bookings findByBookingDate(Date bookingDate) {
        // Convert java.util.Date to java.time.LocalDateTime
        LocalDateTime localDateTime = bookingDate.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        List<Bookings> bookings = bookingRepository.findByBookingDate(localDateTime);
        return bookings.isEmpty() ? null : bookings.get(0);
    }

@Override
public List<Bookings> findByEmail(String email) {
    return bookingRepository.findByEmail(email);
}


}
