

export interface DecodedToken {
    user_id:number;
    username:string;
    email:string;
    sub:string;
    roles:string[] |string;
    exp:number;
    iat: number;
}
