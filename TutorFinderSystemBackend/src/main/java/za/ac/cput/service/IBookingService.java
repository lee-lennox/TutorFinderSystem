package za.ac.cput.service;


import za.ac.cput.domain.Bookings;

import java.util.Date;
import java.util.List;

public interface IBookingService extends IService<Bookings, Long> {
    Bookings findById(Long Id);
    List<Bookings> findByEmail(String email);

    Bookings findByBookingDate(Date bookingDate);
}
