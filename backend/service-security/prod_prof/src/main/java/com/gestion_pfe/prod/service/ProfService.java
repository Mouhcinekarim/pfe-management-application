package com.gestion_pfe.prod.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestion_pfe.prod.model.Prof;
import com.gestion_pfe.prod.repositoy.ProfRepository;

@Service
public class ProfService {
	@Autowired
	private ProfRepository profRepository;
	
	public Optional<Prof> findProf(String email) {
		return profRepository.findByEmail(email);
	}
}
