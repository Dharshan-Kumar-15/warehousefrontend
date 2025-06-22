import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { Warehouse } from '../../../../Models/Warehouse/warehouse.model';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { AuthService } from '../../../../Services/AuthService/auth.service';



@Component({
  selector: 'app-warehouse-list',
  imports: [CommonModule,RouterLink,SpinnerComponent],
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.css'
})
export class WarehouseListComponent {
  apiService=inject(ApiService);
  authService=inject(AuthService);
  warehouseItems=this.apiService.getWarehouseItems();

  constructor(private toastr:ToastrService,private router:Router){}

  editItem(id:number):void{
    this.router.navigate(['warehouse/edit_items/'+`${id}`]);
  }

  deleteItem(id:number):void{
    if(confirm('Are you sure you want to delete this warehouse item?')){
      this.apiService.deleteWarehouse(id).subscribe({
        next: () =>{
          this.warehouseItems=this.apiService.getWarehouseItems();
          this.toastr.success('Item deleted successfully');
        },
        error: (err)=>{
            this.toastr.error(err.error?.message ||'Failed to delete item');
        }
      });
    }
  }

  trackById(index:number,item:Warehouse):number{

    return item.id ?? index;
  }

    logout(){
      this.authService.logout();
    }
}
