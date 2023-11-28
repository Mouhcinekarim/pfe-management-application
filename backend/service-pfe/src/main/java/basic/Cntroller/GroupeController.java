package basic.Cntroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import basic.CouchDao.GroupeDao;
import basic.CouchDao.ProfRepository;
import basic.Dto.RequestGroupe;
import basic.Dto.ResponseGroupe;
import basic.Service.ServiceGroupe;
import basic.chat.app.server.model.User;
import basic.module.Etudiant;
import basic.module.Groupe;
import basic.module.Prof;

@RestController
@RequestMapping("groupe")
public class GroupeController {
	@Autowired
	ServiceGroupe servicegroup;
	@Autowired()
	ProfRepository profdao;
	@Autowired
	GroupeDao groupdao;
	@PostMapping()
	void AddGroup( @RequestBody RequestGroupe group ) throws JsonMappingException, JsonProcessingException {
//		String p="{\"email\":\"mouhssinkarim34@gmail.com\",\"password\":\"trtyy\",\"niveau\":\"788878\",\"depatementId\":\"1\",\"etudiants\":[{\"nom\":\"DATSI\",\"prenom\":\"Driss\",\"appogee\":\"yjj\"},{\"nom\":\"KARIM\",\"prenom\":\"MOUHCINE\",\"appogee\":\"76996\"}]}";
//		RequestGroupe group=new ObjectMapper().readValue(p, RequestGroupe.class);
		group.setDepatementId(1);
		System.out.println(group.toString());
		servicegroup.AjouterGroup(group);
	}
	
	@GetMapping("/{email}")
	ResponseGroupe getPfeByEmail(@PathVariable("email")String email) {
		System.out.println(email);
		return servicegroup.getGroupsInfo(email);
	}
	
	@GetMapping("/listUsers")
	List<User>  getUserEmail(String username) {
		System.out.println(username);
		return servicegroup.getUserInfo(username);
	}
	
	@GetMapping("/listEtudiant")
	List<ResponseGroupe> getEtudiants(String niveux,String idProf){
		
		
		return servicegroup.ListEtudiant(niveux, idProf);
	}
	
	@GetMapping("/getnom_departement")
	ResponseEntity<String> getNomDepartement(String email){
		return new  ResponseEntity<String>(groupdao.findByEmail(email).get().getDepartement().getNomDepartement(),HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
	
}
