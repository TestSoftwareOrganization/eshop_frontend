import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserModel } from '../model/create-user-model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<CreateUserModel[] | HttpErrorResponse> {
    return this.http.get<CreateUserModel[]>(`${this.host}/users/list`);
  }

  public updateUser(formData: FormData): Observable<CreateUserModel> {
    return this.http.patch<CreateUserModel>(`${this.host}/user`, formData);
  }

  // TODO: UNSECURED WAY... NEED TO BE CHANGED
  public addUsersToLocalStorage(users: CreateUserModel[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): CreateUserModel[] | null {
    let users = localStorage.getItem("users");
    if (users != null) {
      return JSON.parse(users);
    } else {
      return null;
    }
  }

  public createUserFormData(user: CreateUserModel): FormData {
    const formData = new FormData();

    formData.append('firstName', user.firstName);
    formData.append('firstName', user.lastName);
    formData.append('firstName', user.username);
    formData.append('firstName', user.password);
    formData.append('firstName', user.email);

    return formData;
  }

  
}
