import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../models/Organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  public host = environment.apiUrl + "organization/";

  constructor( private http : HttpClient ) { }

  public getOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.host + "all");
  }

  public getOrganizationById(id : number): Observable<Organization>{
    return this.http.get<Organization>(`${this.host}${id}`);
  }

  public getOrganizationByAdminId(id : number): Observable<Organization>{
    return this.http.get<Organization>(`${this.host}admin/${id}`);
  }

  public getActiveOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.host + "active");
  }

  public getWaitingOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.host + "waitlist");
  }

  public getRejectedOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.host + "rejected");
  }

  public saveOrganization(formData : FormData): Observable<Organization>{
    return this.http.post<Organization>(`${this.host}`,formData);
  }

  public updateOrganization(formData : FormData): Observable<Organization>{
    return this.http.put<Organization>(`${this.host}`,formData);
  }


  public deleteOrganization(id : number): Observable<Organization>{
    return this.http.delete<Organization>(`${this.host}${id}`);
  }

  public activateOrganization(id : number): Observable<Organization>{
    return this.http.put<Organization>(`${this.host}activate/${id}`,{});
  }
  public rejectOrganization(id : number): Observable<Organization>{
    return this.http.put<Organization>(`${this.host}reject/${id}`,{});
  }
}
