import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.get<T>(`${environment.api_url}${url}`, { headers: this.headers, params });
    }

    post<T>(url: string, params: HttpParams = new HttpParams(), data: Object = {}): Observable<T> {
      return this.http.post<T>(`${environment.api_url}${url}`, JSON.stringify(data), { headers: this.headers, params });
    }

    get headers(): HttpHeaders {
        const headersConfig = {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };

        return new HttpHeaders(headersConfig);
    }
}
