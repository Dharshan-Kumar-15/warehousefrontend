import { User } from "../User/user.model";

export interface Buyer {
    buyer_id?:number;
     user?:User;
    name:string;
    address:string;
    phone:string;
    paymentMode:string;
}
