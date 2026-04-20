package za.ac.cput.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Tutors;
import za.ac.cput.repository.TutorsRepository;

import java.util.List;

@Service
public class TutorService implements ITutorService {

    private final TutorsRepository tutorRepository;

    @Autowired
    public TutorService(TutorsRepository tutorRepository) {
        this.tutorRepository = tutorRepository;
    }

    @Override
    public Tutors save(Tutors entity) {
        return tutorRepository.save(entity);
    }

    @Override
    public Tutors update(Tutors entity) {
        return tutorRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        tutorRepository.deleteById(id);
    }

    @Override
    public Tutors read(Long id) {
        return tutorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Tutors> findAll() {
        return tutorRepository.findAll();
    }

    @Override
    public List<Tutors> findByName(String name) {
        return tutorRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Tutors> findByLocation(String location) {
        return tutorRepository.findByLocationContainingIgnoreCase(location);
    }

    @Override
    public List<Tutors> findByCourseId(Long courseId) {
        return tutorRepository.findByCourse_Id(courseId);
    }
}
