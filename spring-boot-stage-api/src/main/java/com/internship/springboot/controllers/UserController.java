package com.internship.springboot.controllers;


import com.internship.springboot.models.User;
import com.internship.springboot.models.dto.UserDto;
import com.internship.springboot.security.services.RoleService;
import com.internship.springboot.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    // Annotation
    @Autowired
    public UserService userService;
    @Autowired
    public RoleService roleService;


    /*// Save operation
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/users/{id}")
    public ResponseEntity<User> saveUser(@PathVariable("id") Long roleId,
                                         @RequestBody final User user){
        User userToSave = userService.saveUser(user, roleId);
        return new ResponseEntity<>(userToSave, HttpStatus.OK);
    }*/
    // Save operation
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/users/{id}")
    public ResponseEntity<UserDto> saveUser(@PathVariable("id") Integer roleId,
                                            @RequestBody final UserDto userDto){
        User user = userService.saveUser(User.from(userDto), roleId);
        return new ResponseEntity<>(UserDto.from(user), HttpStatus.OK);
    }

    /*// Read operation
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users")
    public List<User> fetchUserList() {
        return userService.fetchUserList();
    }*/
    // Read operation
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> fetchUserList(){
        List<User> users = userService.fetchUserList();
        List<UserDto> usersDto = users.stream().map(UserDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(usersDto, HttpStatus.OK);
    }

    /*// Update operation
    @PutMapping("/users/{userId}/roles/{roleId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> updateUser(@PathVariable("userId") Long userId,
                                           @PathVariable("roleId") Long roleId,
                                                   @RequestBody User user) {
        user = userService.updateUser(userId, roleId, user);
        return ResponseEntity.ok(user);
    }*/
    // Update operation
    @PutMapping("/users/{userId}/roles/{roleId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("userId") Long userId,
                                              @PathVariable("roleId") Integer roleId,
                                              @RequestBody final UserDto userDto){
        User user = userService.updateUser(userId, roleId, User.from(userDto));
        return new ResponseEntity<>(userDto.from(user), HttpStatus.OK);
    }

    /*//Search operation
    @GetMapping("/users/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long userId) {
        User user = null;
        user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }*/
    //Search operation
    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId){
        User user = userService.getUserById(userId);
        return new ResponseEntity<>(UserDto.from(user), HttpStatus.OK);
    }
    @GetMapping("/users/role/{roleId}")
    public ResponseEntity<List<UserDto>> getUsersByRole(@PathVariable("roleId") Integer roleId){
        List<User> users = userService.getUsersByRole(roleId);
        List<UserDto> usersDto = users.stream().map(UserDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(usersDto, HttpStatus.OK);
    }


    /*// Delete operation
    @DeleteMapping("/users/{userId}/roles/{roleId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public String deleteUserById(@PathVariable("userId") Long userId,
                                 @PathVariable("roleId") Long roleId)
    {
        userService.deleteUserById(userId, roleId);
        return "Deleted Successfully";
    }*/
    /*//Delete operation
    @DeleteMapping("/users/{userId}/roles/{roleId}")
    public String deleteUserById(@PathVariable("userId") Long userId,
                                 @PathVariable("roleId") Long roleId){
        userService.deleteUserById(userId, roleId);
        return "Deleted Successfully";
    }*/
    //Delete operation
    @DeleteMapping("/users/{userId}/roles/{roleId}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable("userId") Long userId,
                                              @PathVariable("roleId") Integer roleId){
        User user = userService.deleteUserById(userId, roleId);
        return new ResponseEntity<>(UserDto.from(user), HttpStatus.OK);
    }

    //Assign ticket
    @PostMapping(value = "users/{userId}/tickets/{ticketId}/add")
    public ResponseEntity<UserDto> addTicketToUser(@PathVariable final Long userId,
                                                 @PathVariable final Long ticketId){
        User user = userService.addTicketToUser(userId, ticketId);
        return new ResponseEntity<>(UserDto.from(user), HttpStatus.OK);
    }


    //Unassign ticket
    @DeleteMapping(value = "users/{userId}/tickets/{ticketId}/remove")
    public ResponseEntity<UserDto> removeItemFromCart(@PathVariable final Long userId,
                                                      @PathVariable final Long ticketId){
        User user = userService.removeTicketFromUser(userId, ticketId);
        return new ResponseEntity<>(UserDto.from(user), HttpStatus.OK);
    }
}
