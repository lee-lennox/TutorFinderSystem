package za.ac.cput.factory;


import za.ac.cput.domain.Courses;
import za.ac.cput.util.Helper;

public class CoursesFactory {

    public static Courses createCourse(String code, String name, String description, String imageUrl) {
        if (Helper.isNullOrEmpty(code)
                || Helper.isNullOrEmpty(name)
                || code.length() > 20
                || name.length() > 100
                || (description != null && description.length() > 1000)
                || (imageUrl != null && imageUrl.length() > 300)) {

            System.out.println("Invalid course details.");
            return null;
        }

        return new Courses(code.trim(), name.trim(), description, imageUrl);
    }
}
