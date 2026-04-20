package za.ac.cput.service;


import za.ac.cput.domain.Tutors;

import java.util.List;

public interface ITutorService extends IService<Tutors, Long> {
    List<Tutors> findByName(String name);
    List<Tutors> findByLocation(String location);
    List<Tutors> findByCourseId(Long courseId);
}
