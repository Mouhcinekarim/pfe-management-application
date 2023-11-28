package basic.Service;



import java.time.Year;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import basic.CouchDao.DepartementRepository;
import basic.CouchDao.GroupeDao;
import basic.CouchDao.PfeFichierDao;
import basic.CouchDao.PfeInfoDao;
import basic.CouchDao.ProfRepository;
import basic.Dto.ProfPfeGroupDto;
import basic.Dto.RequestPfeDto;
import basic.Dto.ResponsePfeDto;
import basic.module.Departement;
import basic.module.Groupe;
import basic.module.PfeFichier;
import basic.module.PfeInfo;
import basic.module.Prof;


@Service
public class ServicePFE {
	private 	Integer max,i;
	@Autowired
	PfeInfoDao pfeDao;
	@Autowired
	GroupeDao groupedao;
	
	@Autowired
	PfeFichierDao daofichier;
	@Autowired
	ProfRepository profdao;
	@Autowired
    ModelMapper modelMapper;
	@Autowired
	DepartementRepository depaDao;
	public PfeInfo  Ajouter(RequestPfeDto  pfetdo){
		
		Prof prof =profdao.findByEmail(pfetdo.getIdprof()).get();
		System.out.println("stage"+pfetdo.isStage());
		PfeFichier fichiers=modelMapper.map(pfetdo, PfeFichier.class);
		
		PfeInfo    pfeinfo=modelMapper.map(pfetdo, PfeInfo.class);
		pfeinfo.setStage(pfetdo.isStage());
		pfeinfo.setPfefichier(fichiers);
	  
		prof.addPfe(pfeinfo);
		PfeInfo saved=null;
		 saved =pfeDao.save(pfeinfo);
		
		 return saved;
		
	}
	
	@Transactional
	public  void updatePfe(RequestPfeDto  pfetdo,Integer idpfe) {
		
		  

		//	System.out.println(prof.toString());
			PfeFichier fichiers=modelMapper.map(pfetdo, PfeFichier.class);
			
			PfeInfo    pfeinfo=modelMapper.map(pfetdo, PfeInfo.class);
			System.out.println("zizo");
			
			
			System.out.println("zad");
			pfeinfo.setPfefichier(fichiers);
			System.out.println("mou");
		//	System.out.println(pfeinfo);
		    System.out.println("ka");
			//profdao.save(prof);
		    Integer idfichier=pfeDao.findById(idpfe).get().getPfefichier().getPfeFichierId();
		if(pfeinfo.getPfefichier().getRapport()!=null)    daofichier.updatefichier(idfichier, pfeinfo.getPfefichier().getPhoto(), pfeinfo.getPfefichier().getRapport());
			System.out.println("pass");
		    pfeDao.updatePfeInfo(idpfe,pfeinfo.getAnne(),pfeinfo.getDescription(),pfeinfo.getNiveau(),pfeinfo.getTitre());
		    
			System.out.println("fin");
//			System.out.println(saved.getPfefichier().getPhoto().length);
//			ResponsePfeDto respo= modelMapper.map(saved, ResponsePfeDto.class);
//			respo.setPhoto(saved.getPfefichier().getPhoto());
//			respo.setRapport(saved.getPfefichier().getRapport());
		
		
	}
	
	public List<ResponsePfeDto> getAll(){
		
		
		return pfeDao.findAllP().stream().map((pfe)->{
			
			ResponsePfeDto   resdto=modelMapper.map(pfe,ResponsePfeDto.class);
			
			resdto.setFichier(pfe.getPfefichier());
			
			resdto.setProf(pfe.getProf());
			
			
			
			
			System.out.println(pfe.getNiveau());
			
			return resdto;
		}).collect(Collectors.toList());
	}
	
	
	
