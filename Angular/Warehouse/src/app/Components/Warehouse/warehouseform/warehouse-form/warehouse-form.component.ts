import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Warehouse } from '../../../../Models/Warehouse/warehouse.model';
import { AuthService } from '../../../../Services/AuthService/auth.service';


@Component({
  selector: 'app-warehouse-form',
  imports: [CommonModule,ReactiveFormsModule,SpinnerComponent,RouterLink],
  templateUrl: './warehouse-form.component.html',
  styleUrl: './warehouse-form.component.css'
})
export class WarehouseFormComponent implements OnInit {
  fb=inject(FormBuilder);
  apiService=inject(ApiService);
  authService=inject(AuthService);
  warehouseForm=this.fb.group({
    product_id:[0,Validators.required],
    quantity:[0,Validators.required],
    location:['',Validators.required],
    
  });

  isEdit=false;
  Id?:number;
  products$=this.apiService.getProducts();
  isLoading=false;

  constructor(private route:ActivatedRoute, private router:Router,private toastr:ToastrService){}

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params['id']){
        this.isEdit=true;
        this.Id= +params['id'];
        this.loadWarehouseItem(this.Id);
      }
    });
  }

  loadWarehouseItem(id:number):void{
    this.isLoading=true;
    this.apiService.getWarehouseItemsId(id).subscribe({
      next: (item) =>{
          
          this.warehouseForm.patchValue({
            product_id:item.product?.product_id,
            quantity:item.product?.product_stocks,
            location:item.location
            
          });
          
          this.isLoading=false;
      },
      error: (err)=>{
        this.toastr.error(err.error?.message || 'Failed to load item');
        this.isLoading=false;
      }
    });
  }

  onSubmit():void{
      this.isLoading=true;
      const items=this.warehouseForm.value;

      this.apiService.getProductId(items.product_id!).subscribe({
        next: (fullProduct)=>{
          const itemData:Warehouse={
         product:fullProduct,
        quantity: items.quantity ?? 0 ,
        location: items.location ?? ''
        
      };
      if(this.isEdit && this.Id){
        this.apiService.updateWarehouse(this.Id,itemData).subscribe({
          next: ()=>{
            this.toastr.success('Item Updated Successfully');
            this.router.navigate(['warehouse/items'])
          },
          error: (err)=>{
            this.toastr.error(err.error?.message || 'Update Failed');
            this.isLoading=false;
          }
        });
      }
      else{
        this.apiService.createWarehouse(itemData).subscribe({
          next:()=>{
            this.toastr.success('Item Created Successfully');
            this.router.navigate(['warehouse/items'])
          },
          error: (err)=>{
            this.toastr.error(err.error?.message || 'Failed to create item');
            this.isLoading=false;
          }
        });
      }
        }
      })

     
    if(this.warehouseForm.invalid){
      console.log('Invalid Data');
      return;

    }
  }
  logout(){
    this.authService.logout();
  }

}
