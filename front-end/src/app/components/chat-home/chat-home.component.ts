import { Component, Input, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
@Component({
  selector: 'app-chat-home',
  templateUrl:'./chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {
  
  @Input()
   id_user:string 

  @Input()
  role:string;
  constructor( private stompService: RxStompService) { }

  ngOnInit(): void {
  }

  clearSession() {
    sessionStorage.removeItem('user');
    this.stompService.deactivate();
    this.id_user = null;
   
}
}
