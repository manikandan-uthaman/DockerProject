import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  login(loginRequest){
    return this._httpClient.post("/to-do/api/auth/signin", loginRequest);
  }
}
