package com.recruitment.recruitment_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Notifications")
@Getter 
@Setter 
@ToString(exclude = {"candidate", "sender"}) 
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer notifID;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false, length = 50)
    private String position;

    @Column(nullable = false)
    private LocalDate sentDate;

    @OneToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "candidateID", nullable = false) 
    private Candidate candidate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false) 
    @JoinColumn(name = "senderID", nullable = false)
    private PersonnelManager sender;
}
