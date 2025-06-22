import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { AuthService } from '../../../../Services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { Observable, of, switchMap } from 'rxjs';
import { Order } from '../../../../Models/Orders/order.model';


@Component({
  selector: 'app-order-list',
  imports: [CommonModule,ReactiveFormsModule,SpinnerComponent,RouterLink],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent  implements OnInit {
      apiService=inject(ApiService);
      authService=inject(AuthService);
      toastr=inject(ToastrService);
      router=inject(Router);
        orders$: Observable<Order[]> = of([]);
      isLoading=false;
      fb=inject(FormBuilder);
          
        ngOnInit(): void {
          this.loadOrders();
        }
      loadOrders(){
        const userId=this.authService.getUserId();
        console.log("from orderList: "+userId);
        if(!userId){
          this.router.navigate(['auth/login']);
          return ; //returns empty orders bcoz userid not created so login 1st
        }
          this.orders$=this.apiService.getBuyerByUserId(userId).pipe(
            switchMap((buyer)=>{
              
              const buyerId=buyer.buyer_id ?? 0;
              console.log("from orderListsasa "+ buyerId);
              return this.apiService.getBuyerOrders(buyerId);
            })
          )
           
      }
       viewProduct(id:number){
        console.log('viewProduct:',id);
        this.router.navigate(['buyer/order_details/'+`${id}`]);
       }

       deleteOrder(id:number){
        console.log("delete",id);
       
    this.apiService.deleteOrder(id)
      .subscribe({
          next:()=>{
            this.toastr.success('Deleted successfully');
            this.loadOrders();

          },
          error:(err)=>{
            this.toastr.error('failed to delete order item');
          }
       });
    }
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

  logout(){
    this.authService.logout();
  }
}
