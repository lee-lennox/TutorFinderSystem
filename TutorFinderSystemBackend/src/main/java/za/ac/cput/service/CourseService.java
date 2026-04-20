package za.ac.cput.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Courses;
import za.ac.cput.repository.CoursesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService implements ICourseService {

    private final CoursesRepository courseRepository;

    @Autowired
    public CourseService(CoursesRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public Courses save(Courses entity) {
        return courseRepository.save(entity);
    }

    @Override
    public Courses update(Courses entity) {
        return courseRepository.save(entity);
    }




    @Override
    public void deleteById(Long id) {
        courseRepository.deleteById(id);
    }

    @Override
    public Courses read(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    @Override
    public List<Courses> findAll() {
        return courseRepository.findAll();
    }

    @Override
    public Optional<Courses> findByCode(String code) {
        return courseRepository.findByCode(code);
    }

    @Override
    public Optional<Courses> findByName(String name) {
        return courseRepository.findByName(name);
    }
}
