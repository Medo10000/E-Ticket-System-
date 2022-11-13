package com.internship.springboot.models.exception;

import java.text.MessageFormat;

public class RoleIsAlreadyAssignedException extends RuntimeException{
    public RoleIsAlreadyAssignedException(final Long userId, final Integer roleId){
        super(MessageFormat.format("User: {0} is already assigned to role: {1}", userId, roleId));
    }
}
