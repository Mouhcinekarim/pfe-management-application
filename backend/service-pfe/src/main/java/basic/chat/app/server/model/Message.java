package  basic.chat.app.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import java.util.Base64;
import java.util.Date;
@Data
@Entity
@Table(name = "message")
public class Message {

    @JsonIgnore
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "channel")
    private String channel;

    @Column(name = "sender")
    private String sender;

    @Column(name = "content")
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "timestamp")
    private Date timestamp;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "read_date")
    private Date readDate;
    @Column(columnDefinition="LONGBLOB")
    private byte[] fichier;
    
    @Transient
    private String fichier1;
    
    private String type;
    
    public Message() {
        super();
    }

    public Message(String channel, String sender, String content, Date timestamp) {
        super();
        this.channel = channel;
        this.sender = sender;
        this.content = content;
        this.timestamp = timestamp;
    }

    public void convert() {
    	 this.fichier= Base64.getDecoder().decode(new String(fichier1.substring(fichier1.indexOf(",") + 1)));
    }
}