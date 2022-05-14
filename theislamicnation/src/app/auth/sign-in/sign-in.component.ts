import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/services/auth/user.service';
import { UserInfo } from 'src/services/auth/user.model';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Du måste skriv e-post';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  isLoginError: boolean = false;
  constructor(//private subcategorieService:SubCategoriService,private categoreService:CategoriService,
    private userService: UserService, private router: Router ,private _snackBar: MatSnackBar) { }

  ngOnInit() {}

  OnSubmit(email, password) {
    this.userService.userAuthentication(email, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.token);
      const body: UserInfo = {
        email: data.user.email,
        first_name: data.user.first_name,
        phone: data.user.phone,
        rating: data.user.rating,
        followers: data.user.followers,
        profession: data.user.profession,
        location: data.user.location,
        member_since: data.user.member_since,
        picture: data.user.picture,
        city: data.user.city,
        state: data.user.state,
        country: data.user.country,
        date_of_birth: data.user.date_of_birth,
        about: data.user.about,
        Facebook_link: data.user.Facebook_link,
        Linkdin_link: data.user.Linkdin_link,
        username: data.user.username,
        site_id: data.user.site_id,
        profile_completed: data.user.profile_completed,
      }
      localStorage.setItem('UserInfo', JSON.stringify(data.user));
      if (data.user.profile_completed == false) {
        this.router.navigate(['complete']).then(() => {
          location.reload();
        });
      }
      else {
        this.router.navigate(['/Profile/'+data.user.site_id]).then(() => {
          location.reload();
        });
      }
    }
    ,error => {
      this.isLoginError = true;

      let msg:any = "unknown error"
      if(error.status===400){
        if(error.error['email']){
          msg = error.error['email']
        }
        if(error.error['password']){
          msg = error.error['password']
        }
        if(error.error['non_field_errors']){
          msg = error.error['non_field_errors']
        }
    }else{
      msg = error.message
    }
    this._snackBar.open(
      msg
    , "Ok",
    {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: 'warning',
    });
  }

  );
  }
}
