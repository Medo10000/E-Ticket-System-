package com.internship.springboot.security.services;


import com.internship.springboot.models.Role;
import com.internship.springboot.models.Ticket;
import com.internship.springboot.models.User;
import com.internship.springboot.models.exception.UserIsAlreadyAssignedException;
import com.internship.springboot.models.exception.UserNotFoundException;
import com.internship.springboot.repository.RoleRepository;
import com.internship.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

// Annotation
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    TicketService ticketService;

    @Autowired
    PasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Save operation
    @Override
    public User saveUser(User user, Integer roleId) {
        // Create new user's account
        User userr = new User(
                user.getId(),
                user.getUsername(),
                encoder.encode(user.getPassword()),
                user.getNom(),
                user.getPrenom(),
                user.getEmail(),
                user.getNumero(),
                user.getRoles(),
                user.getTickets()
                );
        Role role = roleRepository.findRoleById(roleId);
        role.addUser(userr);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        userr.setRoles(roles);
        return userRepository.save(userr);
    }

    // Read operation
    @Override
    public List<User> fetchUserList() {
        List<User> UserEntities = userRepository.findAll();
        List<User> users = UserEntities
                .stream()
                .map(usr-> new User(
                        usr.getId(),
                        usr.getUsername(),
                        usr.getPassword(),
                        usr.getNom(),
                        usr.getPrenom(),
                        usr.getEmail(),
                        usr.getNumero(),
                        usr.getRoles(),
                        usr.getTickets()))
                .collect(Collectors.toList());
        return users;
    }

    // Update operation
    @Override
    public User updateUser(Long userId, Integer roleId, User user) {

        User userToUpdate = userRepository.findById(userId).get();
        Set<Role> role1 = userToUpdate.getRoles();
        Role role2 = roleRepository.findRoleById(roleId);
        Set<Role> role22 = new HashSet<>();
        role22.add(role2);

        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(user.getPassword());
        userToUpdate.setNom(user.getNom());
        userToUpdate.setPrenom(user.getPrenom());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setNumero(user.getNumero());
        if(role1.iterator().next().getId() != role2.getId()) {
            role1.iterator().next().removeUser(userToUpdate);
            role2.addUser(userToUpdate);
        }
            userToUpdate.setRoles(role22);
        userRepository.save(userToUpdate);
        return userToUpdate;
    }

    //Search operation
    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException(userId));
    }

    @Override
    public List<User> getUsersByRole(Integer roleId) {
        List<User> UserEntities = userRepository.findAll();
        List<User> users = UserEntities
                .stream()
                .map(usr-> new User(
                        usr.getId(),
                        usr.getUsername(),
                        usr.getPassword(),
                        usr.getNom(),
                        usr.getPrenom(),
                        usr.getEmail(),
                        usr.getNumero(),
                        usr.getRoles(),
                        usr.getTickets()))
                .collect(Collectors.toList());
        List<User> devs = new ArrayList<>();
        for (User u : users) {
            if(u.getRoles().iterator().next().getId() == roleId){
                devs.add(u);
            }
        }
        return devs;
    }

    // Delete operation
    @Override
    public User deleteUserById(Long userId, Integer roleId)
    {
        Role role = roleRepository.findRoleById(roleId);
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException(userId));
        role.removeUser(user);
        userRepository.delete(user);
        return user;
    }

    // Assign operation
    @Transactional
    @Override
    public User addTicketToUser(Long userId, Long ticketId) {
        User user = getUserById(userId);
        Ticket ticket = ticketService.getTicketById(ticketId);
        if(Objects.nonNull(ticket.getUser())){
            throw new UserIsAlreadyAssignedException(ticketId,
                    ticket.getUser().getId());
        }
        //role.addUser(user);
        ticket.setUser(user);
        return user;
    }

    // Unassign operation
    @Transactional
    @Override
    public User removeTicketFromUser(Long userId, Long ticketId) {
        User user = getUserById(userId);
        Ticket ticket = ticketService.getTicketById(ticketId);
        user.removeTicket(ticket);
        return user;
    }
}
