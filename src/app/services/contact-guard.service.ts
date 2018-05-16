import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthenticateService} from "./authenticate.service";

@Injectable()
export class ContactGuardService implements CanActivate {
  constructor(private authService: AuthenticateService, private router:Router){

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let toRoute = route.url;
    if(!this.authService.getIsLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