	 public  List<ProfPfeGroupDto> MellangePfe_Group(Integer Anne,String niveux,String id_prif) {
		 Prof prof =profdao.findByEmail(id_prif).get();
		 if(!prof.isChef()) return null;
		 List<ProfPfeGroupDto> listdto=new ArrayList<ProfPfeGroupDto>();
		 
		 System.out.println(prof.getNom());
		    Departement departement=prof.getDepartement();
			Integer[][] pg=profdao.findProfAndPfe(Anne,niveux,departement);
			System.out.println(pg.length);
			
			List<Integer> pfe=MellangeList(pg);
			List<Integer> groups=groupedao.getAllIdNoGroup();
            System.out.println("list pfe "+pfe.size());
            System.out.println("list group"+groups.size());
			ListIterator<Integer>  Ipfe=pfe.listIterator(0);
			ListIterator<Integer> Igroups=groups.listIterator(0);
	 
         
				Map<Integer ,Integer> listpfegroup=new HashMap<Integer,Integer>();
			System.out.println("mellange");
			
			while(Igroups.hasNext()&Ipfe.hasNext()) {
				
				int pfe1=Ipfe.next();
				int group=Igroups.next();
				
				listpfegroup.put(pfe1,group);
				}
			
			
			System.out.println(listpfegroup.isEmpty());
			
			listpfegroup.forEach((p,g)-> listdto.add(update(p,g)));
			
			
			return listdto;
		  
	  }
	  
	  
	  List<Integer> MellangeList(Integer[][] pg){
			
			


//			Integer[][] pg=profdao.findProfAndPfe();

			
			
			
			
			Map<Integer,ArrayList< Integer>> listmap1 = new HashMap<Integer,ArrayList<Integer>>();
			
//			for(int i=0;i<pg.length;i++) System.out.println(pg[i][0]+" : "+pg[i][1]);
			
			Set<Integer> profs=new HashSet<Integer>();
			for(int k=0;k<pg.length;k++) profs.add(pg[k][0]);
			profs.forEach((e)->{
				System.out.println(e);
				ArrayList<Integer> pfes=new ArrayList<Integer>();
				
				for(int j=0;j<pg.length;j++)  if(e==pg[j][0]) pfes.add(pg[j][1]);
				
				listmap1.put(e, pfes);
			});
			
			listmap1.forEach((prof,pfe)->{
				
				pfe.forEach(p->System.out.println(p));
				
			});
			List<Integer> list=groupedao.getAllId();
			
			 
			
			
			
			
		
		   List<Integer> listpfe=new ArrayList<Integer>();
		   
		   for( i=0;i<maxlist(listmap1.values());i++) {
			   
			   listmap1.forEach((p,pf)->{
				if(i<pf.size())   listpfe.add(pf.get(i));
			   });
		   }
		   
//		   System.out.println("list final ");
		   listpfe.forEach(e-> System.out.println(e));
			
			return listpfe;
			
		}
	  Integer maxlist(Collection<ArrayList<Integer>> list) {
		  max=0;
		list.forEach((p)->{

			if(p.size()>max) max=p.size();
			
		
			
		});
		return max;
	}
	  ProfPfeGroupDto update(Integer Idpfe,Integer Idgroupe) {
		  ProfPfeGroupDto dto=new ProfPfeGroupDto();
		  System.out.println(Idpfe+"  1 "+Idgroupe);
			PfeInfo pfe1=pfeDao.findById(Idpfe).get();
			Groupe groupe=groupedao.findById(Idgroupe).get();
			
			dto.setEmail(pfe1.getProf().getEmail());
			dto.setEtudiant(groupe.getEtudiants());
			dto.setNom(pfe1.getProf().getNom());
			dto.setPrenom(pfe1.getProf().getPrenom());
			dto.setTitre(pfe1.getTitre());
			pfe1.setGroupe(groupe);
			groupe.setPfeinfo(pfe1);
//			
			pfeDao.save(pfe1);
			groupedao.save(groupe) ;  
			System.out.println("nom"+dto.getNom());
			return dto;
		}
	
	  public List<ResponsePfeDto> getProfTitre(String niveux,String idprof) {
		  System.out.println(niveux+" 1 "+idprof);
		  Prof prof =profdao.findByEmail(idprof).get();
		  if(!prof.isChef()) return null;
		  List<PfeInfo> listpfe= pfeDao.findListProfTitre(niveux,prof.getDepartement(),Year.now().getValue());
		  
		  return listpfe.stream().map((pfe)->{
			  ResponsePfeDto resp=new ResponsePfeDto();
			  resp.setTitre(pfe.getTitre());
			  resp.setNom(pfe.getProf().getNom());
			  resp.setPrenom(pfe.getProf().getPrenom());
			  return resp;
			  
		  }).toList();
	  }
	
	
}