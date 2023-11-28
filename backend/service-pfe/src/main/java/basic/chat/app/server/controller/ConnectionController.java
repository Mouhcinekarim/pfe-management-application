//package  basic.chat.app.server.controller;
//
//import  basic.chat.app.server.exception.UsernameAlreadyUsedException;
//import  basic.chat.app.server.model.User;
//import  basic.chat.app.server.repository.UserRepository;
//import  basic.chat.app.server.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class ConnectionController {
//
//    @Autowired
//    private UserService userService;
//
//   
//
//    @Autowired
//    private SimpMessagingTemplate template;
//
//    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> login(@RequestBody User user) {
//
//        try {
//            User connectedUser = userService.connect(user);
//            template.convertAndSend("/channel/login", connectedUser);
//        } catch (UsernameAlreadyUsedException e) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
//        }
//
//        return ResponseEntity.ok().build();
//    }
//
//    @RequestMapping(value = "/logout", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void logout(@RequestBody User user) {
//        User disconnectedUser = userService.disconnect(user);
//        template.convertAndSend("/channel/logout", disconnectedUser);
//    }
//
//
//}