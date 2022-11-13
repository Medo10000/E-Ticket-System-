package com.internship.springboot.models;

import com.internship.springboot.models.dto.TransferDto;
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
@Table(name = "transfers")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="transfer_id")
    private Long transferId;
    private LocalDate localDate = LocalDate.now(ZoneId.of("GMT+00:00"));

    //@JsonIgnore
    @ManyToOne
    private User recepteur;
    @OneToOne
    private Ticket ticket;


    public static Transfer from(TransferDto transferDto){
        Transfer transfer = new Transfer();
        transfer.setLocalDate(transferDto.getLocalDate());
        return transfer;
    }
}

