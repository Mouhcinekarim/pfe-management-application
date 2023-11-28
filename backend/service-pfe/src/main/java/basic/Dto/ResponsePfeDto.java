package basic.Dto;

import java.io.Serializable;

import javax.persistence.Lob;

import basic.module.PfeFichier;
import basic.module.Prof;
import lombok.Data;
import lombok.ToString;
@ToString
@Data
public class ResponsePfeDto {
	   private String titre;
	   
	   private String niveau;
	   @Lob
	   private String description;
	 
	   private int anne;
	   
       private boolean isStage;
	   
	   private byte[] photo;
	   
	   private byte[] rapport;
	   
	   private String nom_departement;
	   
	   private String nom;
	   
	   private String prenom;
	   
	   private String email;
	   
	   private boolean conferm;
	   
	   public void setFichier(PfeFichier fichier) {
		   this.photo=fichier.getPhoto();
		   this.rapport=fichier.getRapport();
	   }
	   
	   public void setProf(Prof prof) {
		   this.nom=prof.getNom();
		   this.prenom=prof.getPrenom();
		   this.nom_departement=prof.getDepartement().getNomDepartement();
		   this.email=prof.getEmail();
		   
	   }
	   
}
