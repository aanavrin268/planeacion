import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { TableOneComponent } from '../../shared/components/modals/table-one/table-one.component';
import { InventarioComponent } from '../../shared/components/semi/inventario/inventario.component';


@Component({
  selector: 'app-details',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule, InventarioComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  

  protected product: any;
  protected activate: boolean;
  protected hideMenu: boolean;

  displayedColumns: string[] = ['id_fecha', 'existencias', 'apartadas', 'disponibles']; 
   dataSource = new MatTableDataSource<any>();

  protected menu_options:any[] = [
    {id:1, title:'Inventario', isActivate: false },
    {id:2, title: 'ventas', isActivate: false },
    {id:2, title: 'Arribos', isActivate: false }

  ];

  protected inventary_options:any[] = [
    {id: 1, title:'Historico'},
    {id: 2, title:'Por periodo'}

  ];


  constructor(private active: NgbActiveModal, private service: ApiService, private modal: NgbModal) {
    this.activate = false;
    this.hideMenu = false;
   }

  ngOnInit(): void {

    console.log("recibido", this.product);

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


  selectedSubOption(option:any){
    console.log(option);

 

    if(option.id == 1){
      const modalRef = this.modal.open(TableOneComponent, {
        centered: true,
        size: 'lg'
      });
  
      modalRef.componentInstance.product = this.product;
    }
  }


  growMenu(item:any){
    //this.activate = true;
    this.hideMenu = !this.hideMenu;
    this.menu_options.forEach(item => item.isActive = false);
    
    // Activa solo el elemento clickeado
    item.isActive = true;
  }





  close(){
    this.active.close();
  }

}
