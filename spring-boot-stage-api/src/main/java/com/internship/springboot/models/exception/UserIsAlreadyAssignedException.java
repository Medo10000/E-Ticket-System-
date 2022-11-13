package com.internship.springboot.models.exception;

import java.text.MessageFormat;

public class UserIsAlreadyAssignedException extends RuntimeException{
    public UserIsAlreadyAssignedException(final Long ticketId, final Long userId){
        super(MessageFormat.format("Ticket: {0} is already assigned to user: {1}", ticketId, userId));
    }
}
