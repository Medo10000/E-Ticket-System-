package com.internship.springboot.security.services;


import com.internship.springboot.models.User;

import java.util.List;

public interface UserService {

    // Save operation
    User saveUser(User user, Integer roleId);

    // Read operation
    List<User> fetchUserList();

    // Update operation
    User updateUser(Long userId, Integer roleId, User user);

    // Search operation
    User getUserById(Long userId);
    List<User> getUsersByRole(Integer roleId);

    // Delete operation
    User deleteUserById(Long userId, Integer roleId);

    // Assign operation
    User addTicketToUser(Long userId, Long ticketId);

    // Unassign operation
    User removeTicketFromUser(Long userId, Long ticketId);
}
