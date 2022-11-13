package com.internship.springboot.models.exception;

import java.text.MessageFormat;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(final Long userId){
        super(MessageFormat.format("Could not find user with id: {0}", userId));
    }
}
