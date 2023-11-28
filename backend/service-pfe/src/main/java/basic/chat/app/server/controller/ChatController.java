package  basic.chat.app.server.controller;

import  basic.chat.app.server.model.Message;
import  basic.chat.app.server.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;

@Controller
public class ChatController {

//    @Autowired
//    private SimpMessagingTemplate template;

    @Autowired
    private MessageRepository messageRepository;

    /**
     * Sends a message to its destination channel
     *
     * @param message
     */
    @MessageMapping(value="/messages")
    public void handleMessage(@Payload Message message) {
        message.setTimestamp(new Date());
    if(message.getFichier1()!=null)    message.convert();
       
        System.out.println("this");
       messageRepository.save(message);
      
        System.out.println(message.getChannel());
        
//        template.convertAndSend("/channel/chat/"+ message.getChannel(), message);
    }
}
