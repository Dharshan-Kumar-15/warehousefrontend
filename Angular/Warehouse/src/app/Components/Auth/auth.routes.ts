import { Routes } from "@angular/router";
import { AuthComponent } from "./login/auth.component";
import { RegisterComponent } from "./register/register/register.component";

export const AUTH_ROUTES: Routes=[
    {
        path:'login',
        component:AuthComponent,
        title:'Login Page'
    },
    {
        path:'register',
        component:RegisterComponent,
        title:'Register Page'
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    }
];