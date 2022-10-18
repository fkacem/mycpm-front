import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemUsed } from '../models/ItemUsed';

@Injectable({
  providedIn: 'root'
})
export class ItemUsedService {
  

  public host = environment.apiUrl + "itemUsed/";

  constructor( private http : HttpClient ) { }

  public getItemUsedByPurchaseOrder(orderId : number): Observable<ItemUsed[]>{
    return this.http.get<ItemUsed[]>(`${this.host}${orderId}`);
  }

  public saveItemUsed(orderId : number, itemUsed : ItemUsed):Observable<ItemUsed>{
    return this.http.post<ItemUsed>(`${this.host}${orderId}`, itemUsed);
  }

  public deleteItemUsed(id : Number):Observable<ItemUsed>{
    return this.http.delete<ItemUsed>(`${this.host}${id}`);
  }

  
}
