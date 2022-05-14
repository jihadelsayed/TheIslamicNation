import { Injectable, ɵɵsetComponentScope } from "@angular/core";
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor() {}

  private subject: Subject<MessageEvent> | undefined;

  public connect(url: string | URL): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
     // console.log("Successfully connected: " + url);
      console.log("Successfully connected");
    }

    return this.subject;
  }


  private create(url: string | URL): Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      ws.onerror = e => {
        localStorage.removeItem('userToken');
      //this.router.navigate(['/login']);
        location.reload();
      };
      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {

        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
