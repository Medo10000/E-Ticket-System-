package com.internship.springboot.security.services;

import com.internship.springboot.models.Ticket;
import com.internship.springboot.models.Transfer;
import com.internship.springboot.models.User;
import com.internship.springboot.models.exception.TransferNotFoundException;
import com.internship.springboot.repository.TicketRepository;
import com.internship.springboot.repository.TransferRepository;
import com.internship.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// Annotation
@Service
public class TransferServiceImpl implements TransferService{

    @Autowired
    TransferRepository transferRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TicketRepository ticketRepository;

    public TransferServiceImpl(TransferRepository transferRepository) {
        this.transferRepository = transferRepository;
    }

    @Override
    public Transfer saveTransfer(Long userId, Long ticketId, Transfer transfer) {
        User recepteur = userRepository.findUserById(userId);
        Ticket ticket = ticketRepository.findTicketById(ticketId);
        transfer.setRecepteur(recepteur);
        transfer.setTicket(ticket);
        return transferRepository.save(transfer);
    }

    @Override
    public List<Transfer> fetchTransferList() {
        List<Transfer> TransferEntities = transferRepository.findAll();
        List<Transfer> transfers = TransferEntities
                .stream()
                .map(trs-> new Transfer(
                        trs.getTransferId(),
                        trs.getLocalDate(),
                        trs.getRecepteur(),
                        trs.getTicket()))
                .collect(Collectors.toList());
        return transfers;
    }

    @Override
    public Transfer updateTransfer(Long transferId, Long userId, Transfer transfer) {
        return null;
    }

    @Override
    public Transfer getTransferById(Long transferId) {
        return transferRepository.findById(transferId).orElseThrow(() ->
                new TransferNotFoundException(transferId));
    }

    @Override
    public void deleteTransferById(Long transferId) {
        Transfer transfer = transferRepository.findTransferById(transferId);
        transferRepository.delete(transfer);
    }
}

