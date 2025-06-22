import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../../Services/AuthService/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgIf } from '@angular/common';
import { SpinnerComponent } from '../../Others/spinner/spinner.component';

@Component({
  selector: 'app-auth',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,RouterLink,SpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent  implements OnInit{
       loginForm!:FormGroup ;
      authService=inject(AuthService);


 constructor(private fb :FormBuilder,
              private router:Router,private toastr:ToastrService){

 }
 
 ngOnInit(): void {
   this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
     });
 }
 // Onsubmit Login Form

  onSubmit():void{
      
    const {username, password}=this.loginForm.value;

    this.authService.login(username!,password!).subscribe({
      next: () =>{
        const userRole = this.authService.getUserRole();
        console.log("Roles:"+userRole);
        console.log(userRole);
        switch(userRole){
          case 'ROLE_ADMIN':
                console.log('Admin login....');
                  this.router.navigate(['admin/products']);
                  console.log('Admin after naviage....');
                   break;
           case 'ROLE_WAREHOUSE':
              this.router.navigate(['warehouse/items']);
              break;
            case 'ROLE_TRANSPORTATION':
              this.router.navigate(['transport/shipments']);
              break;
            case 'ROLE_BUYER':
              this.router.navigate(['/buyer/products']);
              break;
             default:
              this.router.navigate(['auth/login']);
              break; 
        }
      },
      error:(err) =>{
        this.toastr.error(err,'Login Failed');
      }
        
     }); 
      //subscribe closed
     
    this.loginForm.reset();
    
  }

 logout(){
    this.authService.logout();
  }
 


}
