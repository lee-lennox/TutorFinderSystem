package za.ac.cput.service;


import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import za.ac.cput.domain.User;
import za.ac.cput.factory.UserFactory;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.MethodName.class)
class UserServiceTest {

    @Autowired
    private UserService userService;

    private static final User user = UserFactory.createUser(
            "Lennox",
            "lennox@example.com",
            "pass1234"
    );

    @Test
    @Order(1)
    void a_create() {
        User created = userService.save(user);
        assertNotNull(created);
        assertNotNull(created.getEmail());
        System.out.println("Created User: " + created);
    }

    @Test
    @Order(2)
    void b_read() {
        Optional<User> optionalUser = userService.findByEmail(user.getEmail());
        assertTrue(optionalUser.isPresent());
        System.out.println("Read User: " + optionalUser.get());
    }

    @Test
    @Order(3)
    void c_update() {
        User updatedUser = new User.Builder()
                .copy(user)
                .setUsername("Lennox K.")
                .build();

        User updated = userService.save(updatedUser);
        assertEquals("Lennox K.", updated.getUsername());
        System.out.println("Updated User: " + updated);
    }

    @Test
    @Order(4)
    @Disabled("Delete test disabled for safety")
    void d_delete() {
        userService.deleteById(user.getId());
        Optional<User> deleted = userService.findByEmail(user.getEmail());
        assertFalse(deleted.isPresent());
    }
}
