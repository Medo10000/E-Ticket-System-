package com.internship.springboot.controllers;


import com.internship.springboot.models.Role;
import com.internship.springboot.models.dto.RoleDto;
import com.internship.springboot.security.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RoleController {
    // Annotation
    @Autowired
    public RoleService roleService;

    // Save operation
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/roles")
    public ResponseEntity<RoleDto> saveRole(@RequestBody final RoleDto roleDto){
        Role role = roleService.saveRole(Role.from(roleDto));
        return new ResponseEntity<>(RoleDto.from(role), HttpStatus.OK);
    }

    // Read operation
    @GetMapping("/roles")
    public ResponseEntity<List<RoleDto>> fetchRoleList(){
        List<Role> roles = roleService.fetchRoleList();
        List<RoleDto> rolesDto = roles.stream().map(RoleDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(rolesDto, HttpStatus.OK);
    }

    //Search operation
    @GetMapping(value = "{id}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable final Integer id){
        Role role = roleService.getRoleById(id);
        return new ResponseEntity<>(RoleDto.from(role), HttpStatus.OK);
    }

    // Update operation
    @PutMapping(value = "{id}")
    public ResponseEntity<RoleDto> updateRole(@PathVariable final Integer id,
                                            @RequestBody final RoleDto roleDto){
        Role role = roleService.updateRole(id, Role.from(roleDto));
        return new ResponseEntity<>(RoleDto.from(role), HttpStatus.OK);
    }

    //Delete role
    @DeleteMapping(value = "roles/{id}")
    public ResponseEntity<RoleDto> deleteRole(@PathVariable final Integer id){
        Role role = roleService.deleteRoleById(id);
        return new ResponseEntity<>(RoleDto.from(role), HttpStatus.OK);
    }


    //Assign user
    @PostMapping(value = "roles/{roleId}/users/{userId}/add")
    public ResponseEntity<RoleDto> addUserToRole(@PathVariable final Integer roleId,
                                                 @PathVariable final Long userId){
        Role role = roleService.addUserToRole(roleId, userId);
        return new ResponseEntity<>(RoleDto.from(role), HttpStatus.OK);
    }


    //Unassign user
    @DeleteMapping(value = "roles/{roleId}/users/{userId}/remove")
    public ResponseEntity<RoleDto> removeItemFromCart(@PathVariable final Integer roleId,
                                                      @PathVariable final Long userId){
        Role role = roleService.removeUserFromRole(roleId, userId);
        return new ResponseEntity<>(RoleDto.from(role), HttpStatus.OK);
    }
}
