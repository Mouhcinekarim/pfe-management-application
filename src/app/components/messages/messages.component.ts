import { Component, OnInit ,Input} from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import{Message} from 'src/app/model/message'
import {ChannelService} from 'src/app/service/channel.service'
import {MessageService} from 'src/app/service/message.service'
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input()
  username:string|number
  @Input()
  role:string
  
  filteredMessages: Array<Message> = [];
  newMessage: string;
  channel: string;
  newFichier:string;

  newTyp:string
  constructor(private stompService: RxStompService,
    private messageService: MessageService,
    private channelService: ChannelService) { }
  ngOnInit(): void {
    this.channelService.getChannel().subscribe(channel => {
      this.channel = channel;
     
      this.messageService.Histoiremessage( this.channel).subscribe(resp=>{
        console.log("respo")
        console.log(resp)
        for(let i=0;i<resp.length;i++){
          
          this.messageService.pushMessage(resp[i])
           
        }
       
       console.log("fin")
      })
      
        this.filterMessages();
      
      console.log("init message "+this.channel)
    });
   
    this.messageService.getMessages().subscribe(messages => {
     console.log("MESSAGES")
      this.filterMessages();
     
    });
 
   
  }
  
  filterMessages() {

    this.filteredMessages = this.messageService.filterMessages(this.channel);
  console.log(this.filteredMessages)
    window.scrollTo(0, document.body.scrollHeight);
    this.scrollToBottom()
  }

  scrollToBottom() {
   
    const msgContainer = document.getElementById('msg-container');
   
    
   
  }
  sendMessage() {
    
    if (this.newMessage) {
      alert()
     console.log(JSON.stringify({
        'channel': this.channel,
        'sender': this.username,
        'content': this.newMessage,
        'fichier':this.newFichier,
        'type':this.newTyp,
      }))
      this.stompService.publish({
        
        destination: '/app/messages', body:
          JSON.stringify({
            'channel': this.channel,
            'sender': this.username,
            'content': this.newMessage,
            'fichier1':this.newFichier,
            'type':this.newTyp,
          })
      });
  this.filterMessages()
      this.newMessage = '';
      this.scrollToBottom();
    }
  }
  chargerapport(event:any){
    this.blobToBase64( event.target.files[0]).then(res=>{
     this.newFichier=(res as string);
     
   })
 
}

blobToBase64  = blob => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise<string|ArrayBuffer>(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

public base64ToBlob(b64Data, contentType='', sliceSize=512) {
   console.log(b64Data)
   
  b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
  let byteCharacters = atob(b64Data);
  let byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, {type: contentType});
}

Doawload(base64:any,titre:string,type:string){
  const blob=this.base64ToBlob(base64);
 
  // console.log("daw");
  // console.log(base64)

  const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = `${titre}.${type}`;
      a.click();
      URL.revokeObjectURL(objectUrl);
}

}