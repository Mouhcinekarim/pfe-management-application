package basic.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import basic.CouchDao.DepartementRepository;
import basic.module.Departement;




@Service
public class DepartementService {

	@Autowired
	private DepartementRepository departementRepository;
	
	public Iterable<Departement> getAllDepartements(){
		return departementRepository.findAll();
	}

	public Optional<Departement> getDepartement(Integer id){
		return departementRepository.findById(id);
	}
	
	
	
//	//	//	//	//	//	//	//	//	//	//	//	//	//	//	//	//	//	//	//
	
	public  Departement saveDepartement(Departement departement) {
		return departementRepository.save(departement);
	}
	
	public void deleteDepartement(Integer id) {
		departementRepository.deleteById(id);
	}
}
