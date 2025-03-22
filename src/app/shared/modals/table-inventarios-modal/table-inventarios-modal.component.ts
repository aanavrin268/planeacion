import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table-inventarios-modal',
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table-inventarios-modal.component.html',
  styleUrl: './table-inventarios-modal.component.scss'
})
export class TableInventariosModalComponent implements OnInit {
  
  protected data: any;

  protected displayedColumns: string[] = [];
  protected dataSource = new MatTableDataSource<any>();



  constructor(private active: NgbActiveModal){
    

  }

  ngOnInit(): void {
    console.log("fetch: ", this.data);

    this.displayedColumns = this.data.displayedColumns;
    this.dataSource = new MatTableDataSource(this.data.dataSource);
  }


  close(){
    this.active.close();
  }


}
