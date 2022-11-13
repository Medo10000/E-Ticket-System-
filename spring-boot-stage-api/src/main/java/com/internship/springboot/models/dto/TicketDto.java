package com.internship.springboot.models.dto;

import com.internship.springboot.models.Ticket;
import lombok.Data;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Objects;

@Data
public class TicketDto {
    private Long ticketId;
    private String titre;
    private String description;
    private String category= "Non catégorisé";;
    private LocalDate localDate = LocalDate.now(ZoneId.of("GMT+00:00"));
    private String status = "Nouveau";
    private PlainUserDto plainUserDto;

    public static TicketDto from(Ticket ticket){
        TicketDto ticketDto = new TicketDto();
        ticketDto.setTicketId(ticket.getTicketId());
        ticketDto.setTitre(ticket.getTitre());
        ticketDto.setDescription(ticket.getDescription());
        ticketDto.setCategory(ticket.getCategory());
        ticketDto.setLocalDate(ticket.getLocalDate());
        ticketDto.setStatus(ticket.getStatus());
        if(Objects.nonNull(ticket.getUser())){
            ticketDto.setPlainUserDto(PlainUserDto.from(ticket.getUser()));
        }
        return ticketDto;
    }

    /*private void setLocalDate(LocalDate localDate) {
        localDate = LocalDate.now(ZoneId.of("GMT+00:00"));
    }

    public LocalDate getLocalDate() {
        return LocalDate.now(ZoneId.of("GMT+00:00"));
    }*/
}

