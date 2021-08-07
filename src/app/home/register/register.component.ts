import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CreateUserModel } from 'src/app/model/create-user-model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService) { }


  ngOnInit(): void {
  }

  public onRegister(user: CreateUserModel) {
    console.log("Register user: ");
    console.log(user);
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: HttpResponse<CreateUserModel>) => {
          console.log("REGISTRATION WAS SUCCESSFUL!!");
          // TODO: SEND NOTIFICATION
          this.router.navigateByUrl('login')
        }
      )
    );
  }


  public form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
