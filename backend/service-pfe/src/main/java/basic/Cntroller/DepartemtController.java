package basic.Cntroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import basic.CouchDao.DepartementRepository;
import basic.CouchDao.ProfRepository;
import basic.module.Departement;
import basic.module.Prof;
@RestController
@RequestMapping("departement")
public class DepartemtController {
	@Autowired()
	private  DepartementRepository daoDepar;

	@PostMapping("")
	Departement saveDepartement(@RequestBody()Departement departement) {
//	
		return daoDepar.save(departement);
	}
	
	
	
	
	
}
