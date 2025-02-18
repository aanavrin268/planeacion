import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-q1-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './q1-table.component.html',
  styleUrl: './q1-table.component.scss'
})
export class Q1TableComponent implements OnInit {

  protected headers = [
    {id: 1, title: 'enero'},   
    {id: 2, title: 'febrero'},
    {id: 3, title: 'marzo'}, 
  ];


  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

  constructor(private service: ApiService){}



  ngOnInit(): void {

    this.displayedColumns = this.headers.map(header => header.title.toLowerCase().replace(' ', ''));

    this.service.getDetallesPlan().subscribe(
      {
        next:(data) => {
          this.dataSource.data = this.formatData(data);
        }
      }
    )



  }



  formatData(response: any[]): any[] {
    return response.map(item => {
      return {
        clave: item['clave institucional'],
        proveedor: item['Proveedor'],
        descripcion: item['Descripción'],
        conjuntos: item['CONJUNTOS'],
        enero: item['Enero F'],
        febrero: item['Febrero F'],
        marzo: item['Marzo F'],
        totalTrimestre: item['Total Trimestre'],
        eneroM: item['Enero M'],
        febreroM: item['Febrero M'],
        marzoM: item['Marzo M'],
        totalMontoVentaTrimestre: item['Total Monto en Venta Trimestre'],
        piezasDisponibles: item['TOTAL Piezas Disponibles'],
      };
    });
  }



}
