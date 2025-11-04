package com.recruitment.recruitment_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "UnitManagers")
@Getter
@Setter
@ToString(exclude = {"user"})
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UnitManager {
    @Id
    private Integer useID;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "userID")
    @NonNull
    private User user;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(nullable = false, length = 100)
    private String position;
}
