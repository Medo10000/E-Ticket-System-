package com.internship.springboot.repository;

import com.internship.springboot.models.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransferRepository extends JpaRepository<Transfer, Long> {
    @Query("select t from Transfer t where t.transferId = ?1")
    Transfer findTransferById(Long transferId);
}