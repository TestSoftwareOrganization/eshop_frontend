import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl;
  private token: string | undefined;
  private loggedInUsername: string | undefined;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {

  }

  public login(user: User): Observable<HttpResponse<User>> {
    console.log("BEFORE LOGINNN");
    
    console.log(user);
    
    return this.http.post<User>(`/api/users/login`, user, { observe: 'response' });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>
      (`${this.host}/users/register`, user);
  }

  public logout(): void {
    this.token = undefined;
    this.loggedInUsername = undefined;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User | null {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  public loadToken(): void {
    let currentToken = localStorage.getItem('token');
    if (currentToken != null) {
      this.token = currentToken;
    }
  }

  public getToken(): string | undefined {
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != undefined && this.token !== '') {
      // check if username is not null or empty
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logout();
    }
    return false;
  }
}
