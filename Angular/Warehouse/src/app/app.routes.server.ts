import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/edit_products/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'buyer/order_details/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'warehouse/edit_items/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'transport/edit_shipments/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'transport/shipments_status/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
