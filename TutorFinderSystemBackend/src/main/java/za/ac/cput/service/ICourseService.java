package za.ac.cput.service;


import za.ac.cput.domain.Courses;

import java.util.Optional;

public interface ICourseService extends IService<Courses, Long> {
    Optional<Courses> findByCode(String code);
    Optional<Courses> findByName(String name);
}
