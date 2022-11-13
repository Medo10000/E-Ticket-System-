package com.internship.springboot.controllers;

import com.internship.springboot.models.Ticket;
import com.internship.springboot.models.dto.TicketDto;
import com.internship.springboot.security.services.TicketService;
import com.internship.springboot.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TicketController {
    // Annotation
    @Autowired
    public TicketService ticketService;
    @Autowired
    public UserService userService;


    // Save operation
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/tickets/user/{id}")
    public ResponseEntity<TicketDto> saveTicket(@PathVariable("id") Long userId,
                                                @RequestBody final TicketDto ticketDto){
        Ticket ticket = ticketService.saveTicket(Ticket.from(ticketDto), userId);
        return new ResponseEntity<>(TicketDto.from(ticket), HttpStatus.OK);
    }


    // Read operation
    @GetMapping("/tickets")
    public ResponseEntity<List<TicketDto>> fetchTicketList(){
        List<Ticket> tickets = ticketService.fetchTicketList();
        List<TicketDto> ticketsDto = tickets.stream().map(TicketDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(ticketsDto, HttpStatus.OK);
    }

    // Tickets by user operation
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/tickets/user/{userId}")
    public ResponseEntity<List<TicketDto>> fetchTicketsByUser(@PathVariable("userId") Long userId) {
        List<Ticket> tickets = ticketService.fetchTicketsByUser(userId);
        List<TicketDto> ticketsDto = tickets.stream().map(TicketDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(ticketsDto, HttpStatus.OK);
    }


    // Update operation
    @PutMapping("/tickets/{ticketId}/users/{userId}")
    public ResponseEntity<TicketDto> updateTicket(@PathVariable("ticketId") Long ticketId,
                                                  @PathVariable("userId") Long userId,
                                              @RequestBody final TicketDto ticketDto){
        Ticket ticket = ticketService.updateTicket(ticketId, userId, Ticket.from(ticketDto));
        return new ResponseEntity<>(ticketDto.from(ticket), HttpStatus.OK);
    }



    //Search operation
    @GetMapping("/tickets/{id}")
    public ResponseEntity<TicketDto> getTicketById(@PathVariable("id") Long ticketId){
        Ticket ticket = ticketService.getTicketById(ticketId);
        return new ResponseEntity<>(TicketDto.from(ticket), HttpStatus.OK);
    }

    // Delete operation
    @DeleteMapping("/tickets/{ticketId}/users/{userId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public String deleteTicketById(@PathVariable("ticketId") Long ticketId,
                                 @PathVariable("userId") Long userId)
    {
        ticketService.deleteTicketById(ticketId, userId);
        return "Deleted Successfully";
    }
}
