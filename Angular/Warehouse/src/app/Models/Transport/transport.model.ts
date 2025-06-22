import { Order } from "../Orders/order.model";
import { Status} from "./status.enum";

export interface Transport {

    transId?:number;
    order:Order;
    method:string;
    status?:Status;
    trackingNumber?:string;
    estimatedDelivery:string;
   
    
}
