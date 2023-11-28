package basic.CouchDao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import basic.module.Departement;
import basic.module.PfeInfo;

public interface PfeInfoDao extends JpaRepository<PfeInfo,Integer> {

	@Modifying
	@Query("update PfeInfo   set  niveau=:niveau,titre=:titre,anne=:anne ,description=:description where PfeInfoId =:PfeInfoId")
	Integer updatePfeInfo(@Param(value = "PfeInfoId") Integer PfeInfoId, @Param(value = "anne") int anne,@Param(value="description")String description ,@Param(value = "niveau")String niveux, @Param(value = "titre")String titre );
     @Query("select pf from PfeInfo pf where pf.conferm=true")
	 List<PfeInfo> findAllP();
	
	@Query("select p.PfeInfoId from PfeInfo p  where p.conferm=false")
	List<Integer> getAllId();
	
	@Procedure
	void conferme_pfe(int idPfe,String channel);
	
	@Query("select p from PfeInfo p where p.niveau=:niveau and p.prof.departement=:departement and p.anne=:year and p.groupe is null and p.conferm=false")
	List<PfeInfo> findListProfTitre(@Param(value = "niveau")String niveux,@Param(value = "departement")Departement dep,@Param(value = "year")int year);

    @Query("select p from PfeInfo p where p.prof.email=:email and p.conferm=false")
    List<PfeInfo> ListPfeNoCofirme(@Param(value = "email")String email);
}
