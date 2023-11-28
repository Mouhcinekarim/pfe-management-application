package basic.Service;

import java.time.Instant;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import basic.CouchDao.DepartementRepository;
import basic.CouchDao.ProfRepository;
import basic.Dto.ProfDto;
import basic.Dto.RespenseProf;
import basic.Dto.ResponseGroupe;
import basic.Dto.ResponsePfeDto;
import basic.Dto.ResponsePfeList;
import basic.module.Departement;
import basic.module.Prof;
import  basic.chat.app.server.model.User;

@Service
public class ServiceProf {
	
	@Autowired
	private ProfRepository profRepository;
	@Autowired
	 private ModelMapper modelMapper;
	
	@Autowired
	private DepartementRepository departementRepository;
	public Iterable<Prof> getAllProfs(){
		
	
		
		return profRepository.findAllP();
	}
	
	public Optional<Prof> getProf(String nom,String prenom){
		return profRepository.findByNomAndPrenom(nom,prenom);
	}
	
	
	public Prof saveProf(ProfDto profdto) {
        System.out.println("332");
		Prof prof=modelMapper.map(profdto, Prof.class);
		System.out.println("refew");
		prof.setCreated(Instant.now());
		Departement departement=departementRepository.findByDepartementId(profdto.getDepartementId()).get();
		//departement.addProf(prof);
	//	System.out.println("2"+departement.toString());
		prof.setDepartement(departement);
		
	//	RespenseProf profres=modelMapper.map( profRepository.save(prof), RespenseProf.class);
		//  System.out.println(profres);
		 return profRepository.save(prof);
		 
	}
	
	
	public void deleteProf(String email) {
		profRepository.deleteByEmail(email);
	}
	
	public List<ResponsePfeList> listpfe(String id){
		return profRepository.findPfesInfoByProfEmail(id,true).get().stream().map((pfe)->{
			
			ResponsePfeList   resdto=modelMapper.map(pfe,ResponsePfeList.class);
			System.out.println(pfe.isConferm());
			resdto.setConferm(pfe.isConferm());
			resdto.setFichier(pfe.getPfefichier());
			return resdto;
		}).collect(Collectors.toList());
	}
	
	public List<ResponseGroupe> getGroupes(String  id){
		
		
return profRepository.findPfesInfoByProfEmail23(id).get().stream().map((pfe)->{
			
	ResponseGroupe   resdto=modelMapper.map(pfe,ResponseGroupe.class);
	      System.out.println(pfe.getGroupe().getEmail());
	        resdto.setEtudiants(pfe.getGroupe().getEtudiants());
	        System.out.println(pfe.isConferm());
	        resdto.setGroupId(pfe.getGroupe().getGroupId());
	        resdto.setEmail(pfe.getGroupe().getEmail());
	       
	        
	        return resdto;
	        		
	
			
		}).collect(Collectors.toList());
	}
	
	public List<User>  getUsersgroup(String username){
		
		return getGroupes(username).stream().map((group)->{
			User user=new User();
			System.out.println(group.getNom_prof());
			user=modelMapper.map(group,User.class);
			user.setUsername(group.getEmail());
			
			return user;
		}).collect(Collectors.toList());
	}
}

