package com.internship.springboot.models;

import com.internship.springboot.models.dto.TicketDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.ZoneId;

// Annotations
@Entity
@Data
@Table(name = "tickets")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ticket_id")
    private Long ticketId;
    private String titre;
    private String description;
    private String category = "Non catégorisé";
    private LocalDate localDate = LocalDate.now(ZoneId.of("GMT+00:00"));
    private String status = "Nouveau";
    //@JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    public static Ticket from(TicketDto ticketDto){
        Ticket ticket = new Ticket();
        ticket.setTitre(ticketDto.getTitre());
        ticket.setDescription(ticketDto.getDescription());
        ticket.setCategory(ticketDto.getCategory());
        ticket.setLocalDate(ticketDto.getLocalDate());
        ticket.setStatus(ticketDto.getStatus());
        return ticket;
    }
}
