import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetails: Object = null;
  userObservable = new BehaviorSubject(this.userDetails);  
  constructor(private _httpClient: HttpClient) { }

  getUser(){
    if(this.userDetails != null){
      this.userObservable.next(this.userObservable);
    }
    const token = localStorage.getItem('token');
    if(token != null){
      this._httpClient.get("/to-do/user/me").subscribe((res) => {
        this.userDetails = res;
        this.userObservable.next(this.userDetails);
      })
    }
  }

  clearUser(){
    this.userObservable.next(null);
  }
}
