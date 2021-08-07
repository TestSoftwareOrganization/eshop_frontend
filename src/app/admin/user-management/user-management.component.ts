import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CreateUserModel } from 'src/app/model/create-user-model';
import { UserService } from 'src/app/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from 'src/app/home/login/login.component';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class userManagementComponent implements OnInit, OnDestroy {
  private titleSubject = new BehaviorSubject<string>("Users");
  public titleAction$ = this.titleSubject.asObservable();
  public users: CreateUserModel[];
  private subscriptions: Subscription[] = [];
  //Default value is false
  public refreshing: boolean;
  public displayedColumns: string[] = ['username','firstName','lastName','email'];
  constructor(private userService: UserService,public dialog: MatDialog ) { }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public getUsers() {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: CreateUserModel[]) => {
          this.users = response;
          this.refreshing = false;
          console.log("Users are loaded successfully");
          console.log(this.users);
        },
        (errorResponse: HttpErrorResponse) => {

        }
      )

    )
  }


  openDialog() {
    // const dialogRef = this.dialog

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  // }
}

  ngOnInit(): void {
    this.getUsers();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
