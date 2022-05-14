import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ChatService } from 'src/services/websocket/chat.service';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    SERVER_URL = environment.SERVER_URL_WITH_OUT_SLASH
    authenticateHttpHeaders = new HttpHeaders({ 'Authorization': 'Token ' + localStorage.getItem('userToken') });

    userInfo = JSON.parse(localStorage.getItem('UserInfo')!);
    unReedMessages:Observable<any> = JSON.parse(localStorage.getItem('unReedMessages')!)  || []
    messageBadge = 0
    notifications=15;
    constructor(private http: HttpClient,private router: Router,public dialog: MatDialog,private chatService: ChatService) {
      //connect to websocket
      if (localStorage.getItem('userToken') != null){
        this.chatService.connectToWebsocket()
        chatService.messages.subscribe(msg => {
          console.log("Response from websocket: " + JSON.stringify(msg));
          if(msg['notificationType'] == "Chat" ){
            if (localStorage.getItem("unReedMessages")){
              this.messageBadge = this.unReedMessages['length']
             // this.unReedMessages.push(JSON.stringify(msg))
            }
            else{
              localStorage.setItem('unReedMessages',JSON.stringify(msg))
            }
            console.log(this.unReedMessages)

           // console.log("hello")
          } else if(msg['notificationType'] == "annat" ){
            //console.log("annat")
          }
          // push data to CurrentMessages if the type is chat
          // push data to Currentnetification if the type is like or request
        });
      }

    }

    userExist: boolean | undefined;
    ngOnInit() {

      if (localStorage.getItem("userToken")){
        this.messageBadge = this.unReedMessages['length']

        return this.userExist = true;
      }
      else{
        return this.userExist = false;

      }

    }
    Logout() {
      localStorage.removeItem('userToken');
      this.router.navigate(['/login']);
      location.reload();

    }

    Subscription(){
      this.http.get(environment.SERVER_URL + 'api/customerPortal',{ headers: this.authenticateHttpHeaders })
      .subscribe((portalUrl) => {
       // console.log(portalUrl)
        window.location.href = portalUrl[0]

        //this.router.navigate(['/login']);

      });


    }
    public userToken(): any {
      return localStorage.getItem("userToken");
  }



  openDialogLoging() {
    const dialogRef = this.dialog.open(SignInComponent,
        {width: '600px'}

  );

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogSignUp() {
    const dialogRef = this.dialog.open(SignUpComponent
  );

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }



  }
