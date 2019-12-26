import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let newHeaders = req.headers;
    if(token){
      newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
    }
    const newReq = req.clone({headers: newHeaders});
    return next.handle(newReq);
  }
}
