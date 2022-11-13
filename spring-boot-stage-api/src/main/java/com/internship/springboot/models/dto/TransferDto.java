package com.internship.springboot.models.dto;

import com.internship.springboot.models.Transfer;
import lombok.Data;

import java.time.LocalDate;
import java.time.ZoneId;

@Data
public class TransferDto {
    private Long transferId;
    private LocalDate localDate = LocalDate.now(ZoneId.of("GMT+00:00"));
    private PlainRecepteurDto plainRecepteurDto;
    private TicketDto ticketDto;

    public static TransferDto from(Transfer transfer){
        TransferDto transferDto = new TransferDto();
        transferDto.setTransferId(transfer.getTransferId());
        transferDto.setLocalDate(transfer.getLocalDate());
        transferDto.setPlainRecepteurDto(PlainRecepteurDto.from(transfer.getRecepteur()));
        transferDto.setTicketDto(TicketDto.from(transfer.getTicket()));
        return transferDto;
    }

    private void setLocalDate(LocalDate localDate) {
        localDate = LocalDate.now(ZoneId.of("GMT+00:00"));
    }

    public LocalDate getLocalDate() {
        return LocalDate.now(ZoneId.of("GMT+00:00"));
    }
}
