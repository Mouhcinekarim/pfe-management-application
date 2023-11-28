package basic.CouchDao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import basic.module.PfeFichier;

public interface PfeFichierDao extends JpaRepository<PfeFichier,Integer>{
	 @Modifying
	@Query("update PfeFichier   set  photo=:photo,rapport=:rapport where pfeFichierId =:pfeFichierId")
	void updatefichier(@Param(value="pfeFichierId") Integer pfeFichierId ,@Param(value="photo") byte[] photo,@Param(value="rapport") byte[] rapport);
	

}
