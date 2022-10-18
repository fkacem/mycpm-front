import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PurchaseOrder } from '../models/PurchaseOrder';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  public host = environment.apiUrl + "purchaseOrder/";

  constructor( private http : HttpClient ) { }

  public getPurchaseOrders(): Observable<PurchaseOrder[]>{
    return this.http.get<PurchaseOrder[]>(this.host);
  }

  public savePurchaseOrder(purchaseOrder : PurchaseOrder,marketID : number):Observable<PurchaseOrder>{
    return this.http.post<PurchaseOrder>(`${this.host}?marketID=${marketID}`, purchaseOrder);
  }

  public deletePurchaseOrder(id : Number):Observable<PurchaseOrder>{
    return this.http.delete<PurchaseOrder>(`${this.host}${id}`);
  }

  public getPurchaseOrderById(id : number): Observable<PurchaseOrder>{
    return this.http.get<PurchaseOrder>(`${this.host}${id}`);
  }

}
