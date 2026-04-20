package za.ac.cput.factory;


import za.ac.cput.domain.User;
import za.ac.cput.util.Helper;

public class UserFactory {

    public static User createUser(String username, String email, String password) {
        if (Helper.isNullOrEmpty(username)
                || !Helper.isValidEmail(email)
                || Helper.isNullOrEmpty(password)
                || username.length() < 3 || username.length() > 50
            || !Helper.isValidPassword(password)) {

            System.out.println("Invalid user details.");
            return null;
        }

        return new User.Builder()
                .setUsername(username.trim())
                .setEmail(email.trim())
                .setPassword(password)
                .build();
    }
}
