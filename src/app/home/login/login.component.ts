import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { CreateUserModel } from 'src/app/model/create-user-model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  public onLogin(user: CreateUserModel) {
    console.log("Login with user: ");
    console.log(user);
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<CreateUserModel>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          console.log("LOGIN SUCCESSFUL!!");
          // TODO: SEND NOTIFICATION
          this.router.navigateByUrl('home')
        },
        (httpErrorResponse: HttpErrorResponse) => {
          // TODO: SEND NOTIFICATION
          console.log("Error appeared...");
          console.log(httpErrorResponse.message);
          console.log("------------------");
        }
      )
    );
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('home');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });



  // submit() {
  //   if (this.form.valid) {

  //   }
  // }

}
