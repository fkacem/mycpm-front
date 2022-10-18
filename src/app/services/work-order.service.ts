import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WorkOrder } from '../models/WorkOrder';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  public host = environment.apiUrl + "workOrder/";

  constructor( private http : HttpClient ) { }

  public getWorkOrders(): Observable<WorkOrder[]>{
    return this.http.get<WorkOrder[]>(this.host);
  }

  public getWorkOrderById(id : number): Observable<WorkOrder>{
    return this.http.get<WorkOrder>(`${this.host}${id}`);
  }

  public getWorkOrdersByPurchaseOrder(id : number): Observable<WorkOrder[]>{
    return this.http.get<WorkOrder[]>(`${this.host}order/workOrder/${id}`);
  }

  public saveWorkOrder(workOrder : WorkOrder, purchaseOrderId : number):Observable<WorkOrder>{
    return this.http.post<WorkOrder>(`${this.host}${purchaseOrderId}`, workOrder);
  }

  public deleteWorkOrder(id : Number):Observable<WorkOrder>{
    return this.http.delete<WorkOrder>(`${this.host}${id}`);
  }
}
