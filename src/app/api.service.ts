import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ApiService {

  private apiUrl = 'http://localhost:3000'; 
  private baseUrl: string = 'http://localhost:3000/exec';  
  private apiUrlU = 'http://localhost:3000/update-table';
  private api3=  'http://localhost:3000/update-detalleplan';


  constructor(private http: HttpClient) { }


  getInventaryByCi(clave_ins: any):Observable<any>{
    let body = {"clave_ins": clave_ins};

    return this.http.post<any>(`${this.apiUrl}/inventary`, body);
  }


  getAllProducts():Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/getAllProducts`)
  }


    actualizarDetallePlan(table: string, condition: string, condition_value: string, months: string): Observable<any> {
      const payload = {
        table: table,
        condition: condition,
        condition_value: condition_value,
        months: months
      };
  
      return this.http.post(this.api3, payload, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }


  updateTable(table: string, field: string, value: string, condition: string, condition_value: string): Observable<any> {
    const body = {
      table: table,
      field: field,
      value: value,
      condition: condition,
      condition_value: condition_value
    };


    return this.http.post<any>(this.apiUrlU, body);
  }


  getDetallesPlan(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getDetallesPlan`); 
  }



  getRangesDay(rangoFin: number): Observable<any> {
    const url = `${this.baseUrl}/${rangoFin}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const today = new Date();
        
        let futureDates = [];
        let pastDates = [];
  
        const todayFormatted = this.formatDate(today);
  
        for (let i = 1; i <= rangoFin; i++) {
          const futureDate = new Date(today);
          futureDate.setDate(today.getDate() + i);
          futureDates.push(this.formatDate(futureDate));
        }
  
        for (let i = 1; i <= 3; i++) {
          const pastDate = new Date(today);
          pastDate.setDate(today.getDate() - i);
          pastDates.push(this.formatDate(pastDate));
        }
  
        const allDates = [...pastDates.reverse(), todayFormatted, ...futureDates];
  
        return response.map((item: { [x: string]: any; descripcionProducto: any; }) => {
          const dias = allDates.map(date => ({
            date,
            value: item[date] || 0  
          }));
  
          return {
            description: item.descripcionProducto,
            dias
          };
        });
      })
    );
  }
  
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `DÍA ${year}-${month}-${day}`;
  }
  

  getQuesos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quesos`); 
  }


}
