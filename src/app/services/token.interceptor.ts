import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  refresh = false;
  public refreshhost = environment.apiUrl + "token/refresh";

  constructor(private authenticationService: AuthenticationService,private router: Router, private http: HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //for login
    if (request.url.includes(`${this.authenticationService.host}`)) {
      return next.handle(request);
    }

    if (request.url.includes(`${environment.apiUrl+"sector/"}`) || 
    request.url.includes(`${environment.apiUrl+"organization/all"}`) || 
    request.url.includes(`${environment.apiUrl+"api/users"}`)) {
      return next.handle(request);
    }

    

    //for requesting refresh token
    if(request.url.includes(`${this.authenticationService.refreshHost}`)){
      this.authenticationService.loadRefreshToken();
      const refreshtoken = this.authenticationService.getRefreshToken();
      const tokenizedReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${refreshtoken}`
        }

      })
      return next.handle(tokenizedReq);
    }

    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();

    const tokenizedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }

    })

    return next.handle(tokenizedReq).pipe(catchError((err: HttpErrorResponse) => {
      console.log(err)
      if (err.status === 401 && err.url.includes("trainingModes") && err.error["message"]!="No message available"){
        alert("Impossible de supprimer le mode alors qu'il est affecté à une action ou sujet")
      }
      else if (err.status === 401 && !this.refresh && err.error["message"]=="No message available") {
        this.refresh = true;
        return this.http.post<HttpResponse<any> | HttpErrorResponse | any>(`${this.refreshhost}`,{observe: 'response'}).pipe(
          switchMap((response: any) => {
            const token = response["access_token"];
            localStorage.removeItem("access_token")
            this.authenticationService.saveToken(token);
            this.refresh = false;
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            }))
          }),catchError(
            err=>{
              this.authenticationService.expiredMsg = "La session a expiré. Reconnectez-vous."
              this.router.navigateByUrl(`/login`);
              return throwError(() => err)
            }
          )
        )
      }
      else if (err.status === 403) {
        this.router.navigateByUrl(`/access`);
      }
      else if (err.status === 405) {
        alert("Entrée Incorrecte")
      }
      else if (err.status === 415) {
        alert("415 - type de média non supporté")
      }
      else if (err.status === 404) {
        alert("404 - element n'existe pas ")
      }
      else if (err.status === 413) {
        alert("413 - fichier trop volumineux ")
      }
      else if(err.status === 500){
        alert("500 - Erreur interne du serveur ")
      }
      else if(err.status === 503){
        alert("503 - Service indisponible ")
      }

      return throwError(() => err)
    }));
  }
}
