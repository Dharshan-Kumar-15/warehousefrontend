
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/admin",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-77FBRZDK.js",
      "chunk-5YPTTVOM.js"
    ],
    "redirectTo": "/auth/login",
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-77FBRZDK.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-77FBRZDK.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/auth/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6KMFATO4.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "redirectTo": "/admin/products",
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6KMFATO4.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/admin/products"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6KMFATO4.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/admin/create_products"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-6KMFATO4.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/admin/edit_products/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CJ7BRMSG.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "redirectTo": "/buyer/products",
    "route": "/buyer"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CJ7BRMSG.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/buyer/profile"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CJ7BRMSG.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/buyer/products"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CJ7BRMSG.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/buyer/orders"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CJ7BRMSG.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/buyer/create_orders"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-CJ7BRMSG.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/buyer/order_details/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IJCKIDRH.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "redirectTo": "/warehouse/items",
    "route": "/warehouse"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IJCKIDRH.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/warehouse/items"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-IJCKIDRH.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/warehouse/add_items"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-IJCKIDRH.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/warehouse/edit_items/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7A2D4HK4.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "redirectTo": "/transport/shipments",
    "route": "/transport"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7A2D4HK4.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/transport/shipments"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7A2D4HK4.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/transport/create_shipments"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-7A2D4HK4.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/transport/edit_shipments/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-7A2D4HK4.js",
      "chunk-FYVEFPOD.js",
      "chunk-5YPTTVOM.js"
    ],
    "route": "/transport/shipments_status/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5085, hash: '2eb2c820fcd2b2027cc828685b6da4035a5cfe0735355daee794e9162dedcd35', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1057, hash: 'f0b1cd4ba127031894b9feee336d781af7784ded906d1b88a923d2248cc83c94', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'admin/create_products/index.html': {size: 22515, hash: 'c5164c464e150b369e0e30547a8e612895ed79daead526b113f3d408c0cc71dd', text: () => import('./assets-chunks/admin_create_products_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 22463, hash: '6343786982a20667b41394e6d567b4fc3d9218a18433b8129d97fa43011c840a', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 26960, hash: '050833774be27e962b48ad4ae66670976bc98d96533fe3ad515a37deb5ac27ce', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'admin/products/index.html': {size: 22515, hash: 'c5164c464e150b369e0e30547a8e612895ed79daead526b113f3d408c0cc71dd', text: () => import('./assets-chunks/admin_products_index_html.mjs').then(m => m.default)},
    'buyer/create_orders/index.html': {size: 22515, hash: '25b6dbc2950dff7d2b33c187c15feebc1e2a8165053a7067e87a1d0d80f44a85', text: () => import('./assets-chunks/buyer_create_orders_index_html.mjs').then(m => m.default)},
    'buyer/products/index.html': {size: 22515, hash: '25b6dbc2950dff7d2b33c187c15feebc1e2a8165053a7067e87a1d0d80f44a85', text: () => import('./assets-chunks/buyer_products_index_html.mjs').then(m => m.default)},
    'buyer/orders/index.html': {size: 22518, hash: 'cb8ab557a2857247c94af5e1fa7123df84a42e13d72c93e14c54d62b06f8b997', text: () => import('./assets-chunks/buyer_orders_index_html.mjs').then(m => m.default)},
    'buyer/profile/index.html': {size: 22515, hash: '25b6dbc2950dff7d2b33c187c15feebc1e2a8165053a7067e87a1d0d80f44a85', text: () => import('./assets-chunks/buyer_profile_index_html.mjs').then(m => m.default)},
    'warehouse/add_items/index.html': {size: 22515, hash: '4725efb6fde401224158d0490451ffd7580351d3f07a2afc79785bdd074099b0', text: () => import('./assets-chunks/warehouse_add_items_index_html.mjs').then(m => m.default)},
    'warehouse/items/index.html': {size: 22515, hash: '4725efb6fde401224158d0490451ffd7580351d3f07a2afc79785bdd074099b0', text: () => import('./assets-chunks/warehouse_items_index_html.mjs').then(m => m.default)},
    'transport/create_shipments/index.html': {size: 22515, hash: '571e95005fb0f5b1fa23258d37c9538a95c01bc6fe3f4d52c1843c0a2f5f4def', text: () => import('./assets-chunks/transport_create_shipments_index_html.mjs').then(m => m.default)},
    'transport/shipments/index.html': {size: 22518, hash: '732662b4759ad82ca1db8e2e916b23bf640057d4c037bd056be103897ac06e1d', text: () => import('./assets-chunks/transport_shipments_index_html.mjs').then(m => m.default)},
    'styles-N4ULBG22.css': {size: 236254, hash: 'VJ36SlkS/z8', text: () => import('./assets-chunks/styles-N4ULBG22_css.mjs').then(m => m.default)}
  },
};
