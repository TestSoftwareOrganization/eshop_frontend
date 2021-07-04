import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public register(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.patch<User>(`${this.host}/user`, formData);
  }

  // TODO: UNSECURED WAY... NEED TO BE CHANGED
  public addUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] | null {
    let users = localStorage.getItem("users");
    if (users != null) {
      return JSON.parse(users);
    } else {
      return null;
    }
  }

  public createUserFormData(user: User): FormData {
    const formData = new FormData();

    formData.append('firstName', user.firstName);
    formData.append('firstName', user.lastName);
    formData.append('firstName', user.username);
    formData.append('firstName', user.password);
    formData.append('firstName', user.email);

    return formData;
  }
}
