import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/AuthService/auth.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr=inject(ToastrService);
  const router=inject(Router);
  const authService=inject(AuthService);
  
  return next(req).pipe(
    catchError( (err)=> {
      if(err.status === 401){
        authService.logout();
        router.navigate(['auth']);
        toastr.error('Session expired. Please Login again!!');
      }
      else if(err.error?.message){
        toastr.error(err.error.message);
      }   
      else{
        toastr.error('An unexpected error occurred');
      }

      return throwError( ()=> err);
     }) //catchError closed
  );// pipe closed
  
};
