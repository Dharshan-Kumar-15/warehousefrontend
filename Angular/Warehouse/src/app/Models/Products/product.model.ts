export interface Product {
    product_id?:number;
    product_name:string;
    product_Desc:string;
    product_price:number;
    product_stocks:number;
    image_name?:string;
    image_type?:string;
    image_data?:string; //this will be base64 encoded 
    
}
