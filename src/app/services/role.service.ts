import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public host = environment.apiUrl + "roles/";

  constructor( private http : HttpClient ) { }

  public getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(this.host);
  }

}
