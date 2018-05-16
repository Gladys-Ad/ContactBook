import {Component, OnChanges, OnInit} from "@angular/core";
import {ContactService} from "./services/contact.service";
import {AuthenticateService} from "./services/authenticate.service";
import { Router } from "@angular/router";

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  pageTitle = 'My Contacts';

  constructor(private authenticateService: AuthenticateService, private router:Router){
  }

  logoutUser():void{
    this.authenticateService.logout();
    this.router.navigate(['/login']);
  }

}


