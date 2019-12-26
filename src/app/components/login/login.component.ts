import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService,
      private _toasterService: ToastrService, private _router: Router) { 
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if(history.state){
      if(history.state.status == 'CREATED'){
        this._toasterService.success("Account created successfully");
      }else if(history.state.status == 'LOGOUT'){
        this._toasterService.success("Logget out successfully");
      }
    }
    localStorage.clear();
  }

  login(){
    this._authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      localStorage.setItem('token', res['accessToken']);
      this._router.navigate(['/home']);
    }, (err) => {
      this.loginForm.controls['password'].setValue('');
      this._toasterService.error("Invalid Username or Password!");
    })
  }
  
  routeToSignup(){
    this._router.navigate(['/signup']);
  }

}
