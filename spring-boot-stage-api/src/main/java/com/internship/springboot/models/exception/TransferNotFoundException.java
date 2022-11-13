package com.internship.springboot.models.exception;

import java.text.MessageFormat;

public class TransferNotFoundException extends RuntimeException{
    public TransferNotFoundException(final Long transferId){
        super(MessageFormat.format("Could not find Transfer with id: {0}", transferId));
    }
}
