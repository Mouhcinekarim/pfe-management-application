package basic.Dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import basic.module.Departement;
import basic.module.Etudiant;
import basic.module.Groupe;
import basic.module.PfeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestGroupe {
	   private String Email;
	   private String Password;
	   private String niveau;
	   private Integer  depatementId;
	   private Etudiant[] etudiants;
}
