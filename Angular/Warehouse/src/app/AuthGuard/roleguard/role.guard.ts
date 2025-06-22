import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/AuthService/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, map, tap } from 'rxjs';

export const roleGuard: CanActivateFn = (route) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  const expectedRoles= route.data['roles'];
 
  return toObservable(authService.currentUser).pipe(
    map(user =>{
        // const users=user?.roles ;
        const users=Array.isArray(user?.roles) ? user.roles : [user?.roles];
        
      if(users && users.some(role =>   expectedRoles.includes(role))){
        console.log('ulla');
        return true;
      }
       console.log('Veliya');
      router.navigate(['auth']);
      return false;

     
    })//map closed
   
  );// pipe closed
  
};
