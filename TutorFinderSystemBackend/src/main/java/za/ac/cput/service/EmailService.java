package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public boolean sendPasswordResetEmail(String email, String resetCode) {
        try {
            if (mailSender == null) {
                System.out.println("Mail sender not configured. Reset code for " + email + ": " + resetCode);
                return true; // Return true so the flow continues
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("tutorfindersystem@gmail.com");
            message.setTo(email);
            message.setSubject("Password Reset Code");
            message.setText("Your password reset code is: " + resetCode + "\n\nThis code will expire in 15 minutes.");

            mailSender.send(message);
            return true;
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            return false;
        }
    }

    public boolean sendWelcomeEmail(String email, String username) {
        try {
            if (mailSender == null) {
                System.out.println("Mail sender not configured. Welcome email for " + email);
                return true;
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("tutorfindersystem@gmail.com");
            message.setTo(email);
            message.setSubject("Welcome to Tutor Finder System");
            message.setText("Welcome " + username + "!\n\nYour account has been created successfully. You can now log in and browse tutors.");

            mailSender.send(message);
            return true;
        } catch (Exception e) {
            System.err.println("Error sending welcome email: " + e.getMessage());
            return false;
        }
    }

    public boolean sendBookingConfirmationEmail(String email, String tutorName, String courseName) {
        try {
            if (mailSender == null) {
                System.out.println("Mail sender not configured. Booking confirmation for " + email);
                return true;
            }

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("tutorfindersystem@gmail.com");
            message.setTo(email);
            message.setSubject("Booking Confirmed");
            message.setText("Your booking has been confirmed!\n\nTutor: " + tutorName + "\nCourse: " + courseName + 
                           "\n\nPlease check your account for more details.");

            mailSender.send(message);
            return true;
        } catch (Exception e) {
            System.err.println("Error sending booking confirmation: " + e.getMessage());
            return false;
        }
    }
}
