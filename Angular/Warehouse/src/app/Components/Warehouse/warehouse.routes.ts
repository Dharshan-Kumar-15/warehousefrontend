import { Routes } from "@angular/router";
import { WarehouseListComponent } from "./warehouselist/warehouse-list/warehouse-list.component";
import { WarehouseFormComponent } from "./warehouseform/warehouse-form/warehouse-form.component";

export const WAREHOUSE_ROUTES:Routes=[
{
    path:'items',
    component:WarehouseListComponent,
    title:'Inventory Items'
},
{
    path:'add_items',
    component:WarehouseFormComponent,
    title:'Add Items'
},
{
    path:'edit_items/:id',
    component:WarehouseFormComponent,
    data: {
    renderMode: 'client' // Force client-side only
    },
    title:'Edit Items'
},
{
    path:'',
    redirectTo:'items',
    pathMatch:'full'
}

];