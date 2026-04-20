package za.ac.cput.dto;

public class PasswordResetCodeRequest {
    private String email;

    public PasswordResetCodeRequest() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
