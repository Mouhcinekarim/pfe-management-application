package basic.module;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="pfe_fichier")
public class PfeFichier implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="pfe_fichier_id")
	private Integer pfeFichierId;
	
	@Column(columnDefinition="LONGBLOB")
	private byte[] photo;
	@Column(columnDefinition="LONGBLOB")
	  private byte[] rapport;
}
