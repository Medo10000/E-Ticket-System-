package com.internship.springboot.repository;

import com.internship.springboot.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query("select t from Ticket t where t.ticketId = ?1")
    Ticket findTicketById(Long ticketId);
}
