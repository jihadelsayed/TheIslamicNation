import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebsocketService } from "./websocket.service";
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

export interface SocketInterface {
  notificationType:string,
  friendUsername: string,
  message: string,
}
export interface orderNotificationInterface {
  notificationType:string,
  friendUsername: string,
  message: string,
  price: string,
  enhet: string,
  date: string,

}
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<SocketInterface> | undefined;
  public order: Subject<orderNotificationInterface> | undefined;
  userToken: string | null;
  constructor(private wsService: WebsocketService, private http: HttpClient, private router: ActivatedRoute) {

  }

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  connectToWebsocket(){
    this.userToken = localStorage.getItem('userToken')
    //console.log("my token is "+this.userToken)
    this.messages = <Subject<orderNotificationInterface>>this.wsService.connect(environment.CHAT_URL+this.userToken+"/").pipe(map(
      (response: MessageEvent): orderNotificationInterface => {
        let data = JSON.parse(response.data);
       // console.log(data+"jihad")
        return data;
      }
      ));
  }

  getAllThread(currentToken: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'token '+currentToken });

    return this.http.get(environment.SERVER_URL + 'api/chat/thread/',{ headers: this.httpHeaders });
  }
  getAllmessages(currentUsername: string,currentToken: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'token '+currentToken });
    return this.http.get(environment.SERVER_URL + 'api/chat/messages/'+ currentUsername,{ headers: this.httpHeaders });

  }

}
