package com.internship.springboot.security.services;

import com.internship.springboot.models.Ticket;

import java.util.List;

public interface TicketService {
    // Save operation
    Ticket saveTicket(Ticket ticket, Long ticketId);

    // Read operation
    List<Ticket> fetchTicketList();

    // TicketsByUser operation
    List<Ticket> fetchTicketsByUser(Long userId);

    // Update operation
    Ticket updateTicket(Long ticketId, Long userId, Ticket ticket);

    // Search operation
    Ticket getTicketById(Long ticketId);

    // Delete operation
    void deleteTicketById(Long ticketId, Long userId);

}

