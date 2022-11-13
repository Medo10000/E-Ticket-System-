package com.internship.springboot.models.dto;

import com.internship.springboot.models.User;
import lombok.Data;

@Data
public class PlainUserDto {
    private Long userId;
    private String username;
    private String password;
    private String nom;
    private String prenom;
    private String email;
    private String numero;

    public static PlainUserDto from(User user){
        PlainUserDto plainUserDto = new PlainUserDto();
        plainUserDto.setUserId(user.getId());
        plainUserDto.setUsername(user.getUsername());
        plainUserDto.setPassword(user.getPassword());
        plainUserDto.setNom(user.getNom());
        plainUserDto.setPrenom(user.getPrenom());
        plainUserDto.setEmail(user.getEmail());
        plainUserDto.setNumero(user.getNumero());
        return plainUserDto;
    }
}
