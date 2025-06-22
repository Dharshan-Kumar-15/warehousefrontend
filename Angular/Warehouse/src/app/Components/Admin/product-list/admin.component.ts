import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ApiService } from '../../../Services/ApiService/api.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../Models/Products/product.model';
import { AuthService } from '../../../Services/AuthService/auth.service';



@Component({
  selector: 'app-admin',
  imports: [CommonModule,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  apiService=inject(ApiService);
  
  products:Product[]=[];

  constructor(private router:Router,private toastr:ToastrService,private authService: AuthService){

  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.apiService.getProducts().subscribe({
        next: (product) =>{
          this.products=product;
        },
        error: (err)=>{
          this.toastr.error('Failed to get Product');
          console.error("failed to get product");
        }
    })

  }
  editProduct(id:number):void{
    this.router.navigate(['admin/edit_products/'+`${id}`]);
  }

  deleteProduct(product_id:number):void{
    if(confirm('Are you sure you want to delete this product?')){
      this.apiService.deleteProduct(product_id).subscribe({
        next:()=>{
          this.toastr.success('Product Deleted Successfully');
          this.getProduct();
          
        },
        error: (err) =>{
          this.toastr.error(err.error?.message || 'Failed to Delete product'); 
          console.error('Failed to delete product',err); 
        }
      });
    }
  }

  getImageUrl(product:Product):string{
    if(product.image_data){
      return `data:${product.image_type};base64,${product.image_data}`;
    }
    return 'public/truck.jpg';
  }
  logout(){
    this.authService.logout();
  }


}
