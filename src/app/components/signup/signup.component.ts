import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;
  constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService,
                private _toasterService: ToastrService, private _userService: UserService) { }

  ngOnInit() {
    localStorage.clear();
    this._userService.clearUser();
    this.signupForm = this._fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  signup() {
    this._authService.signup(this.signupForm.value).subscribe((res) => {
      this._router.navigate(['/login'], {
        state: {
          status: 'CREATED'
        }
      });
    }, (err) => {
      this.signupForm.controls['password'].setValue('');
      if(err && err.error && err.error.message){
        if(err.error.message === 'USERNAME_UNAVAILABLE'){
          this._toasterService.error("Username is already taken!");
          return;
        }else if(err.error.message === 'EMAIL_UNAVAILABLE'){
          this._toasterService.error("An account with this email already exists!");
          return;
        }
      }
      this._toasterService.error("Error while creating an account.");
    });
  }
  
  returnToLogin(){
    this._router.navigate(['/login']);
  }

}
