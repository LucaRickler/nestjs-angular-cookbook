import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(environment.webApiBaseURL + url);
  }

  public post<T, K>(url: string, body: K): Observable<T> {
    return this.http.post<T>(environment.webApiBaseURL + url, body);
  }

  public put<T, K>(url: string, body: K): Observable<T> {
    return this.http.put<T>(environment.webApiBaseURL + url, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(environment.webApiBaseURL + url);
  }
}
