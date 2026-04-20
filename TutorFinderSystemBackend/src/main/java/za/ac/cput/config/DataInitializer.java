package za.ac.cput.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import za.ac.cput.domain.Courses;
import za.ac.cput.domain.Tutors;
import za.ac.cput.repository.CoursesRepository;
import za.ac.cput.repository.TutorsRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedData(CoursesRepository coursesRepository, TutorsRepository tutorsRepository) {
        return args -> {
            if (tutorsRepository.count() > 0) {
                return;
            }

            List<Courses> savedCourses = coursesRepository.saveAll(List.of(
                    new Courses("MAT101", "Mathematics", "Algebra, calculus, and problem-solving support for first- and second-year students.", "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1200&q=80"),
                    new Courses("PHY101", "Physics", "Mechanics, electricity, and exam preparation with practical examples.", "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80"),
                    new Courses("CSC101", "Computer Science", "Programming fundamentals, data structures, and software project guidance.", "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"),
                    new Courses("ACC101", "Accounting", "Financial and managerial accounting with practical business use cases.", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"),
                    new Courses("ENG101", "English", "Academic writing, comprehension, and communication coaching.", "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"),
                    new Courses("CHE101", "Chemistry", "General chemistry concepts, lab prep, and test revision sessions.", "https://images.unsplash.com/photo-1532634896-26909d0d4b6d?auto=format&fit=crop&w=1200&q=80")
            ));

            Map<String, Courses> courseByCode = new HashMap<>();
            for (Courses course : savedCourses) {
                courseByCode.put(course.getCode(), course);
            }

            tutorsRepository.saveAll(List.of(
                    buildTutor(
                            "Ayesha Naidoo",
                            "Calculus and Linear Algebra",
                            "Patient mathematics tutor focused on helping students build confidence and speed in tests.",
                            "Bellville Campus",
                            "Mon-Fri 16:00-20:00",
                            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1000&q=80",
                            courseByCode.get("MAT101")
                    ),
                    buildTutor(
                            "Liam Peterson",
                            "Physics Problem Solving",
                            "Specializes in mechanics and electricity with clear step-by-step exam strategies.",
                            "Cape Town CBD",
                            "Tue-Sat 15:00-19:00",
                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
                            courseByCode.get("PHY101")
                    ),
                    buildTutor(
                            "Thandi Mokoena",
                            "Java and Data Structures",
                            "Software engineering mentor helping students with assignments, debugging, and clean code.",
                            "Online / Hybrid",
                            "Mon-Thu 18:00-21:00",
                            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
                            courseByCode.get("CSC101")
                    ),
                    buildTutor(
                            "Marco Daniels",
                            "Financial Accounting",
                            "Guides students through statements, journals, and exam-style accounting questions.",
                            "Mowbray",
                            "Mon-Wed 17:00-20:00",
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
                            courseByCode.get("ACC101")
                    ),
                    buildTutor(
                            "Zintle Jacobs",
                            "Academic Writing",
                            "Supports essay structure, referencing, editing, and presentation skills for university work.",
                            "Online",
                            "Daily 14:00-18:00",
                            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=80",
                            courseByCode.get("ENG101")
                    ),
                    buildTutor(
                            "Ethan Smith",
                            "Organic Chemistry",
                            "Breaks down complex chemistry topics into easy patterns and memory techniques.",
                            "Rondebosch",
                            "Fri-Sun 10:00-16:00",
                            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
                            courseByCode.get("CHE101")
                    ),
                    buildTutor(
                            "Naledi Khumalo",
                            "Programming Fundamentals",
                            "Helps beginners move from theory to practical coding projects with confidence.",
                            "Online / Bellville",
                            "Mon-Fri 13:00-17:00",
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
                            courseByCode.get("CSC101")
                    ),
                    buildTutor(
                            "Ryan Adams",
                            "Applied Mathematics",
                            "Focused on engineering mathematics and real-world application of formulas.",
                            "Online",
                            "Sat-Sun 09:00-14:00",
                            "https://images.unsplash.com/photo-1542204625-de293a57fda2?auto=format&fit=crop&w=1000&q=80",
                            courseByCode.get("MAT101")
                    )
            ));
        };
    }

    private Tutors buildTutor(String name,
                              String specialization,
                              String description,
                              String location,
                              String availableTime,
                              String imageUrl,
                              Courses course) {
        return new Tutors.Builder()
                .setName(name)
                .setSpecialization(specialization)
                .setDescription(description)
                .setLocation(location)
                .setAvailableTime(availableTime)
                .setImageUrl(imageUrl)
                .setCourse(course)
                .build();
    }
}
