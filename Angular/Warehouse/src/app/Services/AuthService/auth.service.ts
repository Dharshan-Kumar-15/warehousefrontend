import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { User } from '../../Models/User/user.model';
import { HttpClient } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { DecodedToken } from '../../Models/decoded-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject= signal<User | null>(null);
  currentUser= this.currentUserSubject.asReadonly();
  isLoading= signal(false);
  apiUrl:string='http://localhost:8080/auth'


  constructor(private http:HttpClient, private router:Router,
              @Inject(PLATFORM_ID) private platformId: Object) {

    this.initalizeUser();
   }

   //LocalStorage
   initalizeUser(): void{
    if(this.isBrowser()){
      const user=localStorage.getItem('currentUser');
      
    if(user){
     
      try{
          this.currentUserSubject.set(JSON.parse(user));
       }
       catch(e){
        console.error('Failed to parse user from localStorage',e);
        this.clearStorage();
       }
    }
    }
   }
   //Localstorage
   isBrowser(): boolean{
    return isPlatformBrowser(this.platformId);
   }
   //clear Storage
   clearStorage(): void{
    if(this.isBrowser()){
        localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.set(null);  
   }
   //Login
   login(username:string,password:string):Observable<User>{
    this.isLoading.set(true);

    return this.http.post<User>(this.apiUrl+'/signin',{username,password}).pipe(
      tap({
        next:(response) =>{
          console.log('Login response:', response);
              const token1=response.token;
          const decoded1:DecodedToken=jwtDecode(token1!);

          console.log('from auth service:'+ decoded1);
          const userId1=decoded1.roles;
          console.log("from auth: "+userId1);
          
          if(this.isBrowser()){
          localStorage.setItem('currentUser',JSON.stringify(response));
          }
          
          this.currentUserSubject.set(response);
          this.isLoading.set(false);
        },
        error:()=> this.isLoading.set(false)
      }) //tap closing
    );//pipe closing
   }

   //Register
   register(username:string,email:string,password:string,roles:string[]):Observable<User>{
    this.isLoading.set(true);
    return this.http.post<User>(this.apiUrl+"/signup",{username,email,password,roles}).pipe(
      tap({
        next:() => this.isLoading.set(false),
       error: () => this.isLoading.set(false)
      }) //tap
    ); //pipe
   }
   getUserId():number{
    const token=this.currentUser()?.token;
          const decoded:DecodedToken=jwtDecode(token!);
          const userId=decoded.user_id;
          
            return userId;
   }
   //logout
   logout(){
    this.clearStorage();
    this.router.navigate(['auth']);
   }
   //Get Token
   getToken():string | null{
    return this.currentUser()?.token || null;
   }
   
   getUserRole(): string |null {
    // console.log('roles'+this.currentUser()?.roles);
    // return this.currentUser()?.roles ||null;
    const user = this.currentUser();
   
    if (!user || !user.roles) return null;
    
    // Handle different role formats and return the first role
    if (Array.isArray(user.roles) && user.roles.length > 0) {
      
      return user.roles[0]; // Return first role from array
    }
    else if (typeof user.roles === 'string') {
      // If it's a comma-separated string, return the first one
      const roles = user.roles.split(',').map(r => r.trim());
     
      return roles.length > 0 ? roles[0] : null;
    }
    // if (user.token) {
    //   try {
    //     const payload = JSON.parse(atob(user.token.split('.')[1]));
    //     console.log('Token payload:', payload);
        
    //     if (payload.roles) {
    //       return this.extractFirstRole(payload.roles);
    //     }
    //     if (payload.authorities) {
    //       return this.extractFirstRole(payload.authorities);
    //     }
    //     if (payload.scope) {
    //       return this.extractFirstRole(payload.scope);
    //     }
    //   } catch (e) {
    //     console.error('Error parsing JWT token:', e);
    //   }
    // }
    
    return null;
   }
  //  private extractFirstRole(roles: any): string | null {
  //   if (Array.isArray(roles)) {
  //     return roles.length > 0 ? roles[0] : null;
  //   }
  //   if (typeof roles === 'string') {
  //     const roleArray = roles.split(',').map(r => r.trim());
  //     return roleArray.length > 0 ? roleArray[0] : null;
  //   }
  //   if (roles && typeof roles === 'object') {
  //     return roles.name || roles.authority || null;
  //   }
  //   return null;
  // }

   hasRole(role:string):boolean{
    return this.getUserRole()?.includes(role) ||false;
   }
}
