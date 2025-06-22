import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../Services/AuthService/auth.service';


@Component({
  selector: 'app-transport-status',
  imports: [CommonModule,ReactiveFormsModule,SpinnerComponent,RouterLink],
  templateUrl: './transport-status.component.html',
  styleUrl: './transport-status.component.css'
})
export class TransportStatusComponent implements OnInit {
  fb=inject(FormBuilder);
  apiService=inject(ApiService);
  authService=inject(AuthService);
  statusForm=this.fb.group({
    status:['',Validators.required]
  });
  
  shipmentId!:number;
  currentStatus='';
  
  statusOptions=['PENDING','IN_TRANSIT','CANCELLED','PREPARING','DELIVERED'];
  isLoading=false;

  constructor(private route:ActivatedRoute,private router:Router,private toastr:ToastrService){}

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.shipmentId= +params['id'];
      this.loadShipments(this.shipmentId);
    })
  }
  loadShipments(id:number):void{
      this.isLoading=true;
      this.apiService.getTransportId(id).subscribe({
        next: (shipment) =>{
          this.currentStatus=shipment.status!;
          this.statusForm.patchValue({
            status:shipment.status
          });
          this.isLoading=false;
        },
        error: (err)=>{
          this.toastr.error(err.error?.message || 'Failed to load shipment');
          this.isLoading=false;
        }
      });
  }

  onSubmit(){
      this.isLoading=true;
      const newStatus=this.statusForm.value.status;
      console.log('shipstatus:',newStatus,this.shipmentId);
      this.apiService.updateStatusTransport(this.shipmentId,newStatus!).subscribe({
        next: (operation)=>{
          console.log(operation.status);
          this.toastr.success('Status Updated Successfully');
          this.router.navigate(['/transport/shipments']);
        },
        error: (err)=>{
          this.toastr.error('Failed to Update Status');
          this.isLoading=false;
        }
      });
      
    if(this.statusForm.invalid){
      return;
    }
  }

  getStatusBadgeclass(status:string):string{
    switch(status){
      case 'PENDING': return 'badge bg-warning text-dark';
      case 'IN_TRANSIT': return 'badge bg-info text-dark';
      case 'DELIVERED': return 'badge bg-success';
      case 'CANCELLED': return 'badge bg-danger';
      case 'PREPARING': return 'badge bg-primary'
      default: 
        return 'badge bg-secondary';
    }
  }

  logout(){
    this.authService.logout();
  }

}
