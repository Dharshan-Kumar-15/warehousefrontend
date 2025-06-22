import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../Services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';

@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule,RouterLink,SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

    registerForm!:FormGroup;
    authService=inject(AuthService);
    constructor(private fb:FormBuilder, private router:Router,
               private toastr:ToastrService){}
     
          /// Loading....
              ngOnInit(): void {
        this.registerForm=this.fb.group({
          username:['',[Validators.required,Validators.minLength(3)]],
          email:['',[Validators.required,Validators.email]],
          password:['',[Validators.required,Validators.minLength(5)]],
          role:['BUYER']
        });
      }
      // Onsubmit Register Form
      onSubmit():void{
          
          const {username,email,password,role}=this.registerForm.value;
          const roles=[role!];
          this.authService.register(username!,email!,password!,roles!).subscribe({
            next:()=>{
              this.toastr.success("Registration Successful! Please Login.");
              this.registerForm.reset();
              this.router.navigate(['/auth/login']);
            },
            error: (err)=>{
              this.toastr.error(err.error?.message || 'Registration Failed');
            }
          });
          if(this.registerForm.invalid){
            return;
          }
      }
      logout(){
    this.authService.logout();
  }

}
