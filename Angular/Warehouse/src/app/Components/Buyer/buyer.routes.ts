import { Routes } from "@angular/router";
import { BuyerProfileComponent } from "./profile/buyer-profile/buyer-profile.component";
import { OrderListComponent } from "./orderlist/order-list/order-list.component";
import { OrderFormComponent } from "./orderform/order-form/order-form.component";
import { OrderDetailsComponent } from "./orderdetails/order-details/order-details.component";
import { BuyerProductsComponent } from "./productsBuyer/buyer-products/buyer-products.component";

export const BUYER_ROUTES:Routes=[
    {
        path:'profile',
        component:BuyerProfileComponent,
        title:'My Profile'
    },
    {
        path:'products',
        component:BuyerProductsComponent,
        title:'Products'
    },
    {
        path:'orders',
        component:OrderListComponent,
        title:'My Orders'
    },
    {
        path:"create_orders",
        component:OrderFormComponent,
        title:'Create Order'
    },
    {
        path:'order_details/:id',
        component:OrderDetailsComponent,
        data: {
      renderMode: 'client' as const, // Type-safe constant
      ssr: false // Explicit SSR disable
    },
        title:'Order Details'
    },
    {
        path:'',
        redirectTo:'products',
        pathMatch:'full'
    }

];