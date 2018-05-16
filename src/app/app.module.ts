import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ContactGuardService} from "./services/contact-guard.service";

import { AppComponent } from './app.component';
import {LoginComponent} from './authentication/login.component';
import {SignupComponent} from './authentication/signup.component';
import {ContactsComponent} from "./contacts/contacts.component";
import {AuthenticateService} from "./services/authenticate.service";
import {AuthorizeService} from "./services/authorization.service";
import {ContactService} from "./services/contact.service";
import {AuthGuardService} from "./services/auth-guard.service";

@NgModule({
  //which component belongs to this module
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ContactsComponent
  ],

  //external module available to all components
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'login',canActivate:[AuthGuardService],component:LoginComponent},
      {path:'signup',canActivate:[AuthGuardService],component:SignupComponent},
      {path:'contacts',canActivate: [ContactGuardService],component:ContactsComponent},
      {path:'', redirectTo:'login',pathMatch:'full'}//,
      //{path:'**', component:PageNotFoundComponent}
    ])
  ],

  //services
  providers: [ContactGuardService,AuthGuardService,AuthenticateService,AuthorizeService,ContactService],

  //startup component
  bootstrap: [AppComponent]
})
export class AppModule { }
