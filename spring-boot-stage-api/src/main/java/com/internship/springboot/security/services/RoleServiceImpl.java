package com.internship.springboot.security.services;

import com.internship.springboot.models.Role;
import com.internship.springboot.models.User;
import com.internship.springboot.models.exception.RoleIsAlreadyAssignedException;
import com.internship.springboot.models.exception.RoleNotFoundException;
import com.internship.springboot.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService{
    @Autowired
    UserService userService;
    @Autowired
    RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository, UserService userService) {
        this.roleRepository = roleRepository;
        this.userService = userService;
    }

    // Save operation
    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    // Read operation
    @Override
    public List<Role> fetchRoleList() {
        List<Role> RoleEntities = roleRepository.findAll();
        List<Role> roles = RoleEntities
                .stream()
                .map(rle-> new Role(
                        rle.getId(),
                        rle.getName()))
                .collect(Collectors.toList());
        return roles;
    }

    // Update operation
    @Transactional
    @Override
    public Role updateRole(Integer roleId, Role role) {
        Role roleToEdit = getRoleById(roleId);
        roleToEdit.setName(role.getName());
        return roleToEdit;
    }

    // Search operation
    @Override
    public Role getRoleById(Integer roleId) {
        return roleRepository.findById(roleId).orElseThrow(() ->
                new RoleNotFoundException(roleId));
    }

    // Delete operation
    @Override
    public Role deleteRoleById(Integer roleId) {
        Role role = getRoleById(roleId);
        roleRepository.delete(role);
        return role;
    }

    // Assign operation
    @Transactional
    @Override
    public Role addUserToRole(Integer roleId, Long userId) {
        Role role = getRoleById(roleId);
        User user = userService.getUserById(userId);
        if(Objects.nonNull(user.getRoles())){
            throw new RoleIsAlreadyAssignedException(userId,
                    user.getRoles().iterator().next().getId());
        }
        //role.addUser(user);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        return role;
    }

    // Unassign operation
    @Transactional
    @Override
    public Role removeUserFromRole(Integer roleId, Long userId) {
        Role role = getRoleById(roleId);
        User user = userService.getUserById(userId);
        role.removeUser(user);
        return role;
    }
}
