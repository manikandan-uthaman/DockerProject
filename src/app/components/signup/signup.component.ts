import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;
  constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService,
                private _toasterService: ToastrService) { }

  ngOnInit() {
    localStorage.clear();
    this.signupForm = this._fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  signup(){
    console.log(this.signupForm.value);
    this._authService.signup(this.signupForm.value).subscribe((res) => {
      this._router.navigate(['/login'], {
        state: {
          status: 'CREATED'
        }
      });
    }, (err) => {
      this._toasterService.error("Error while creating an account.");
      this.signupForm.controls['password'].setValue('');
    });
  }
  
  returnToLogin(){
    this._router.navigate(['/login']);
  }

}
