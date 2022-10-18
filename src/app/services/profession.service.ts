import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profession } from '../models/Profession';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  public host = environment.apiUrl + "profession/";

  constructor( private http : HttpClient) {}

  public getProfessions(): Observable<Profession[]>{
    return this.http.get<Profession[]>(this.host);
  }

  public saveProfession(profession : Profession):Observable<Profession>{
    return this.http.post<Profession>(this.host, profession);
  }

  public deleteProfession(id : Number):Observable<Profession>{
    return this.http.delete<Profession>(`${this.host}${id}`);
  }

  public getProfessionBySector(id : Number): Observable<Profession[]>{
    return this.http.get<Profession[]>(`${this.host}bySector/${id}`);
  }
}
