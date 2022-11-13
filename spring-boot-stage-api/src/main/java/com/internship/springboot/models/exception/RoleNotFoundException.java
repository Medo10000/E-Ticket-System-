package com.internship.springboot.models.exception;

import java.text.MessageFormat;

public class RoleNotFoundException extends RuntimeException{
    public RoleNotFoundException(final Integer id){
        super(MessageFormat.format("Could not find role with id: {0}", id));
    }
}
