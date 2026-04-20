package za.ac.cput.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.domain.User;
import za.ac.cput.service.UserService;


import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5500", "*"})
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 1. Create a new user
    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    // 2. Read user by ID
    @GetMapping("/read/{id}")
    public User readUser(@PathVariable Long id) {
        return userService.read(id);
    }

    // 3. Update user
    @PostMapping("/update")
    public User updateUser(@RequestBody User user) {
        return userService.save(user);
    }

    // 4. Delete user by ID
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }

    // 5. Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.findAll();
    }
}
