package basic.CouchDao;


import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import basic.module.Departement;
import basic.module.Etudiant;
import basic.module.Groupe;
import basic.module.Prof;


@Repository
public interface GroupeDao  extends JpaRepository<Groupe,Integer>{
	@Modifying
	@Query("select g.GroupId from Groupe g")
	List<Integer> getAllId();
	
	@Query("select g.GroupId from Groupe g where g.pfeinfo=null")
	List<Integer> getAllIdNoGroup();
	
	Optional<Groupe> findByEmail(String Email);
	
	@Query("select g from Groupe g where g.niveau=:niveau  and g.pfeinfo is NULL and g.departement=:departement ")
	List<Groupe> ListEtudient(@Param("niveau")String niveux,@Param("departement") Departement departement);
}
