package com.internship.springboot.controllers;

import com.internship.springboot.models.Transfer;
import com.internship.springboot.models.dto.TransferDto;
import com.internship.springboot.security.services.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TransferController {

    // Annotation
    @Autowired
    public TransferService transferService;

    // Save operation
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/transfers/user/{userId}/ticket/{ticketId}")
    public ResponseEntity<TransferDto> saveTransfer(@PathVariable final Long userId,
                                                    @PathVariable final Long ticketId,
                                                    @RequestBody final TransferDto transferDto){
        Transfer transfer = transferService.saveTransfer(userId, ticketId, Transfer.from(transferDto));
        return new ResponseEntity<>(TransferDto.from(transfer), HttpStatus.OK);
    }

    // Read operation
    @GetMapping("/transfers")
    public ResponseEntity<List<TransferDto>> fetchTransferList(){
        List<Transfer> transfers = transferService.fetchTransferList();
        List<TransferDto> transfersDto = transfers.stream().map(TransferDto::from).collect(Collectors.toList());
        return new ResponseEntity<>(transfersDto, HttpStatus.OK);
    }

    //Search operation
    @GetMapping("/transfers/{transferId}")
    public ResponseEntity<TransferDto> getTransferById(@PathVariable final Long transferId){
        Transfer transfer = transferService.getTransferById(transferId);
        return new ResponseEntity<>(TransferDto.from(transfer), HttpStatus.OK);
    }

    // Delete operation
    @DeleteMapping("/transfers/{transferId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public String deleteTransferById(@PathVariable("transferId") Long transferId)
    {
        transferService.deleteTransferById(transferId);
        return "Deleted Successfully";
    }
}
