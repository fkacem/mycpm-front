import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BusinessSector } from '../models/BusinessSector';

@Injectable({
  providedIn: 'root'
})
export class BusinessSectorService {

  public host = environment.apiUrl + "sector/";

  constructor( private http : HttpClient) {}

  public getSectors(): Observable<BusinessSector[]>{
    return this.http.get<BusinessSector[]>(this.host);
  }

  public saveSector(sector : BusinessSector):Observable<BusinessSector>{
    return this.http.post<BusinessSector>(this.host, sector);
  }

  public deleteSector(id : Number):Observable<BusinessSector>{
    return this.http.delete<BusinessSector>(`${this.host}${id}`);
  }

}

