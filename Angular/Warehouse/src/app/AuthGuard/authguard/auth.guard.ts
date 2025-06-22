import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth.service';
import { map } from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop'

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  return toObservable(authService.currentUser).pipe(
    map(user =>{
      if(user){
        return true;
      }
      router.navigate(['auth'],{queryParams:{ returnUrl: state.url}});
      return false;
    }) //map closed
  );  //pipe closed

};
