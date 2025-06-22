import { Product } from "../Products/product.model";

export interface Warehouse {
    id?:number;
    product:Product;
    quantity:number;
    location:string;
    
}
