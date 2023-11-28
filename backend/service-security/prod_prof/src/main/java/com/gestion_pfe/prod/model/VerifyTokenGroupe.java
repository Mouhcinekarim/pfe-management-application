package com.gestion_pfe.prod.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.bytebuddy.agent.builder.AgentBuilder.InitializationStrategy.SelfInjection.Lazy;

@Data
@AllArgsConstructor
@NoArgsConstructor
//@Entity
//@Table(name="verification_token_groupe")
public class VerifyTokenGroupe {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="verification_id")
    private Integer verificationId;
	
    private String token;
    
    @OneToOne(
    		fetch = FetchType.LAZY
    		)
    private Prof prof;
    
    private Instant expiryDate;
    
    @OneToMany(
    		fetch = FetchType.LAZY
    		)
    private Groupe groupe;
}


