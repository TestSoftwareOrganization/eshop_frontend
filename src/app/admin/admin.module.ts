import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userManagementComponent } from './user-management/user-management.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from '../profile/profile/profile.component';



@NgModule({
  declarations: [
    userManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileComponent
  ]
})
export class AdminModule { }
