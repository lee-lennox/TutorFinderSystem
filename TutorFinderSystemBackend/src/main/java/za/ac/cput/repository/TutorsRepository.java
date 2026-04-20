package za.ac.cput.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.domain.Tutors;


import java.util.List;

@Repository
public interface TutorsRepository extends JpaRepository<Tutors, Long> {

    List<Tutors> findByNameContainingIgnoreCase(String name);
    List<Tutors> findByCourse_Id(Long courseId);
    List<Tutors> findByLocationContainingIgnoreCase(String location);
}
