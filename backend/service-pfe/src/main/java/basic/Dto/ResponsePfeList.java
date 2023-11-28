package basic.Dto;



import basic.module.PfeFichier;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePfeList {
private Integer PfeInfoId;
	
	private String titre;	
	
	private String niveau;	
	
	private String description;
	
	private int anne;
	
	private boolean conferm;
	
	private boolean isStage;
	
	private byte[] photo;
	   
	private boolean isGroup;
	
	private byte[] rapport;
	
	public void setFichier(PfeFichier fichier) {
		   this.photo=fichier.getPhoto();
		   this.rapport=fichier.getRapport();
	   }
}
