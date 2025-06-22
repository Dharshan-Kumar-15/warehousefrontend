import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { AuthService } from '../../../../Services/AuthService/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../Models/Products/product.model';

@Component({
  selector: 'app-order-form',
  imports: [CommonModule,ReactiveFormsModule,SpinnerComponent,RouterLink],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
 private fb = inject(FormBuilder);
   apiService = inject(ApiService);
   authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  orderForm=this.fb.group({
    productId:[0],
    quantity:[0,[Validators.min(1)]]
  });

  products$=this.apiService.getProducts();
  
  selectedProducts:{ product: Product,quantity:number}[]=[];
  isLoading=false;
  

  addProduct():void{
   
    const productId=this.orderForm.value.productId ?? 0;
    const quantity=this.orderForm.value.quantity ?? 0;
    console.log("ID: add:"+ productId);
      this.products$.subscribe(products => {
        console.log("Available products: ", products);
        const product=products.find(p => p.product_id === +productId);
        console.log("Selected product ",product);
        if(product){
          if(product.product_stocks < quantity){
            this.toastr.warning('Only'+`${product.product_stocks}`+'items available in stock');
            return;
          }
          const existingItem=this.selectedProducts.find(item => item.product.product_id === productId);
          if(existingItem){
            existingItem.quantity +=quantity;
          }else{
            this.selectedProducts.push({product,quantity});
          }
          this.orderForm.get('quantity')?.reset();
        }else{
          console.log("error in add product");
        }
      });
       if (this.orderForm.get('productId')?.invalid || this.orderForm.get('quantity')?.invalid) {
      return;
    }
  }

  removeProduct(index:number):void{
    this.selectedProducts.splice(index,1);
  }

  getTotal():number{
    return this.selectedProducts.reduce((sum,item) =>
       sum + (item.product.product_price * item.quantity),0);
  }

  submitOrder():void{
    if(this.selectedProducts.length === 0){
      this.toastr.warning('Please add at least one product to the order');
      return;
    }
    this.isLoading=true;
    const userId=this.authService.getUserId();
    console.log("Order form:"+userId);
    if(!userId){
      this.toastr.error('User not Authenticated');
      this.isLoading=false; 
      return;
    }
    this.apiService.getBuyerByUserId(userId).subscribe({
      next:(buyer) =>{
        console.log('buyer Ids', buyer.buyer_id);
        if(!buyer){
          this.toastr.warning('Please complete your profile before placing  an order');
          this.router.navigate(['/buyer/profile']);
          this.isLoading=false; 
          return;
        }
        const formValue=this.orderForm.value.productId;
        console.log("from order form:"+formValue);

        this.apiService.getProductId(formValue!).subscribe({
          next: (fullproduct) =>{
            const order={
          buyer:buyer,
          items:this.selectedProducts.map(item =>({
            product:fullproduct,
            quantity:item.quantity,
            price:item.product.product_price
          }))
        };
        console.log("orders: from order form ",order);
        this.apiService.createOrder(order!).subscribe({  
          
          next: () =>{
            
            this.toastr.success('Order placed successfully!');
            this.router.navigate(['/buyer/orders']);
          },
          error: (err) => {
            this.toastr.error( 'Failed to place order');
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Failed to load buyer profile');
        this.isLoading = false;
      }
    });
          }
        })
        

        
  }

  logout(){
    this.authService.logout();
  }

}
