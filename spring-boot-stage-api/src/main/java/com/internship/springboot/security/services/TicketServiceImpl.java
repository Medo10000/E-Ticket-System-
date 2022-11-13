package com.internship.springboot.security.services;

import com.internship.springboot.models.Ticket;
import com.internship.springboot.models.User;
import com.internship.springboot.models.exception.TicketNotFoundException;
import com.internship.springboot.models.exception.UserNotFoundException;
import com.internship.springboot.repository.TicketRepository;
import com.internship.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// Annotation
@Service
public class TicketServiceImpl implements TicketService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    TicketRepository ticketRepository;

    public TicketServiceImpl(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public Ticket saveTicket(Ticket ticket, Long userId) {
        User user = userRepository.findUserById(userId);
        user.addTicket(ticket);
        ticket.setUser(user);
        return ticketRepository.save(ticket);
    }

    @Override
    public List<Ticket> fetchTicketList() {
        List<Ticket> TicketEntities = ticketRepository.findAll();
        List<Ticket> tickets = TicketEntities
                .stream()
                .map(tkt-> new Ticket(
                        tkt.getTicketId(),
                        tkt.getTitre(),
                        tkt.getDescription(),
                        tkt.getCategory(),
                        tkt.getLocalDate(),
                        tkt.getStatus(),
                        tkt.getUser()))
                .collect(Collectors.toList());
        return tickets;
    }

    @Override
    public List<Ticket> fetchTicketsByUser(Long userId) {
        User user = userRepository.findUserById(userId);
        List<Ticket> tickets = user.getTickets() .stream()
                .map(tkt-> new Ticket(
                        tkt.getTicketId(),
                        tkt.getTitre(),
                        tkt.getDescription(),
                        tkt.getCategory(),
                        tkt.getLocalDate(),
                        tkt.getStatus(),
                        tkt.getUser()))
                .collect(Collectors.toList());;
        return tickets;
    }

    @Override
    public Ticket updateTicket(Long ticketId, Long userId, Ticket ticket) {
        Ticket ticketToUpdate = ticketRepository.findById(ticketId).get();
        ticketToUpdate.setTitre(ticket.getTitre());
        ticketToUpdate.setDescription(ticket.getDescription());
        ticketToUpdate.setCategory(ticket.getCategory());
        ticketToUpdate.setLocalDate(ticket.getLocalDate());
        ticketToUpdate.setStatus(ticket.getStatus());
        User user1 = ticketToUpdate.getUser();
        User user2 = userRepository.findUserById(userId);
        if(user1.getId() != user2.getId()){
            user1.removeTicket(ticketToUpdate);
            user2.addTicket(ticketToUpdate);
        }
        ticketToUpdate.setUser(user2);
        ticketRepository.save(ticketToUpdate);
        return ticketToUpdate;
    }

    @Override
    public Ticket getTicketById(Long ticketId) {
        return ticketRepository.findById(ticketId).orElseThrow(() ->
                new UserNotFoundException(ticketId));
    }

    @Override
    public void deleteTicketById(Long ticketId, Long userId) {
        User user = userRepository.findUserById(userId);
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() ->
                new TicketNotFoundException(ticketId));
        user.removeTicket(ticket);
        ticketRepository.deleteById(ticketId);
    }


}

