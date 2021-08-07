import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CreateUserModel } from 'src/app/model/create-user-model';
import { UserModel } from 'src/app/model/user-model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'simple-user',
  templateUrl: './simple-user.component.html',
  styleUrls: ['./simple-user.component.css']
})

export class SimpleUserComponent implements OnInit, OnChanges {

  public user: UserModel = new UserModel();
  private subscriptions: Subscription[] = [];

  @Input() inputUser: UserModel;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("SOME CHANGEEEEEEEEEEEEES");
    console.log(changes);
  }

  ngOnInit(): void {
  }

}
