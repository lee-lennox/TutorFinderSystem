package za.ac.cput.util;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.security.SecureRandom;
import java.util.UUID;
import java.util.regex.Pattern;

public class Helper {

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );

    private static final Pattern PHONE_PATTERN = Pattern.compile("^[+]?[0-9]{10,15}$");

    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9]{3,50}$");
        private static final Pattern STRONG_PASSWORD_PATTERN = Pattern.compile("^(?=.*\\d)(?=.*[^A-Za-z0-9]).{6,128}$");

        private static final String UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static final String LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
        private static final String DIGIT_CHARS = "0123456789";
        private static final String SPECIAL_CHARS = "@$!%*?&()_+-=[]{};':\"\\|,.<>/";
        private static final String ALL_PASSWORD_CHARS = UPPERCASE_CHARS + LOWERCASE_CHARS + DIGIT_CHARS + SPECIAL_CHARS;
        private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // === Common ===
    public static boolean isNullOrEmpty(String s) {
        return s == null || s.isEmpty();
    }

    public static boolean isNullOrBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    public static String generateId() {
        return UUID.randomUUID().toString();
    }

    public static String safeTrim(String s) {
        return s == null ? null : s.trim();
    }

    // === Password Hashing ===
    public static String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public static boolean verifyPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    public static String generatePasswordResetCode() {
        int code = 100000 + SECURE_RANDOM.nextInt(900000); // 6-digit code
        return String.valueOf(code);
    }

    // === User/Admin Validation ===
    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email.trim()).matches();
    }

    public static boolean isValidPhoneNumber(String phone) {
        if (isNullOrEmpty(phone)) return false;
        String cleanPhone = phone.replaceAll("[\\s()-]", "");
        return PHONE_PATTERN.matcher(cleanPhone).matches();
    }

    public static boolean isValidUsername(String username) {
        return username != null && USERNAME_PATTERN.matcher(username.trim()).matches();
    }

    public static boolean isValidPassword(String password) {
        return password != null && STRONG_PASSWORD_PATTERN.matcher(password).matches();
    }

    public static String getStrongPasswordPolicyDescription() {
        return "Password must be at least 6 characters long and include at least one number and one special character.";
    }

    public static String generateStrongPassword(int length) {
        if (length < 6) {
            throw new IllegalArgumentException("Password length must be at least 6 characters");
        }

        char[] password = new char[length];

        // Guarantee at least one character from each required group.
        password[0] = randomChar(UPPERCASE_CHARS);
        password[1] = randomChar(LOWERCASE_CHARS);
        password[2] = randomChar(DIGIT_CHARS);
        password[3] = randomChar(SPECIAL_CHARS);

        for (int i = 4; i < length; i++) {
            password[i] = randomChar(ALL_PASSWORD_CHARS);
        }

        shuffle(password);
        return new String(password);
    }

    private static char randomChar(String source) {
        return source.charAt(SECURE_RANDOM.nextInt(source.length()));
    }

    private static void shuffle(char[] input) {
        for (int i = input.length - 1; i > 0; i--) {
            int j = SECURE_RANDOM.nextInt(i + 1);
            char temp = input[i];
            input[i] = input[j];
            input[j] = temp;
        }
    }

    // === Course Validation ===
    public static boolean isValidCourseCode(String code) {
        return code != null && code.length() <= 20;
    }

    public static boolean isValidCourseName(String name) {
        return name != null && name.length() <= 100;
    }

    public static boolean isValidCourseDescription(String description) {
        return description == null || description.length() <= 1000;
    }

    public static boolean isValidImageUrl(String imageUrl) {
        return imageUrl == null || imageUrl.length() <= 300;
    }

    // === Tutor Validation ===
    public static boolean isValidTutorName(String name) {
        return name != null && name.length() <= 100;
    }

    public static boolean isValidSpecialization(String specialization) {
        return specialization == null || specialization.length() <= 100;
    }

    public static boolean isValidTutorDescription(String description) {
        return description == null || description.length() <= 2000;
    }

    public static boolean isValidLocation(String location) {
        return location == null || location.length() <= 200;
    }

    public static boolean isValidAvailableTime(String time) {
        return time == null || time.length() <= 100;
    }

    // === Booking Validation ===
    public static boolean isFutureBookingDate(LocalDateTime bookingDate) {
        return bookingDate != null && bookingDate.isAfter(LocalDateTime.now());
    }

    public static boolean isValidNotes(String notes) {
        return notes == null || notes.length() <= 1000;
    }

    public static boolean isValidBookingStatus(String status) {
        if (status == null) return false;
        return status.equalsIgnoreCase("PENDING")
                || status.equalsIgnoreCase("CONFIRMED")
                || status.equalsIgnoreCase("CANCELLED");
    }

    // === ID Validation ===
    public static boolean isValidId(Long id) {
        return id != null && id > 0;
    }
}


