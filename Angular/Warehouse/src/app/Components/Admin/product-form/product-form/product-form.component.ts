import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../../../Others/spinner/spinner.component';
import { ApiService } from '../../../../Services/ApiService/api.service';
import { ActivatedRoute, Event, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../Models/Products/product.model';
import { AuthService } from '../../../../Services/AuthService/auth.service';


@Component({
  selector: 'app-product-form',
  imports: [CommonModule,ReactiveFormsModule,SpinnerComponent,RouterLink],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  fb=inject(FormBuilder);
  apiService=inject(ApiService);
  authService=inject(AuthService);
  productForm=this.fb.group({
    product_name:['',Validators.required],
    product_Desc:[''],
    product_price:[0,[Validators.required,Validators.minLength(0)]],
    product_stocks:[0,[Validators.required,Validators.minLength(0)]]
  });
  isEdit=false;
  productId?:number;
   selectedFile:File |null=null ;
  imagePreview: string |null=null;
   isLoading=false;

   constructor(private route:ActivatedRoute,private router:Router,private toastr:ToastrService){
   
   }

   ngOnInit(): void {
     this.route.params.subscribe(params =>{
      if(params['id']){
        this.isEdit=true;
        this.productId= +params['id'];
        this.loadProduct(this.productId);
      }
     })
   }

   //LoadProduct
   loadProduct(id:number):void{
    this.isLoading=true;
    this.apiService.getProductId(id).subscribe({
      next: (product) =>{
        this.productForm.patchValue({
            product_name:product.product_name,
            product_Desc:product.product_Desc,
            product_price:product.product_price,
            product_stocks:product.product_stocks
        });
        this.isLoading=false;
      },
      error: (err) =>{
        this.toastr.error(err.error?.message || 'Failed to load  product');
        this.isLoading=false;
      }
    })
   }

   onFileSelected(event:any):void{
    const input=event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.selectedFile=input.files[0];

     // preview image
     const reader= new FileReader();
     reader.onload = () =>{
      this.imagePreview= reader.result as string;
     };
     reader.readAsDataURL(this.selectedFile);

    }
   }

   onSubmit(): void{
    this.isLoading=true;
    const   formValue=this.productForm.value;
    const productData: Product={
      product_name:formValue.product_name ?? '',
      product_Desc:formValue.product_Desc ?? '',
      product_price:formValue.product_price ?? 0,
      product_stocks:formValue.product_stocks ?? 0
    }

      if(this.isEdit && this.productId){
        if(this.selectedFile){
        this.apiService.updateProduct(this.productId,productData,this.selectedFile).subscribe({
        // this.apiService.updateProduct(this.productId,productData).subscribe({
          next: () =>{
            this.toastr.success('Product updated successfully');
            this.router.navigate(['admin/products']);
            this.isLoading=false;
          },
          error: (err)=>{
            this.toastr.error('Product update failed');
            console.log('please select file');
            this.isLoading=false;
          }
        });
      }else{
        this.toastr.error('Please select a file before submitting');
        console.log('please select file');
        this.isLoading=false;
      }
      }else{
        if(this.selectedFile){
          console.log(this.selectedFile.name);
          
        this.apiService.createProduct(productData,this.selectedFile).subscribe({
        //  this.apiService.createProduct(productData).subscribe({
          next: () =>{
            
            console.log('success');
            this.toastr.success('Product Created Succesfully');
            this.router.navigate(['admin/products']);
            
          },
          error: (err)=>{
            debugger;
            this.toastr.error(err.error?.message  || 'Failed to Create Product');
              console.log('please select file before creating from error');
            this.isLoading=false;
          }
        });
        }else{
        this.toastr.error('Please select a file before creating');
        console.log('please select file before creating from else');
        this.isLoading=false;
      }
      }

      if(this.productForm.invalid){
      return;
    }

   }

   logout(){
    this.authService.logout();
   }
}
