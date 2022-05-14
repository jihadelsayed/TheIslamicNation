import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  User: any;
  constructor(private http: HttpClient) { }

  registerUser(user : User){
    const body: User = {
      username: user.username,
      first_name: user.first_name,
      email: user.email,
      password1: user.password1,
      password2: user.password2,
    }
    return this.http.post(environment.SERVER_URL + 'auth/register/', body);
  }

  userAuthentication(email: any, password: any) {
    const body = {
      username: " ",
      email: email,
      password: password,
    }
    return this.http.post(environment.SERVER_URL + 'auth/login/', body);

  }
  //getUserClaims(){
    //return this.http.get(environment.SERVER_URL+'auth/login/',{ headers: new HttpHeaders({'Authorization': 'Token ' + localStorage.getItem('userToken')})});
  // }
}
