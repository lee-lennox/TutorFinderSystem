package za.ac.cput.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.Tutors;
import za.ac.cput.service.TutorService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "*"})
@RestController
@RequestMapping("/tutors")
public class TutorController {

    private final TutorService tutorService;

    @Autowired
    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }

    // … Create a Tutor
    @PostMapping("/create")
    public ResponseEntity<Tutors> createTutor(@RequestBody Tutors tutor) {
        try {
            Tutors savedTutor = tutorService.save(tutor);
            return ResponseEntity.ok(savedTutor);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // … Read Tutor by ID
    @GetMapping("/read/{id}")
    public ResponseEntity<Tutors> getTutor(@PathVariable Long id) {
        Tutors tutor = tutorService.read(id);
        return tutor != null ? ResponseEntity.ok(tutor) : ResponseEntity.notFound().build();
    }

    // … Update Tutor
    @PutMapping("/update")
    public ResponseEntity<Tutors> updateTutor(@RequestBody Tutors tutor) {
        try {
            Tutors updatedTutor = tutorService.save(tutor);
            return ResponseEntity.ok(updatedTutor);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // … Delete Tutor by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTutor(@PathVariable Long id) {
        tutorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // … Get All Tutors
    @GetMapping("/all")
    public ResponseEntity<List<Tutors>> getAllTutors() {
        return ResponseEntity.ok(tutorService.findAll());
    }

    // … Optional: Search Tutors by Name
//    @GetMapping("/search")
//    public ResponseEntity<List<Tutors>> searchByName(@RequestParam String name) {
//        return ResponseEntity.ok(tutorService.findByNameContaining(name));
//    }
}
