import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Transport } from '../../../../Models/Transport/transport.model';
import { AuthService } from '../../../../Services/AuthService/auth.service';

@Component({
  selector: 'app-transport-form',
  imports: [CommonModule,ReactiveFormsModule,SpinnerComponent,RouterLink ],
  templateUrl: './transport-form.component.html',
  styleUrl: './transport-form.component.css'
})
export class TransportFormComponent implements OnInit{
    fb=inject(FormBuilder);
    apiService=inject(ApiService);
    authService=inject(AuthService);
    transportForm=this.fb.group({
        order_id:[0,Validators.required],
        status:['',Validators.required],
      method:['',Validators.required],
      estimatedDelivery:[''],
      
      
    });
    isEdit=false;
    transId?:number;
    isLoading=false;
    transportMethods=['ROAD','AIR','SEA'];
    transportStatus=['PREPARING','IN_TRANSIT','DELIVERED','CANCELLED','dharshan'];
    orders$=this.apiService.getOrders();
    
    
    constructor(private route:ActivatedRoute,private router:Router,private toastr:ToastrService){}
    ngOnInit(): void {
      this.route.params.subscribe(params =>{
        if(params['id']){
          this.isEdit=true;
          this.transId= +params['id'];
          console.log('transid',this.transId);
          this.loadShipments(this.transId);
        }else{
          console.log('error');
        }
      })
    }
    loadShipments(id:number):void{
      this.isLoading=true;
       this.apiService.getTransportId(id).subscribe({
        next: (shipment)=>{
          this.transportForm.patchValue({
            order_id:shipment.order.order_id,
            method:shipment.method,
            status:shipment.status,
            estimatedDelivery:shipment.estimatedDelivery.toString().split('T')[0] || ''
             
          });
          this.isLoading=false;
        },
        error: (err)=>{
          this.toastr.error(err.error?.message || 'Faild to load shipments');
          this.isLoading=false;
        }
       });
    }

    onSubmit():void{
        this.isLoading=true;
        const formValue=this.transportForm.value;
            console.log('FormValue',formValue.order_id);  
          this.orders$.subscribe(orders=> {
             console.log("before selected ", orders);
            const selectedOrder =orders.find(order => order.order_id === +formValue.order_id!);
            console.log("selected ", selectedOrder?.order_id!);
            
            if(!selectedOrder){
              this.toastr.error('Selected order not found');
              this.isLoading=false;
              return;
            }
            const shipmentData:Transport={
           order:selectedOrder,
           
          method:formValue.method ?? '',
            estimatedDelivery:formValue.estimatedDelivery ?? ''
            
        };
        if(this.isEdit && this.transId){
          this.apiService.updateTransport(this.transId,shipmentData).subscribe({
            next :() =>{
              this.toastr.success('Shipment updated Successfully');
              this.router.navigate(['transport/shipments'])
            },
            error: (err) =>{
              this.toastr.error(err.error?.message || 'Failed to update Shipments');
              this.isLoading=false;
            }
          });
        }else{
          this.apiService.createTransport(shipmentData).subscribe({
            next: () =>{
              this.toastr.success('Shipment Created Successfully');
              this.router.navigate(['transport/shipments'])
           
            },
            error: (err) =>{
              this.toastr.error(err.error?.message || 'Failed to Create Shipments');
              this.isLoading=false;
            }
          });
        }
          
          });
              

      if(this.transportForm.invalid){
        return;
      }
    }

    logout(){
      this.authService.logout();
    }

}
