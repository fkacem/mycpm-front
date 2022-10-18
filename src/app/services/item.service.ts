import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public host = environment.apiUrl + "item/";

  constructor( private http : HttpClient ) { }

  public getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(this.host);
  }

  public saveItem(item : Item):Observable<Item>{
    return this.http.post<Item>(this.host, item);
  }

  public deleteItem(id : Number):Observable<Item>{
    return this.http.delete<Item>(`${this.host}${id}`);
  }
}
