import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Type } from '../models/Type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  public host = environment.apiUrl + "type/";

  constructor( private http : HttpClient ) { }

  public getTypes(): Observable<Type[]>{
    return this.http.get<Type[]>(this.host);
  }

  public saveType(type : Type):Observable<Type>{
    return this.http.post<Type>(this.host, type);
  }

  public deleteType(id : Number):Observable<Type>{
    return this.http.delete<Type>(`${this.host}${id}`);
  }
}
