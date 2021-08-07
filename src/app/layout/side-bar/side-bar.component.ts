import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToLogin(){
    this.router.navigateByUrl("/login");
  }

  navigateToRegister(){
    this.router.navigateByUrl("/register");
  }

  navigateToUserManagement(){
    this.router.navigateByUrl("/admin/userManagament");
  }

}
