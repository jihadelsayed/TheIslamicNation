import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  currentUsername="";
  authenticateHttpHeaders = new HttpHeaders({ 'Authorization': 'Token ' + localStorage.getItem('userToken') });


  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getProfile(currentUsername: string): Observable<any> {
    return this.http.get(environment.SERVER_URL + 'api/profile/' + currentUsername,{ headers: this.httpHeaders });
  }
  putProfile(data: any,username: string): Observable<any> {
    console.log(data)
    return this.http.put(environment.SERVER_URL + 'api/profile/'+username+"/", data, { headers: this.authenticateHttpHeaders });
  }
  patchProfile(data: any,username: string): Observable<any> {
    console.log(data)
    return this.http.patch(environment.SERVER_URL + 'api/profile/'+username+"/", data, { headers: this.authenticateHttpHeaders });
  }
}
