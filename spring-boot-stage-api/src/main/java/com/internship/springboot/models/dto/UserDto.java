package com.internship.springboot.models.dto;

import com.internship.springboot.models.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
public class UserDto {
    private Long userId;
    private String username;
    private String password;
    private String nom;
    private String prenom;
    private String email;
    private String numero;
    private PlainRoleDto plainRoleDto;
    private List<TicketDto> ticketsDto = new ArrayList<>();

    public static UserDto from(User user){
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setNom(user.getNom());
        userDto.setPrenom(user.getPrenom());
        userDto.setEmail(user.getEmail());
        userDto.setNumero(user.getNumero());
        if(Objects.nonNull(user.getRoles())){
            userDto.setPlainRoleDto(PlainRoleDto.from(user.getRoles().iterator().next()));
        }
        if(Objects.nonNull(user.getTickets())){
            userDto.setTicketsDto(user.getTickets().stream().map(TicketDto::from).collect(Collectors.toList()));
        }
        return userDto;
    }
}
