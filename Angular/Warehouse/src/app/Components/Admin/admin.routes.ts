import { Routes } from "@angular/router";
import { AdminComponent } from "./product-list/admin.component";
import { ProductFormComponent } from "./product-form/product-form/product-form.component";

export const ADMIN_ROUTES: Routes=[
{
    path:'',
    redirectTo:'products',
    pathMatch:"full"
},
    {
    path:'products',
    component:AdminComponent,
    title:'Products',
    data: { roles: ['ROLE_BUYER'] }
},
{
    path:'create_products',
    component:ProductFormComponent,
    title:'Create Product'
},
{
    path: 'edit_products/:id',
    component:ProductFormComponent,
    data: {
      renderMode: 'client' as const, // Type-safe constant
      ssr: false // Explicit SSR disable
    },
    title:'Edit Product'
}



];
