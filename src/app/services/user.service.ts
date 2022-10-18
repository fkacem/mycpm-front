import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/Role';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public host = environment.apiUrl + "api/";

  constructor( private http : HttpClient ) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.host + "users");
  }

  public getUserById(id : number): Observable<User>{
    return this.http.get<User>(`${this.host}users/${id}`);
  }

  public saveUser(user : User):Observable<User>{
    return this.http.post<User>(this.host + "users", user);
  }

  public getUserByToken(): Observable<User>{
    return this.http.get<User>(`${this.host}user/profile`);
  }

  public saveRole(role : Role):Observable<Role>{
    return this.http.post<Role>(this.host + "role/save", role);
  }
}
