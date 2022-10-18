import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = environment.apiUrl + "api/login" ;
  public refreshHost = environment.apiUrl + "token/refresh";
  private token : string;
  private refreshtoken : string;
  public expiredMsg : String;
  private loggedInUsername : string;
  private jwtHelper = new JwtHelperService();


  constructor( private http : HttpClient) {}

  public login(user : User):Observable<HttpResponse<any> | HttpErrorResponse |any>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse|any>(`${this.host}?username=${user.username}&&password=${user.password}`, null ,{observe : 'response'});
  }

  public refresh():Observable<HttpResponse<any> | HttpErrorResponse |any>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse | any>(`${this.refreshHost}`, {observe: 'response' });
  }

  public saveToken(token : string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  public saveRefreshToken(refreshtoken : string): void {
    this.refreshtoken = refreshtoken;
    localStorage.setItem('refresh_token', refreshtoken);
  }

  public loadToken() : void{
      this.token = localStorage.getItem("access_token");
  }

  public loadRefreshToken() : void{
    this.refreshtoken = localStorage.getItem("refresh_token");
  }

  public getToken() : string{
      return this.token;
  }

  public getRefreshToken() : string{
    return this.refreshtoken;
  }

  public addUserRoleToLocalCache() : void{
    let payload = JSON.parse(atob(this.token.split('.')[1]))
    localStorage.setItem('role',payload["roles"][0]);
}

public isLoggedIn(): boolean {
  this.loadToken();
  if((this.token != null && this.token !== '') && ((this.jwtHelper.decodeToken(this.token).sub != null || '') && !this.jwtHelper.isTokenExpired(this.token))){
        this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
        return true;
  }else{

    this.logOut();
    return false;
  }
}

public logOut(): void{
  this.token = null;
  this.loggedInUsername = null;
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
    
}
