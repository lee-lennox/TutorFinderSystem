package za.ac.cput.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Courses;


import java.util.Optional;

@Repository
public interface CoursesRepository extends JpaRepository<Courses, Long> {

    Optional<Courses> findByCode(String code);
    Optional<Courses> findByName(String name);
}
