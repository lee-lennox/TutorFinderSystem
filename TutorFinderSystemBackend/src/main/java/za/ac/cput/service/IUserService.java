package za.ac.cput.service;


import za.ac.cput.domain.User;

import java.util.Optional;

public interface IUserService extends IService<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
