import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }


  getAllTipoProducto():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/tipo_producto`);
  }

  getAllConjuntos():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/conjuntos`);
  }

  getAllStatus():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/status`);
  }

}
