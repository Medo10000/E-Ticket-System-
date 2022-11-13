package com.internship.springboot.security.services;

import com.internship.springboot.models.Role;

import java.util.List;

public interface RoleService {

    // Save operation
    public Role saveRole(Role role);

    // Read operation
    List<Role> fetchRoleList();

    // Update operation
    Role updateRole(Integer roleId, Role role);

    // Search operation
    Role getRoleById(Integer roleId);

    // Delete operation
    Role deleteRoleById(Integer roleId);

    // Assign operation
    Role addUserToRole(Integer roleId, Long userId);

    // Unassign operation
    Role removeUserFromRole(Integer roleId, Long userId);
}
