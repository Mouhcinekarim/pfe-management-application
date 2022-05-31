import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../model/message';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class MessageService {
    private service:string='http://localhost:8084'
    private messages: Array<Message> = [];
    private msgs = new Subject<Array<Message>>();

    constructor(private http: HttpClient) { }

    pushMessage(message: Message) {
        this.messages.push(message);
        this.msgs.next(this.messages);
    
    }

    filterMessages(channel: string): Array<Message> {
      
        return this.messages.filter(message => channel === message.channel)
            .sort((m1, m2) => {
                if (m1.timestamp > m2.timestamp) {
                    return 1;
                }

                return -1;
            });
    }
     
    Histoiremessage(channel: string){

       return this.http.get<Message[]>(this.service + '/messages/'+channel);
    }

    sendReadReceipt(channelId: string, username: string) {
       
        this.Histoiremessage(channelId).subscribe((messages)=>{
            console.log("historique")
            this.messages=messages;
             this.msgs.next(messages)
        })
    }

    getMessages(): Observable<any> {
        return this.msgs.asObservable();
    }

}
