package basic.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import basic.CouchDao.DepartementRepository;
import basic.CouchDao.GroupeDao;
import basic.CouchDao.PfeInfoDao;
import basic.CouchDao.ProfRepository;
import basic.Dto.RequestGroupe;
import basic.Dto.ResponseGroupe;
import basic.chat.app.server.model.User;
import basic.module.Departement;
import basic.module.Groupe;
import basic.module.PfeInfo;
import basic.module.Prof;
    @Service
public class ServiceGroupe {
	@Autowired
	DepartementRepository  depdao;
	@Autowired
    ModelMapper modelMapper;
	@Autowired
	GroupeDao groupdao;
	@Autowired()
	PfeInfoDao pfedao;
	@Autowired()
	ProfRepository profdao;
    public void AjouterGroup(RequestGroupe groupedto){
    	Departement departement=depdao.findById(groupedto.getDepatementId()).get();
    	System.out.println("dep");
    	Groupe groupe=modelMapper.map(groupedto, Groupe.class);
    	
    	departement.addGroup(groupe);
    	
    	
    
    	groupe.setAnne(LocalDate.now().getYear());
    	groupe.AddEtudiant(groupe.getEtudiants());
    	System.out.println("2");
    	groupdao.save(groupe);
    }
    
    void AddPfeToGroup(Integer p,Integer g){
    	 Groupe group =groupdao.findById(g).get();
    	 PfeInfo pfe=pfedao.findById(p).get();
    	 
    	 
    	
    	
    }
    
    public ResponseGroupe getGroupsInfo(String email){
    	Groupe group=groupdao.findByEmail(email).get();
    	ResponseGroupe resp=modelMapper.map(group,ResponseGroupe.class);
    	resp.setNom_prof(group.getPfeinfo().getProf().getNom());
    	resp.setPrenom_prof(group.getPfeinfo().getProf().getPrenom());
    	resp.setDescription(group.getPfeinfo().getDescription());
    	resp.setTitre(group.getPfeinfo().getTitre());
    	resp.setEmail_prof(group.getPfeinfo().getProf().getEmail());
    	
    	return resp;
    	
    }
    
   public List<User>  getUserInfo(String user){
	   System.out.println(user);
	   Groupe group=groupdao.findByEmail(user).get();
	   List<User>  users = new ArrayList<User>();
	   User user1 =new User();
	   if(!group.getPfeinfo().isConferm()) {
		   user1=modelMapper.map(group.getPfeinfo(),User.class);
		   
	   user1.setUsername(group.getPfeinfo().getProf().getEmail());
	   user1.setNom_prof(group.getPfeinfo().getProf().getNom());
	   user1.setPrenom_prof(group.getPfeinfo().getProf().getPrenom());
	   users.add(user1);
	   }
	   return users;
   }
   
   public List<ResponseGroupe> ListEtudiant(String niveux,String idProf) {
	   System.out.println(niveux+" 2 "+idProf);
	   Prof prof=profdao.findByEmail(idProf).get();
		if(!prof.isChef()) return null;
		return groupdao.ListEtudient(niveux, prof.getDepartement()).stream().map((group)->{
			ResponseGroupe resp=new ResponseGroupe();
			
			resp.setEtudiants(group.getEtudiants());
			resp.setEmail(group.getEmail());
			return resp;
		}).toList();
   }
}
