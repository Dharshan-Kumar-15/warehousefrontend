import { Buyer } from "../Buyer/buyer.model";
import { OrderItem } from "../OrderItems/order-item.model";
import { Product } from "../Products/product.model";
import { Transport } from "../Transport/transport.model";

export interface Order {
    order_id?:number;
    buyer:Buyer;
   items:OrderItem[];
    totalAmount?:number;
    status?:string;
    orderDate?:string;
    transportation?:Transport;
}
