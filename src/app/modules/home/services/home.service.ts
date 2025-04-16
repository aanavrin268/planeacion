import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:3000'; 


  constructor(private http: HttpClient) { }

  getPrincipalPrivate():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/getPrincipalPrivate`);
  }


  getPrincipalPublic():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/api/getPrincipalPublic`);
  }

  getTop3Providers(t_name: string): Observable<any>{
    const payload = {t_name: t_name}

    return this.http.post(`${this.apiUrl}/api/getTop3`, 
      payload,
      { headers: new HttpHeaders ({'Content-Type': 'application/json'})}
    )
  }

}