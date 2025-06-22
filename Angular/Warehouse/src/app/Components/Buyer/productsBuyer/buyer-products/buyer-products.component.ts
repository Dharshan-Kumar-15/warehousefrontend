import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { Product } from '../../../../Models/Products/product.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../Services/AuthService/auth.service';

@Component({
  selector: 'app-buyer-products',
  imports: [CommonModule,RouterLink],
  templateUrl: './buyer-products.component.html',
  styleUrl: './buyer-products.component.css'
})
export class BuyerProductsComponent {

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
  buyProduct():void{
    this.router.navigate(['buyer/create_orders']);
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
