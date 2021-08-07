import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authenticationService: AuthenticationService;

  private loginUrl: string = "/api/users/login";
  private registerUrl: string = "/api/users";

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    // 
    if (httpRequest.url.includes(this.loginUrl)) {
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes(this.registerUrl)) {
      return httpHandler.handle(httpRequest);
    }

    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    //Request is mutable, so we should make a clone of request.
    const request = httpRequest.clone({setHeaders: { Authorization: `Bearer ${token}`}});

    return httpHandler.handle(request);
  }
}
