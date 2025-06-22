import { Routes } from "@angular/router";
import { TransportListComponent } from "../Transport/transportlist/transport-list/transport-list.component";
import { TransportFormComponent } from "../Transport/transportform/transport-form/transport-form.component";
import { TransportStatusComponent } from "../Transport/transportstatus/transport-status/transport-status.component";

export const TRANSPORT_ROUTES:Routes=[
{
    path:'shipments',
    component:TransportListComponent,
    title:'Shipments'
},
{
    path:'create_shipments',
    component:TransportFormComponent,
    title:'New Shipments'
},
{
    path:'edit_shipments/:id',
    component:TransportFormComponent,
    data: {
      renderMode: 'client' as const, // Type-safe constant
      ssr: false // Explicit SSR disable
    },
    title:'Edit Shipments'
},
{
    path:'shipments_status/:id',
    component:TransportStatusComponent,
    data: {
      renderMode: 'client' as const, // Type-safe constant
      ssr: false // Explicit SSR disable
    },
    title:'Update Shipment Status'
},
{
    path:'',
    redirectTo:'shipments',
    pathMatch:'full'
}

];