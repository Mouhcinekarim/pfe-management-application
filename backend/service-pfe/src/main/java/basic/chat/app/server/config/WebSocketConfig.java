//package basic.chat.app.server.config;
//
//import java.util.logging.LogManager;
//
//import javax.servlet.ServletContext;
//import javax.websocket.server.ServerContainer;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.messaging.simp.config.MessageBrokerRegistry;
//import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
//import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
//import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
//import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;
//import javax.servlet.*;
//import javax.servlet.http.*;
//import ch.qos.logback.classic.Logger;
////
//@Configuration
//@EnableWebSocketMessageBroker
//public class WebSocketConfig extends HttpServlet implements WebSocketMessageBrokerConfigurer   {
//	private boolean ignoreNullWsContainer;
//	 private ServletContext servletContext;
//	  
//
//	@Override
//	public void configureMessageBroker(MessageBrokerRegistry config) {
//		
//		config.enableSimpleBroker("/channel");
//		config.setApplicationDestinationPrefixes("/app");
//	}
//
//	@Override
//	public void registerStompEndpoints(StompEndpointRegistry registry) {
//		System.out.println("config2");
//		registry.addEndpoint("/ichat").setAllowedOrigins("*");
//	}
//	
//
//    @Override
//    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
//        registration.setMessageSizeLimit(2048 * 2048);
//        registration.setSendBufferSizeLimit(2048 * 2048);
//        registration.setSendTimeLimit(2048 * 2048);
//    }
//
//    @Bean
//    public ServletServerContainerFactoryBean createServletServerContainerFactoryBean() {
//        ServletServerContainerFactoryBean factoryBean = new ServletServerContainerFactoryBean();
//        this.servletContext= getServletContext();
//        ServerContainer serverContainer = (ServerContainer) this.servletContext.getAttribute("javax.websocket.server.ServerContainer");
//        
//        if (serverContainer == null) {
//         
//            return null;
//        }
//        
//        factoryBean.setMaxTextMessageBufferSize(2048 * 2048);
//        factoryBean.setMaxBinaryMessageBufferSize(2048 * 2048);
//        factoryBean.setMaxSessionIdleTimeout(2048L * 2048L);
//        factoryBean.setAsyncSendTimeout(2048L * 2048L);
//        return factoryBean;
//    }
//    
//    @Value("${project.ignore-null-websocket-container:false}")
//    private void setIgnoreNullWsContainer(String flag) {
//        this.ignoreNullWsContainer = Boolean.parseBoolean(flag);
//    }
//}
