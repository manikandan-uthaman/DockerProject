import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  hideLogout(){
    return (this._router.url == '/login' || this._router.url == '/signup');
  }
  
  logout(){
    this._router.navigate(['/login'], {
      state: {
        status: 'LOGOUT'
      }
    })
  }
}
