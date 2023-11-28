package basic.Dto;

import java.util.List;



import basic.module.Etudiant;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ResponseGroupe {
	private Integer PfeInfoId;
	private String Email;
	private String description;
	private String titre;	
	private String niveau;
	private Integer GroupId;
	private int anne;
	private String email_prof;
	private String nom_prof;
	private String prenom_prof;
	private List<Etudiant> etudiants;
	
}
