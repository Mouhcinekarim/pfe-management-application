import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages = new FormGroup({
    // TODO : just disactiver la boutton envoyer si un input n'est pas correct
  });

  constructor() { }

  ngOnInit(): void {
  }

}
