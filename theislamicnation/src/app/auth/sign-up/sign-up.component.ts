import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/services/auth/user.service';
import { User } from 'src/services/auth/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  serviceForm = new FormGroup({
    boleanControl : new FormControl('', Validators.required),
    //nameControl : new FormControl('', Validators.required),
    //emailControl : new FormControl('', Validators.required),
    //passwordControl : new FormControl('', Validators.required),

  });

  user : User;
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'E-post är obligatioriskt';
      }

      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
  constructor(private userService: UserService,private toaster : ToastrService,private router : Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form? : NgForm)
   {
     if(form!=null)
      form.reset();
      this.user = {
        first_name:"",
        username: "",
        email: "",
        password1: "",
        password2: "",

     }
   }

   OnSubmit(form : NgForm){
      this.userService.registerUser(form.value).subscribe((data:any) =>{
        if (data.Succeeded = true)
        {
          this._snackBar.open(
            "User registeration successful"
          , "Ok",
          {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'warning',
          });

          console.log(data)
          this.resetForm(form);
          this.toaster.success('User registeration successful')

          localStorage.setItem('UserInfo', JSON.stringify(data.user));
          localStorage.setItem('userToken',data.token);
          this.router.navigate(['complete']).then(() => {
            location.reload();
            //window.location.reload();
          });

          this.router.navigate(['/complete']);
        }
        else
        {
          this._snackBar.open(
            data.error[0]
          , "Ok",
          {

            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'warning',
          });
          this.toaster.error()
        }
        },error => {
          let msg:any = "unknown error"
          if(error.status===400){
            if(error.error['email']){
              msg = error.error['email']
            }
            if(error.error['first_name']){
              msg = error.error['first_name']
            }
            if(error.error['password1']){
              msg = error.error['password1']
            }
            if(error.error['password2']){
              msg = error.error['password2']
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
