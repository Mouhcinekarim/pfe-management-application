package  basic.chat.app.server.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import basic.module.Etudiant;
import lombok.Data;


@Data
public class User {

    

  
    private String username;

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
    private Boolean connected = true;

    public User() {
        super();
    }
  

}
