package basic.Cntroller;


import java.io.IOException;
import java.time.Year;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import basic.CouchDao.PfeInfoDao;
import basic.Dto.ProfPfeGroupDto;
import basic.Dto.RequestPfeDto;
import basic.Dto.ResponsePfeDto;
import basic.Dto.ResponsePfeList;
import basic.Service.ServicePFE;
import basic.module.PfeInfo;


@RestController
@RequestMapping("PFE")

public class PFEController {
	@Autowired
	ServicePFE servicepfe;
	@Autowired
	PfeInfoDao pfeDao;
	@Autowired
    ModelMapper modelMapper;
	
   @PostMapping(value="")	
   PfeInfo Upload(@RequestBody String  pfe) throws IOException {
	  
	   RequestPfeDto pfeDto=new RequestPfeDto();
	   try {
		pfeDto= new ObjectMapper().readValue(pfe, RequestPfeDto.class);
		pfeDto.convert();
		
	} catch (JsonProcessingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	   
//	   pfeDto.setRapport(rapport.getBytes());
//	   pfeDto.setPhoto(photo.getBytes());
	  return  servicepfe.Ajouter(pfeDto);
	   
	   
   }
   
   
    @GetMapping("")
	List<ResponsePfeDto> getAll(){
		
		return servicepfe.getAll();
	}
    
    @PutMapping("/update")
    void  update(Integer idpfe,@RequestBody String  pfe) throws IOException {
    
    	 RequestPfeDto pfeDto=new RequestPfeDto();
  	   try {
  		pfeDto= new ObjectMapper().readValue(pfe, RequestPfeDto.class);
//  		System.out.println(pfeDto.toString());
  		 pfeDto.convert();
  		
  	} catch (JsonProcessingException e) {
  		// TODO Auto-generated catch block
  		e.printStackTrace();
  	}
  	   
  	  
  	   
  	    servicepfe.updatePfe(pfeDto,idpfe);
    }
	
    @GetMapping("/melange")
     List<ProfPfeGroupDto> mellange(String niveux,String idprof) {
    	System.out.println(niveux+" "+idprof);
    	return servicepfe.MellangePfe_Group(Year.now().getValue(), niveux, idprof);
    	
    }
    
    @GetMapping("/conferme")
    void conferme_pfe(String  pfe_id,String channel) {
    	System.out.println(pfe_id+"  "+channel);
    	pfeDao.conferme_pfe(Integer.parseInt(pfe_id),channel);
    }
    
    @GetMapping("/PFE")
    List<ResponsePfeDto>  ListProfPfe(String niveux,String idprof) {
    	return servicepfe.getProfTitre(niveux,idprof);
    }
    
    @PutMapping("/updatedescription")
    void updateDescription(Integer idpfe,@RequestBody String description){
    	PfeInfo pfe=pfeDao.getById(idpfe);
    	pfe.setDescription(description);
    	pfeDao.save(pfe);
    }
    
    @GetMapping("/PFENoConfirmer")
	List<ResponsePfeList> PFENoConfirmer(String email){
    	return  pfeDao.ListPfeNoCofirme(email).stream().map((pfe)->{
    		ResponsePfeList result=	 modelMapper.map(pfe, ResponsePfeList.class);
    		result.setGroup(pfe.getGroupe()==null);
    		return result;
    	}).toList();
    	
    }
    
    @DeleteMapping("/deletepfe")
    void deletePfe(Integer idpfe){
    	
    	pfeDao.deleteById(idpfe);
    	
    }
	
}
