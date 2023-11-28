package basic.Dto;

import java.util.Base64;

import javax.persistence.Lob;

import lombok.Data;
import lombok.ToString;
@Data
@ToString
public class RequestPfeDto {
	   private String idprof;
	
	   private String titre;
	  
	   private String niveau;
	   
	   @Lob
	   private String description;
	   
	   private int anne;
	   
	   private boolean stage;
	   
	   private String rapport1;
	   
	   private String photo1;
	   
	   private byte[] photo;
	   
	   private byte[] rapport;
	   
	   private boolean conferm;
	   public void convert() {
		  if(photo1!=null) this.photo= Base64.getDecoder().decode(new String(photo1.substring(photo1.indexOf(",") + 1)));
		  if(rapport1!=null) this.rapport= Base64.getDecoder().decode(new String(rapport1.substring(rapport1.indexOf(",") + 1)));
		   
	   }
}
