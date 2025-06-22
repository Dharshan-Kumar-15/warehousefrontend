import { Role } from "../Role.enum";

export interface User {

    user_id?:number;
    username:string;
    password:string;
    email:string;
    roles?:Role;
    token:string;

}
