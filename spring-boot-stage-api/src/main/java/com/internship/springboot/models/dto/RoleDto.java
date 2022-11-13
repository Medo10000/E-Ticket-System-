package com.internship.springboot.models.dto;

import com.internship.springboot.models.ERole;
import com.internship.springboot.models.Role;
import lombok.Data;

@Data
public class RoleDto {
    private Integer id;
    private ERole name;

    public static RoleDto from(Role role){
        RoleDto roleDto = new RoleDto();
        roleDto.setId(role.getId());
        roleDto.setName(role.getName());
        return roleDto;
    }
}
