import { Routes } from '@angular/router';
import { authGuard } from './AuthGuard/authguard/auth.guard';
import { roleGuard } from './AuthGuard/roleguard/role.guard';


export const routes: Routes = [
    //Login and Register
    {
        path:'auth',
        loadChildren:() => import('./Components/Auth/auth.routes').then(m => m.AUTH_ROUTES)
        
    },
    // Redirect 
    { path:'',redirectTo:'auth',pathMatch:'full'},
    { 
    path: 'admin', 
    loadChildren: () => import('./Components/Admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_ADMIN'],
        renderMode: 'client'
     }
    },
    { 
    path: 'buyer', 
    loadChildren: () => import('./Components/Buyer/buyer.routes').then(m => m.BUYER_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_BUYER'],
        renderMode: 'client'
     }
    },
    { 
    path: 'warehouse', 
    loadChildren: () => import('./Components/Warehouse/warehouse.routes').then(m => m.WAREHOUSE_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_WAREHOUSE'],
        renderMode: 'client'
     }
    },{ 
    path: 'transport', 
    loadChildren: () => import('./Components/Transport/transport.routes').then(m => m.TRANSPORT_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_TRANSPORTATION'],
        renderMode: 'client'
     }
    },
    
];
