package basic.CouchDao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import basic.module.Departement;
import basic.module.Prof;




@Repository
public interface DepartementRepository extends JpaRepository<Departement, Integer>{

	Optional<Departement> findByDepartementId(Integer departementId);

	

}
