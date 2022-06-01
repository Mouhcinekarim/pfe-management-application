import { Component, Input, OnInit,HostListener } from '@angular/core';
import{ User} from 'src/app/model/user'
import{ Message} from 'src/app/model/message'
import {UserService} from 'src/app/service/user.service'
import {ChannelService} from 'src/app/service/channel.service'
import {MessageService} from 'src/app/service/message.service'
import { RxStompService } from '@stomp/ng2-stompjs';
import {GroupPfe} from 'src/app/model/GroupPfe';
import {ServicePfeService} from 'src/app/service/service-pfe.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  @Input()
  username:string
  @Input()
  role:string 
  channel: string;
  receiver: string;
  users: Array<User> = [];
  highlightedUsers: Array<string> = [];
  newConnectedUsers: Array<string> = [];
  groupe:GroupPfe[];
  niveuxSet=new Set<string>();
  group:GroupPfe;
  desable:boolean;
  newDesc:string;
  constructor(private userService: UserService, private channelService: ChannelService,private fileService:ServicePfeService, private stompService: RxStompService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.userService.findUsers(this.role,this.username).subscribe(
      (res: User[]) => {
       console.log(res)
          this.users = res;
          this.groupe=res;
          console.log(this.groupe)

          this.groupe.forEach((pfe)=>{
            this.niveuxSet.add(pfe.niveau)
           
         })
          this.initUserEvents()
     
      }
  );
  this.channelService.getChannel().subscribe(channel => this.channel = channel);
  // alert("init list "+this.channel)
  
  }
  getListPfeByniveu(niveux:String){
    return this.groupe.filter((group)=> (group.niveau==niveux))

  }
  @HostListener('window:focus', [])
  sendReadReceipt() {
      if (this.channel != null && this.receiver != null) {
          this.messageService.sendReadReceipt(this.channel, this.receiver);
      }
  }

  startChatWithUser(user) {
   
     
    const channelId = ChannelService.createChannel(this.username, user.username);
    console.log("star list "+this.channel)

    if(channelId!=this.channel){
    this.channelService.refreshChannel(channelId);
    this.receiver = user.username;
    this.highlightedUsers = this.highlightedUsers.filter(u => u !== user.username);
    // this.receiverUpdated.emit(user.username);
  
    this.messageService.sendReadReceipt(channelId, user.username);
    console.log("after send read")
    }
}

getOtherUsers(): Array<User> {
  return this.users
}

getUserItemClass(user): string {
  let classes: string = 'user-item';
  if (user.username === this.receiver) {
      classes += ' current-chat-user ';
  }

  if (this.highlightedUsers.indexOf(user.username) >= 0) {
      classes += ' new-message';
  }

  if (this.newConnectedUsers.indexOf(user.username) >= 0) {
      classes += ' new-user';
  }

  if (!user.connected) {
      classes += ' disconnected-user';
  }

  return classes;
}

initUserEvents() {

  this.subscribeToOtherUsers(this.users, this.username);
}

subscribeToOtherUsers(users, username) {
  const filteredUsers: Array<any> = users.filter(user => username !== user.username);
  filteredUsers.forEach(user => {
    console.log("users "+user)
    this.subscribeToOtherUser(user)});
}

subscribeToOtherUser(otherUser): string {
  const channelId = ChannelService.createChannel(this.username, otherUser.username);
 
  this.stompService.watch(`/channel/chat/${channelId}`).subscribe(res => {
   
      const data: Message = JSON.parse(res.body);
      console.log( "dii")
    console.log(data)
      this.messageService.pushMessage(data);
      this.messageService.filterMessages(channelId)
      if (data.channel !== this.channel) {
          // this.showNotification(data);
      } else {
          // send read receipt for the channel
          this.messageService.sendReadReceipt(this.channel, otherUser.username);
      }
  });

  return channelId;
}

conferme_pfe(pfe_id:number,channel:string){
  this.userService.conferme(channel,pfe_id).subscribe(()=>{
    this.channel=null;
  });

}
desableinput(user:User){
  this.newDesc=user.description;
  this.desable=true;
}
// showNotification(message: Message) {
//   const snackBarRef = this.snackBar.open('New message from ' + message.sender, 'Show', { duration: 3000 });
//   this.highlightedUsers.push(message.sender);
//   snackBarRef.onAction().subscribe(() => {
//       this.receiver = message.sender;
//       // this.receiverUpdated.emit(message.sender);
//       this.channel = ChannelService.createChannel(this.username, message.sender);
//       this.channelService.refreshChannel(this.channel);
//   });
saveModifier(user:User){
  user.description=this.newDesc;
  this.fileService.UpdateDescription(user.pfeInfoId,this.newDesc).subscribe();
  this.desable=false;
  this.newDesc=null
}

annulModifier(){
  this.desable=false;
}
}

