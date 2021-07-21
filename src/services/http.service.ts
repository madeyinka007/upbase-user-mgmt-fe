import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
<<<<<<< HEAD
  private base_url = 'https://upbase-user-mgmt.herokuapp.com/upbase/api/1.0'
=======
  private base_url = 'http://localhost:43210/upbase/api/1.0'
>>>>>>> 6869c85a5ee88a7731349192acd61a9d4088a8a5

constructor(private httpClient: HttpClient) { }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. Please try again later.');
  }

  post(url:any, data: any): Observable<any>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/JSON'})
    }
    return this.httpClient.post<any>(this.base_url+url, data, options).pipe(catchError(this.handleError))
  }

  get(url:any): Observable<any>{
    return this.httpClient.get<any>(this.base_url+url).pipe(catchError(this.handleError))
  }

  file_post(url:any, data:any): Observable<any>{
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'Application/form-data'})
    }
    return this.httpClient.post<any>(this.base_url+url, data).pipe(catchError(this.handleError))
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
