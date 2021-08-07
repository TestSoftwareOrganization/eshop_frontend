import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateUserModel } from 'src/app/model/create-user-model';
import { UserModel } from 'src/app/model/user-model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() inputUser: UserModel;
  public form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    console.log("Profile COMPONENT");
    console.log(this.inputUser);
    
    
    if (this.inputUser !== null) {
      this.form = new FormGroup({
        firstName: new FormControl(this.inputUser.firstName),
        lastName: new FormControl(this.inputUser.lastName),
        username: new FormControl(this.inputUser.username),
        email: new FormControl(this.inputUser.email)
      });
    }
  }

  public onRegister(user: CreateUserModel) {
    console.log("Register user: ");
    console.log(user);
    // this.subscriptions.push(
    //   this.authenticationService.register(user).subscribe(
    //     (response: HttpResponse<CreateUserModel>) => {
    //       console.log("REGISTRATION WAS SUCCESSFUL!!");
    //       // TODO: SEND NOTIFICATION
    //       this.router.navigateByUrl('login')
    //     }
    //   )
    // );
  }



}
