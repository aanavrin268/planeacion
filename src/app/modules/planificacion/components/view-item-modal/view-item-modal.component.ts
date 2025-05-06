import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-item-modal',
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './view-item-modal.component.html',
  styleUrl: './view-item-modal.component.scss'
})
export class ViewItemModalComponent implements OnInit {
  protected dataSource = new MatTableDataSource();

  protected currentItem: any;
  protected showCostos: boolean;

  protected displayedColumns: any[] = [];

  protected data: any[] =[];


  constructor(private active: NgbActiveModal){
    this.showCostos = false;

    this.data = [
      {
        origen: 550,
        divisa: 'USD',
        MXN: 11049.5,
        importacion: 31.9,
        logistica: 23.6,
        total:13664.06
    }
    ];

    this.displayedColumns = ['origen','divisa','MXN','importacion',
    'logistica', 'total'];

    this.currentItem= {
      clave: '100.100.200.20',
      nombre: 'Tacrolimus',
      origin: 'Importado',
      descripcion: 'Tacrolimus (1mg/50caps)',
      costos:[],
    };
  }


  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(this.data);

  }

  close(){
    this.active.close();
  }

  showInfo(){
    this.showCostos = false;
  }

  showCost(){
    this.showCostos = true;

  }

}
