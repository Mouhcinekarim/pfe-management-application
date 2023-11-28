package basic.Dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import basic.module.Departement;
import basic.module.PfeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProfDto implements Serializable{
	 private String nom;
     private String prenom;
     private String email;
     private String password;
     private Integer departementId;
	
	
	
     
}
