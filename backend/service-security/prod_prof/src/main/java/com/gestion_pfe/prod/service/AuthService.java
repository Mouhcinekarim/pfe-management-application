package com.gestion_pfe.prod.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gestion_pfe.prod.dto.AuthenticationResponse;
import com.gestion_pfe.prod.dto.LoginRequest;
import com.gestion_pfe.prod.dto.RefreshTokenRequest;
import com.gestion_pfe.prod.dto.RegistrationRequest;
import com.gestion_pfe.prod.exceptions.PFE_RegistrationException;
import com.gestion_pfe.prod.model.Departement;
import com.gestion_pfe.prod.model.NotificationMail;
import com.gestion_pfe.prod.model.Prof;
import com.gestion_pfe.prod.model.VerificationToken;
import com.gestion_pfe.prod.repositoy.DepartementRepository;
import com.gestion_pfe.prod.repositoy.ProfRepository;
import com.gestion_pfe.prod.repositoy.VerificationTokenRepository;
import com.gestion_pfe.prod.security.JwtProvider;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

	private final PasswordEncoder passwordEncoder;
	private final ProfRepository profRepository;
	private final VerificationTokenRepository verificationTokenRepository;
	private final MailService mailService;
	private final AuthenticationManager authenticationManager;
	private final JwtProvider jwtProvider;
	private final RefreshTokenService refreshTokenService;
	private final DepartementRepository  depdao;
	private final ModelMapper modelMapper;
	
	// inscription du prof
	@Transactional
	public void signUp(RegistrationRequest registrationRequest) {
//		Prof prof = new Prof();
//		
//		prof.setNom(registrationRequest.getNom());
//		prof.setPrenom(registrationRequest.getPrenom());
//		prof.setEmail(registrationRequest.getEmail());
//		prof.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
//		prof.setCreated(Instant.now());
//		prof.setEnabled(false);
////		Prof 
		    System.out.println("prof");
			Prof prof=modelMapper.map(registrationRequest, Prof.class);
			prof.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
			prof.setEnabled(false);
			System.out.println("refew");
			prof.setCreated(Instant.now());
			Departement departement=depdao.findById(registrationRequest.getDepartementId()).get();
			//departement.addProf(prof);
		//	System.out.println("2"+departement.toString());
			prof.setDepartement(departement);
			
		//	RespenseProf profres=modelMapper.map( profRepository.save(prof), RespenseProf.class);
			//  System.out.println(profres);
		profRepository.save(prof);
		
		String token = generateVerificationToken(prof);
		mailService.sendMail(new NotificationMail("activer votre compte :",
				prof.getEmail()," "
						+ "visiter le lien ci-dessous pour activer votre compte : \n"
						+ "http://localhost:8082/api/auth/verifier-compte/"+token));
	}
	
	private String generateVerificationToken(Prof prof) {
		
		String token = UUID.randomUUID().toString();
		
		VerificationToken verificationToken = new VerificationToken();
		verificationToken.setToken(token);
		verificationToken.setProf(prof);
		
		verificationTokenRepository.save(verificationToken);
		return token;
	}

	public void verifyCompte(String token) {
		// TODO Auto-generated method stub
		Optional<VerificationToken>  verificationToken = verificationTokenRepository.findByToken(token);
		
		verificationToken.orElseThrow(() -> new PFE_RegistrationException("token invalid"));
		
		fetchProfAndEnable(verificationToken.get());
	}

	@Transactional
	private void fetchProfAndEnable(VerificationToken verificationToken) {
		// TODO Auto-generated method stub
		String email = verificationToken.getProf().getEmail();
		
		Prof prof = profRepository.findByEmail(email).orElseThrow(()-> new PFE_RegistrationException(""
				+ "prof not found"));
		
		prof.setEnabled(true);
		
		profRepository.save(prof); // Update
	}

	public AuthenticationResponse login(LoginRequest loginRequest) {
		// TODO Auto-generated method stub
		
		Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginRequest.getEmail(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtProvider.generateToken(authentication);
		return AuthenticationResponse.builder()
        .authenticationToken(token)
        .refreshToken(refreshTokenService.generateRefreshToken().getToken())
        .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
        .email(loginRequest.getEmail())
        .build();
		}

	public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtProvider.generateTokenWithUserName(refreshTokenRequest.getUsername());
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenRequest.getRefreshToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .email(refreshTokenRequest.getUsername())
                .build();
    }
}















