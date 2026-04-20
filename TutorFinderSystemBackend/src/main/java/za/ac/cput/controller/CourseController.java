package za.ac.cput.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import za.ac.cput.domain.Courses;
import za.ac.cput.service.CourseService;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "*"})
@RestController
@RequestMapping({"/courses", "/api/courses", "/api/course"})
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // … Create a course
    @PostMapping("/create")
    public ResponseEntity<Courses> createCourse(@RequestBody Courses course) {
        try {
            Courses created = courseService.save(course);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // … Read a course by ID
    @GetMapping("/read/{id}")
    public ResponseEntity<Courses> readCourse(@PathVariable Long id) {
        Courses course = courseService.read(id);
        return course != null ? ResponseEntity.ok(course) : ResponseEntity.notFound().build();
    }

    // … Update a course
    @PutMapping("/update")
    public ResponseEntity<Courses> updateCourse(@RequestBody Courses course) {
        try {
            Courses updated = courseService.save(course);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // … Delete a course by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // … Get all courses
    @GetMapping("/all")
    public ResponseEntity<List<Courses>> getAllCourses() {
        try {
            List<Courses> courses = courseService.findAll();
            return ResponseEntity.ok(courses != null ? courses : Collections.emptyList());
        } catch (Exception e) {
            return ResponseEntity.ok(Collections.emptyList());
        }
    }

    // … Optional: Find courses by title (if supported)
//    @GetMapping("/search")
//    public ResponseEntity<List<Courses>> findByTitle(@RequestParam String title) {
//        return ResponseEntity.ok(courseService.findByName());
//    }
}
