import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AdminUserService extends UserService {
    asd: string = super.host + "asd";
}
