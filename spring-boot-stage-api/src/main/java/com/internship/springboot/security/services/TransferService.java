package com.internship.springboot.security.services;

import com.internship.springboot.models.Transfer;

import java.util.List;

public interface TransferService {
    // Save operation
    Transfer saveTransfer(Long userId, Long ticketId, Transfer transfer);

    // Read operation
    List<Transfer> fetchTransferList();

    // Update operation
    Transfer updateTransfer(Long transferId, Long userId, Transfer transfer);

    // Search operation
    Transfer getTransferById(Long transferId);

    // Delete operation
    void deleteTransferById(Long transferId);
}
