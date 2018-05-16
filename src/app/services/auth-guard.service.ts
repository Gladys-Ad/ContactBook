import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthenticateService} from "./authenticate.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthenticateService, private router:Router){

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(this.authService.getIsLoggedIn()){
      this.router.navigate(['/contacts']);
      return false;
    }
    return true;
  }

}
