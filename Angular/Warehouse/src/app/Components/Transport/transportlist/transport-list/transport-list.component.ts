import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { Transport } from '../../../../Models/Transport/transport.model';
import { TransportStatusComponent } from '../../transportstatus/transport-status/transport-status.component';
import { AuthService } from '../../../../Services/AuthService/auth.service';

@Component({
  selector: 'app-transport-list',
  imports: [CommonModule,RouterLink,SpinnerComponent],
  templateUrl: './transport-list.component.html',
  styleUrl: './transport-list.component.css'
})
export class TransportListComponent {
  authService=inject(AuthService);
  apiService=inject(ApiService);
  shipments$ =this.apiService.getTransport();
  constructor(private router:Router,private toast:ToastrService){}
  
  editShipments(id:number):void{
      this.router.navigate(['/transport/edit_shipments/'+`${id}`]);
  }
  updateStatus(id:number):void{
    this.router.navigate(['/transport/shipments_status/'+`${id}`]);
  }
  deleteShipments(id:number):void{
    if(confirm('Are you sure you want to delete this shipments?')){
      this.apiService.deleteTransport(id).subscribe({
        next: ()=>{
          this.shipments$=this.apiService.getTransport();
          this.toast.success('Shipment Deleted Successfully');
        },
        error: (err)=>{
          this.toast.error('Failed to delete shipment');
        }
      });
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
  trackById(index:number,item:Transport):number{
    return item.transId ?? index;

  }
  logout(){
    this.authService.logout();
  }
}
