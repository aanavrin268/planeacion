import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-table',
  imports: [CommonModule, MatTableModule],
  templateUrl: './home-table.component.html',
  styleUrl: './home-table.component.scss'
})
export class HomeTableComponent implements OnInit {

  bundle: any;
  data_list: any[] = [];

  dataSource = new MatTableDataSource<any>();
  displayedColumns: any[] = [];


  constructor(private active: NgbActiveModal){
    this.displayedColumns= ['PROVEEDORES', 'PIEZAS', 'MONTO'];
    //this.displayedColumnsCliente= ['CLIENTES', 'PIEZAS', 'MONTO'];
  }


  ngOnInit(): void {

    console.log("bundle received", this.bundle);

    this.data_list = this.bundle.data;

    this.dataSource = new MatTableDataSource(this.data_list);

  }

  close(){
    this.active.close();
  }

}
