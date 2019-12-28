import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userDetails;
  showPopup = false;
  constructor(private _router: Router, private _userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this._userService.userObservable.subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  hideLogout(){
    return (this._router.url == '/login' || this._router.url == '/signup');
  }
  
  logout(content){
    this.modalService.open(content, {backdrop: 'static', keyboard: true}).result.then((result) => {
      if(result === 'logout') {
        this._router.navigate(['/login'], {
          state: { status: 'LOGOUT' }
        });
      }
    }).catch((err) => {
      
    });
  }
}
