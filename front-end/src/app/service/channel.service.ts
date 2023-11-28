import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channel = new Subject<string>();

  public static createChannel(user1: string|number, user2: string): string {
    let combined: string = 'http://localhost:8084';

    if (user1 < user2) {
      combined = user1 + user2;
    } else {
      combined = user2 + user1;
    }

    return Md5.hashStr(combined).toString();
  }

  refreshChannel(channel: string) {
    this.channel.next(channel);
  }

  

  getChannel(): Observable<any> {
    return this.channel.asObservable();
  }
}
