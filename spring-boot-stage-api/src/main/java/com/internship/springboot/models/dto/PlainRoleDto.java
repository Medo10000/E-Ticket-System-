package com.internship.springboot.models.dto;

import com.internship.springboot.models.ERole;
import com.internship.springboot.models.Role;
import lombok.Data;

@Data
public class PlainRoleDto {
    private Integer id;
    private ERole titre;

    public static PlainRoleDto from(Role role){
        PlainRoleDto plainRoleDto = new PlainRoleDto();
        plainRoleDto.setId(role.getId());
        plainRoleDto.setTitre(role.getName());
        return plainRoleDto;
    }

}
