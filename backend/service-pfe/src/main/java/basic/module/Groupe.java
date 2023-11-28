package basic.module;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="groupe")
public class Groupe  implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
   private  Integer GroupId;
   private String email;
   private String Password;
   private String niveau;
   private Integer Anne;
	private Instant created;//
	private boolean isEnabled;//
   @OneToMany(
		    mappedBy="group",
			fetch=FetchType.LAZY,
			cascade=CascadeType.ALL
			
			)
  
  private   List<Etudiant> etudiants;
   @OneToOne()
   
   PfeInfo pfeinfo;
   @ManyToOne()
   @JoinColumn(name="departement_id")
   @JsonIgnore
  private Departement departement;
  
   
   
   
   public void AddEtudiant(List<Etudiant> etudiant) {
	   etudiant.forEach((e)->{
//		   this.etudiants.add(e);
		   e.setGroup(this);
		   
	   });
   }
}
