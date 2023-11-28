package basic.Dto;

import java.util.List;

import basic.module.Etudiant;
import lombok.Data;
import lombok.ToString;
@ToString
@Data
public class ProfPfeGroupDto  extends RespenseProf{
	
	private List<Etudiant> etudiant;
	
	private String titre;
	

}
