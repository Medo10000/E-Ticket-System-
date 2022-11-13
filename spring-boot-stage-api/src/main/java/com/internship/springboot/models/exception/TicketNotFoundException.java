package com.internship.springboot.models.exception;

import java.text.MessageFormat;

public class TicketNotFoundException extends RuntimeException{
    public TicketNotFoundException(final Long ticketId){
        super(MessageFormat.format("Could not find ticket with id: {0}", ticketId));
    }
}
