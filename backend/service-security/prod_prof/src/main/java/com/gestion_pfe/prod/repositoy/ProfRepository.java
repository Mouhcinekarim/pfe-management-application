package com.gestion_pfe.prod.repositoy;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestion_pfe.prod.model.Prof;

@Repository
public interface ProfRepository extends JpaRepository<Prof, Integer>{

	Optional<Prof> findByEmail(String email);

}
