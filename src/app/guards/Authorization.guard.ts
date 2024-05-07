import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthorizationGuard {
  constructor(
    private authService:AuthenticationService,
    private router:Router
          ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let authorize = false;
    let roles = this.authService.roles as string[]
    for (let role of roles) {
      if(role in route.data['roles']){
       authorize = true;
       break;
      }
    }
    return authorize;

  }

}

