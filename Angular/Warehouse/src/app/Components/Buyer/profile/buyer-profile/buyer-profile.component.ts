import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { AuthService } from '../../../../Services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { User } from '../../../../Models/User/user.model';
import { Buyer } from '../../../../Models/Buyer/buyer.model';
import { map } from 'rxjs';


@Component({
  selector: 'app-buyer-profile',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './buyer-profile.component.html',
  styleUrl: './buyer-profile.component.css'
})
export class BuyerProfileComponent  {
private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
 
  // Form configuration
  profileForm: FormGroup;
  

  // Component state
  isLoading = false;
  isEdit = false;
  buyerId?: number;
  currentBuyer?: Buyer;
  user:User |null=null;
  
  constructor() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required, Validators.pattern(/^[\d\s\-+()]{10,15}$/)]],
      paymentMode: ['', Validators.required]
    });
  }

 /* ngOnInit(): void {
    this.loadBuyerProfile();
  }

  private loadBuyerProfile(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.toastr.error('User authentication required');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.isLoading = true;
    this.apiService.getBuyerByUserId(userId).pipe(
      map(buyer => {
        if (buyer) {
          return {
            ...buyer,
            // Ensure dates are properly formatted
           
          };
        }
        return null;
      })
    ).subscribe({
      next: (buyer) => {
        if (buyer) {
          this.currentBuyer = buyer;
          this.isEdit = true;
          this.buyerId = buyer.buyer_id;
          this.patchFormValues(buyer);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Failed to load profile');
        this.isLoading = false;
      }
    });
  }

  private patchFormValues(buyer: Buyer): void {
    this.profileForm.patchValue({
      name: buyer.name,
      address: buyer.address,
      phone: buyer.phone,
      paymentMode: buyer.paymentMode
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
     // this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = this.profileForm.value;

    if (this.isEdit && this.buyerId) {
      this.updateBuyerProfile(this.buyerId, formData!);
    } else {
      this.createBuyerProfile(formData,);
    }
  }

  private updateBuyerProfile(id: number, data: Buyer): void {
    this.apiService.updateBuyer(id, data).subscribe({
      next: (updatedBuyer) => {
        this.currentBuyer = updatedBuyer;
        this.toastr.success('Profile updated successfully');
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Failed to update profile');
        this.isLoading = false;
      }
    });
  }

  private createBuyerProfile(data: Partial<Buyer>): void {
    const userId = this.authService.currentUser();
    console.log('currentuser',userId);
    
    if (!userId || !userId.user_id) {
      this.toastr.error('User authentication required');
      this.isLoading = false;
      return;
    }
    //   const buyerData:Buyer={
    //   ...data,
    //   name:data.name || '',
    //   address:data.address || '',
    //   phone:data.phone || '',
    //   paymentMode:data.paymentMode || '',
    //   user:{
    //     user_id:userId?.user_id,
    //     username:userId?.username ,
    //     password:userId?.password ,
    //     email:userId?.email ,
    //     token:userId?.token ,
    //     roles:userId?.roles  
    //   }
    // }
    
      
    this.apiService.createBuyer({...data,user:userId} as Buyer).subscribe({
      next: (newBuyer) => {
        console.log('newBuyer:',newBuyer);
        this.currentBuyer = newBuyer;
        this.isEdit = true;
        this.buyerId = newBuyer.buyer_id;
        this.toastr.success('Profile created successfully');
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Failed to create profile');
        this.isLoading = false;
      }
    });
  }

  // private markAllAsTouched(): void {
  //   Object.values(this.profileForm.controls).forEach(control => {
  //     control.markAsTouched();
  //   });
  // }

  // Helper method for template
  formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }*/
  logout(){
        this.authService.logout();
       }
}






























































































  //   private fb=inject(FormBuilder);
  //   private apiService=inject(ApiService);
  //    authService=inject(AuthService);
  //   private toastr=inject(ToastrService);
  //   private router=inject(Router);
    
          
         
  //     profileForm=this.fb.group({
        
  //       name:['',[Validators.required,Validators.minLength(3)]],
  //       address:['',[Validators.required,Validators.minLength(10)]],
  //       phone:['',[Validators.required,Validators.pattern(/^[0-9]{10,15}$/)]],
  //       paymentMode:['CREDIT_CARD']
  //     });
      
  //     isLoading=false;
  //     isEdit=false;
  //     buyer_id?:number;

  //     ngOnInit(): void {
  //   const userId = this.authService.getUserId();
  //   console.log("from buyer profile:",userId)
  //   if (userId) {
  //     this.isEdit=true;
  //     this.isLoading=true;
  //     this.loadBuyerProfile(userId);
  //   }
  // }

  // loadBuyerProfile(userId: number): void {
  //   this.isLoading = true;
  //   console.log('inside load profile:',userId);
  //   this.apiService.getBuyerByUserId(userId).subscribe({
  //     next: (buyer) => {
  //       console.log('inside userid',buyer);
  //       if (buyer) {
  //         this.isEdit = true;
  //         this.buyer_id=buyer.buyer_id;
  //         this.profileForm.patchValue({
            
  //           name: buyer.name,
  //           address: buyer.address,
  //           phone: buyer.phone,
  //           paymentMode: buyer.paymentMode
  //         });
  //       }
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       this.toastr.error( 'Failed to load profile');
  //       this.isLoading = false;
  //     }
  //   });
  // }
     
      

  //     onSubmit(){
       
  //       this.isLoading=true;
  //       const formValue=this.profileForm.value;
          
  //       const userId=this.authService.getUserId();
  //       console.log("userID: ",userId);
  //            this.apiService.gerUserId(userId).subscribe({
  //              next: (USER)=>{
            
  //                 const buyerData ={
  //             user:USER,      
  //           name: formValue.name ?? '',
  //           address:formValue.address ?? '',
  //           phone: formValue.phone ?? '',
  //           paymentMode: formValue.paymentMode ?? ''
  //       };
  //       if(this.isEdit && this.buyer_id){
  //         this.apiService.updateBuyer(this.buyer_id,buyerData).subscribe({
  //           next: ()=>{
  //             this.toastr.success('Profile Updated Successfully');
  //             this.isLoading=false;
  //           },
  //           error: (err)=>{
  //             this.toastr.error( 'Failed to update profile');
  //             this.isLoading=false;
  //           }
  //         });
  //       }else{
  //         const userId=this.authService.getUserId();
  //         console.log("from buyer profile:"+userId);

  //         if(userId){
  //           this.apiService.createBuyer(buyerData!).subscribe({
  //             next:()=>{
  //               this.toastr.success('Profile created successfully');
  //               console.log('inside buyer profile');
  //               this.isLoading=false;
  //               this.isEdit=true;
  //             },
  //             error: (err)=>{
  //               this.toastr.error( 'Failed to Create Product');
  //               this.isLoading=false;
  //             }
  //           })
  //         }else{
  //           this.toastr.info('Already Profile is Created');
  //         }
  //       }
          
  //             }
  //           })

  //           if(this.profileForm.invalid){
  //         return;
  //       }              
  //     }


  //     

 // }

