package za.ac.cput.factory;


import org.junit.jupiter.api.Test;
import za.ac.cput.domain.User;

import static org.junit.jupiter.api.Assertions.*;

class UserFactoryTest {

    @Test
    void testCreateUser() {
        User user = UserFactory.createUser(
                "lennox_komane",
                "lennox@example.com",
                "securePass123"
        );

        assertNotNull(user);
        assertEquals("lennox_komane", user.getUsername());
        assertEquals("lennox@example.com", user.getEmail());
        assertEquals("securePass123", user.getPassword());
    }
}
