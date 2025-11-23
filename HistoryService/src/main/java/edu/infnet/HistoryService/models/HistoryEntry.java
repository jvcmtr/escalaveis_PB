package edu.infnet.HistoryService.models;

import java.time.ZonedDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class HistoryEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String source;
    private String entityName;
    private String entityId;

    private String username;
    private String action;
    private ZonedDateTime date;
    
    @Column(length = 2000)
    private String oldStateJSON;
    
    @Column(length = 2000)
    private String newStateJSON;
}
