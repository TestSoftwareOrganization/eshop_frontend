import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomeModule } from './home/home.module';
import { userManagementComponent } from './admin/user-management/user-management.component';

@NgModule({
  declarations: [
    AppComponent,
    userManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HomeModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [AuthenticationGuard,AuthenticationService, UserService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
