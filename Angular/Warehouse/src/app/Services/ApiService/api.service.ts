import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../Models/Products/product.model';
import { Warehouse } from '../../Models/Warehouse/warehouse.model';
import { Transport } from '../../Models/Transport/transport.model';

import { Buyer } from '../../Models/Buyer/buyer.model';
import { Order } from '../../Models/Orders/order.model';
import { User } from '../../Models/User/user.model';
import { OrderItem } from '../../Models/OrderItems/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl= 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  gerUserId(id:number):Observable<User>{
    return this.http.get<User>(this.apiUrl+'auth/getuser/'+`${id}`);
  }
  //Admin api's
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl+'admin/getproduct');
  }
  getProductId(id:number):Observable<Product>{
    return this.http.get<Product>(this.apiUrl+'admin/getproduct/'+ `${id}`);
  }
  // createProduct(product:Product):Observable<Product>{
  //   return this.http.post<Product>(this.apiUrl+'admin/createproduct',product);
  // }
  // updateProduct(id:number,product: Product):Observable<Product>{
  //   return this.http.put<Product>(this.apiUrl+'admin/updateproduct/'+`${id}`,product);
  // }
  createProduct(product:Product,image:File) :Observable<Product>{
    const formData=new FormData();
    const productBlob= new Blob([JSON.stringify(product)],{type: 'application/json'});
    formData.append('product',productBlob);
    formData.append('imageFile',image);
    return this.http.post<Product>(this.apiUrl+'admin/createproduct',formData);

  }

  updateProduct(id:number,product: Product,image:File):Observable<Product>{
    const formData = new FormData();
    const productBlob= new Blob([JSON.stringify(product)],{type: 'application/json'});
    formData.append('product',productBlob);
    if(image){
    formData.append('imageFile',image,image.name);
    }
    return this.http.put<Product>(this.apiUrl+'admin/updateproduct/'+`${id}`,formData);

  }

  deleteProduct(id:number):Observable<void>{
    return this.http.delete<void>(this.apiUrl+'admin/deleteproduct/'+`${id}`);

  }

//WareHouse api
getWarehouseItems():Observable<Warehouse[]>{
  return this.http.get<Warehouse[]>(this.apiUrl+'warehouse/items');
}
getWarehouseItemsId(id:number):Observable<Warehouse>{
  return this.http.get<Warehouse>(this.apiUrl+'warehouse/items/'+`${id}`);
}
createWarehouse(items:Warehouse):Observable<Warehouse>{
  return this.http.post<Warehouse>(this.apiUrl+'warehouse/createwarehouse',items);
}
updateWarehouse(id:number,items:Warehouse):Observable<Warehouse>{
  return this.http.put<Warehouse>(this.apiUrl+'warehouse/updatewarehouse/'+`${id}`,items);
}
deleteWarehouse(id:number):Observable<void>{
  return this.http.delete<void>(this.apiUrl+'warehouse/deletewarehouse/'+`${id}`);
}
//Transaction

getTransport():Observable<Transport[]>{
  return this.http.get<Transport[]>(this.apiUrl+'transport/shipments');
}
getTransportId(id:number):Observable<Transport>{
  return this.http.get<Transport>(this.apiUrl+'transport/shipments/'+`${id}`);
}
createTransport(transport: Transport):Observable<Transport>{
  return this.http.post<Transport>(this.apiUrl+'transport/createtransport',transport);
}
updateTransport(id:number,transport: Transport):Observable<Transport>{
  return this.http.put<Transport>(this.apiUrl+'transport/updatetransport/'+`${id}`,transport);
}
deleteTransport(id:number):Observable<void>{
  return this.http.delete<void>(this.apiUrl+'transport/deletetransport/'+`${id}`);
}
updateStatusTransport(id:number,status:string):Observable<Transport>{
  return this.http.put<Transport>(this.apiUrl+'transport/updatestatus/'+`${id}`,status);
}
//Buyer
getBuyerByUserId(userId:number):Observable<Buyer>{
  return this.http.get<Buyer>(this.apiUrl+'buyer/profile/'+`${userId}`);

}
getBuyerId(buyerId:number):Observable<Buyer>{
  return this.http.get<Buyer>(this.apiUrl+'buyer/profiles/'+`${buyerId}`);
}
createBuyer(buyer: Buyer):Observable<Buyer>{
  return this.http.post<Buyer>(this.apiUrl+'buyer/createprofile',buyer);
}
updateBuyer(id:number,buyer:Buyer){
  return this.http.put<Buyer>(this.apiUrl+'buyer/updateprofile/'+`${id}`,buyer);
}
getBuyerOrders(buyer_id:number):Observable<Order[]>{
  return this.http.get<Order[]>(this.apiUrl+'buyer/buyerorders/'+`${buyer_id}`)

}
createOrder(order: Order):Observable<Order>{
  return this.http.post<Order>(this.apiUrl+'buyer/createorder',order);
}
getOrderDetails(id:number):Observable<Order>{
return this.http.get<Order>(this.apiUrl+'buyer/orders/details/'+`${id}`);
}
getImage(id:number):Observable<Blob>{
    return this.http.get<Blob>(this.apiUrl+'admin/getimage/'+`${id}`);
}

getOrders():Observable<Order[]>{
  return this.http.get<Order[]>(this.apiUrl+'buyer/orders');
}

getOrderById(id:number):Observable<Order>{
  return this.http.get<Order>(this.apiUrl+'buyer/orders/'+`${id}`);
}
updateOrderStatus(id:number,status:string):Observable<Order>{
  return this.http.put<Order>(this.apiUrl+'buyer/orderstatus/'+`${id}`,status);
}

deleteOrder(id:number):Observable<void>{
  console.log('apiserivce:');
return this.http.delete<void>(this.apiUrl+'buyer/deleteorders/'+`${id}`);
}
deleteOrderItem(id:number):Observable<void>{
  console.log('apiserivce:');
return this.http.delete<void>(this.apiUrl+'buyer/deleteordersitem/'+`${id}`);
}

getOrderItemId(ide:number):Observable<OrderItem>{
  return this.http.get<OrderItem>(this.apiUrl+'buyer/getorderitem/'+`${ide}`);
}





}
