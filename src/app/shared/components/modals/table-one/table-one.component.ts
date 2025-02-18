import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-one',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './table-one.component.html',
  styleUrl: './table-one.component.scss'
})
export class TableOneComponent implements OnInit {
  

  displayedColumns: string[] = ['id_fecha', 'existencias', 'apartadas', 'disponibles']; 
  dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  product: any;

    constructor(private service: ApiService, private active: NgbActiveModal){}


    ngOnInit(): void {

      this.service.getInventaryByCi(this.product.ID_SISTEMA).subscribe({
        next: (data) => {
          console.log("inv:", data);
          this.dataSource.data = data;
  
          this.dataSource.paginator = this.paginator;
  
          //this.displayedColumns = Object.keys(data[0]);
  
  
        },
        error: (error) => {
          console.error('Error al traer registros de inventarios');
        }
      });
    }


    close(){
      this.active.close();
    }


}
