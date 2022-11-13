package com.internship.springboot.models.dto;

import com.internship.springboot.models.User;
import lombok.Data;

@Data
public class PlainRecepteurDto {
    private Long userId;
    private String nom;
    private String prenom;
    private String email;
    private String numero;
    public static PlainRecepteurDto from(User recepteur){
        PlainRecepteurDto plainRecepteurDto = new PlainRecepteurDto();
        plainRecepteurDto.setUserId(recepteur.getId());
        plainRecepteurDto.setNom(recepteur.getNom());
        plainRecepteurDto.setPrenom(recepteur.getPrenom());
        plainRecepteurDto.setEmail(recepteur.getEmail());
        plainRecepteurDto.setNumero(recepteur.getNumero());
        return plainRecepteurDto;
    }
}
