import { Order } from "../Orders/order.model";
import { Product } from "../Products/product.model";

export interface OrderItem {
    orderItemId?:number;
    product:Product;
    // order?:Order;
    quantity:number;
    price:number;
}
