import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../../../Models/Orders/order.model';
import { AuthService } from '../../../../Services/AuthService/auth.service';



@Component({
  selector: 'app-order-details',
  imports: [CommonModule,SpinnerComponent,RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
   private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  router=inject(Router);
  order:Order |null =null;
  isLoading=false;
 // imageUrl:any|null=null;
  ngOnInit(): void {
    const orderId=this.route.snapshot.params['id'];
    console.log("orderId: from order details",orderId);
    this.loadOrderDetails(orderId);
    // this.getImage(orderId);
  }

  loadOrderDetails(id:number){
    this.isLoading=true;
    console.log('from order details')
    this.apiService.getOrderDetails(id).subscribe({
      next: (orders)=>{

          this.order=orders;
          this.isLoading=false;
      },
      error: (err)=>{
        this.toastr.error(err.error?.message || 'Failed to load order details');
        this.isLoading=false;
      }
    });
  }
  
  /*getImage(id:number){
   const image= this.apiService.getImage(id).subscribe({
    next:(blob)=>{
      console.log('inside blob');
      const reader=new FileReader();
      reader.onloadend = () => {
        this.imageUrl= reader.result as string  ;
      };
      reader.readAsDataURL(blob);
    },
    error:(err)=>{
      console.error("Failed to get Image:",err);
      this.imageUrl=null;
    }
   })
   
  }*/
  getStatusBadgeClass(status: string): string {
    switch(status) {
      case 'PENDING': return 'badge bg-warning text-dark';
      case 'PROCESSING': return 'badge bg-info text-dark';
      case 'SHIPPED': return 'badge bg-primary';
      case 'DELIVERED': return 'badge bg-success';
      case 'CANCELLED': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }

  deleteOrder(id:number){
    console.log("delete details:",id);
    this.apiService.getOrderItemId(id).subscribe({
      next:(orders)=>{
        console.log('items ulla pothu',orders);
        this.apiService.deleteOrder(orders.orderItemId!).subscribe({
          next:()=>{
            this.toastr.success('Deleted successfully');
            this.ngOnInit();
          },
          error:(err)=>{
            this.toastr.error('failed to delete order item');
          }
        });
      },
      error:(err)=>{
        this.toastr.error('failed to delete order item');
      }
    })
    
    }
 
    logout(){
      this.authService.logout();
    }
}
