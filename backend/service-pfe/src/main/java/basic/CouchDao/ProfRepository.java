package basic.CouchDao;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import basic.module.Departement;
import basic.module.PfeInfo;
import basic.module.Prof;




@Repository
public interface ProfRepository extends JpaRepository<Prof, Integer>{
    Optional<Prof> findProfByprofId(Integer id);
    
    @Query("select p from Prof p where p.email=:email")
	Optional<Prof> findByEmail(@Param("email")String email);

	@Query("select p from Prof p ,PfeInfo pf where p=pf.prof and pf.conferm=true")
	List<Prof>  findAllP();
	
	Optional<Prof> findByNom(String nom);

	Optional<Prof> findByNomAndPrenom(String nom, String prenom);
	@Query("select pf from PfeInfo pf where pf.prof.email=:id and pf.conferm=:etat")
	Optional<List<PfeInfo>> findPfesInfoByProfEmail(@Param("id")String id,@Param("etat")boolean etat);
	
	@Query("select pf from PfeInfo pf where pf.prof.email=:id  and pf.conferm=false and pf.groupe!=null")
	Optional<List<PfeInfo>> findPfesInfoByProfEmail23(@Param("id")String id);
		
	@Query("select P.pfesInfo from Prof P where P.email=:id")
	Optional<List<PfeInfo>> findPfesInfoByProfEmail(@Param("id")String id);
	
	
	void deleteByEmail(String email);
	
    @Query("select  P.profId ,Pf.PfeInfoId  from Prof P, PfeInfo Pf where Pf.prof =P and Pf.niveau=:niveux and Pf.anne=:anne and P.departement=:departement and Pf.conferm=false and Pf.groupe=null")
	Integer[][] findProfAndPfe(@Param("anne")Integer Anne,@Param("niveux")String niveux,@Param("departement")Departement departement);	 
	 
}
