import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditManyModalsComponent } from '../edit-many-modals/edit-many-modals.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../api.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';


@Component({
  selector: 'app-modal-plan-view',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './modal-plan-view.component.html',
  styleUrl: './modal-plan-view.component.scss'
})
export class ModalPlanViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  protected first_quarter: string[] = ['Enero', 'Febrero', 'Marzo'];
  protected second_quarter: string[] = ['Abril', 'Mayo', 'Junio'];
  protected third_quarter: string[] = ['Julio', 'Agosto', 'Septiembre'];
  protected fourth_quarter: string[] = ['Octubre', 'Noviembre', 'Diciembre'];

  protected selectedRow : any;
  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<any>();  

  limits: number;
  protected showMenu: boolean = false;


  public data: any[] = [];  

  protected selected_rows: any[] = [];

  menuTop: number = 0;
  menuLeft: number = 0;

  
  filteredData: any[] = [];
  searchText: string = '';
  originalData: any[] = [];

  protected headersQ1 = [
    {id: 1, title: 'enero'},   
    {id: 2, title: 'febrero'},
    {id: 3, title: 'marzo'},
  ];

  protected headersQ2 = [
    {id: 1, title: 'abril'},   
    {id: 2, title: 'mayo'},
    {id: 3, title: 'junio'},
  ];

  protected headersQ3 = [
    {id: 1, title: 'julio'},   
    {id: 2, title: 'agosto'},
    {id: 3, title: 'septiembre'}
  ];

  protected headersQ4 = [
    {id: 1, title: 'octubre'},   
    {id: 2, title: 'noviembre'},
    {id: 3, title: 'diciembre'}
  ];

  protected menu_lists: any[] = [
    {id:1, title:'Ver producto'},
    {id:2, title:'Editar información'},
    {id:3, title:'Cancelar'},

  ]

  protected headers = [
    {id: 1, title: 'seleccionar'},   
    {id: 2, title: 'clave'},   
    {id: 3, title: 'Proveedor'},
    {id: 4, title: 'descripcion'}, 
    {id: 5, title: 'conjuntos'},
  ];


  constructor(private modal: NgbModal, private service: ApiService){
    this.limits = 1;

  }


  
  ngAfterViewInit(): void {
    // Añade un pequeño retraso para asegurar que el DOM del modal esté completamente renderizado
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        
        // Fuerza la detección de cambios en el paginador
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    }, 100);
  }
  ngOnInit(): void {
    this.showDRows();

  }

  showDRows() {
    let newHeaders: any[] = [];
    if (this.limits === 1) {
      newHeaders = this.headersQ1;
    } else if (this.limits === 2) {
      newHeaders = this.headersQ1.concat(this.headersQ2);
    } else if (this.limits === 3) {
      newHeaders = this.headersQ1.concat(this.headersQ2).concat(this.headersQ3);
    } else if (this.limits === 4) {
      newHeaders = this.headersQ1.concat(this.headersQ2).concat(this.headersQ3).concat(this.headersQ4);
    }
  
    const allHeaders = this.headers.concat(newHeaders);
  
    this.headers = Array.from(
      new Map(allHeaders.map(header => [header.title, header])).values()
    );
  
    this.displayedColumns = this.headers.map(header => 
      header.title.toLowerCase().replace(' ', '')
    );
  
    this.service.getDetallesPlan().subscribe({
      next: (response) => {
        const formattedData = this.formatData(response);
        console.log("data to pdf", formattedData);
  
        this.originalData = [...formattedData];
        this.dataSource.data = formattedData;
  
        // Asigna el paginador después de cargar los datos
  
        this.filteredData = [...this.dataSource.data];

        //this.dataSource.paginator = this.paginator;

      }
    });
  }


  afterModalClosed(result: any) {
    this.service.getDetallesPlan().subscribe(
      {
        next: (response) => {
          console.log('Response:', response); 
          this.data = response; 

          this.dataSource.data = this.formatData(response);  
        }
      });
  }

    onRowClick(row: any): void {
  
  
      const modalRef = this.modal.open(EditModalComponent, {
        centered: true,
        size: 'lg',
        windowClass:'rounded'
      });
      modalRef.componentInstance.row = row;
  
  
      modalRef.result.then(
        (result) => {
          this.afterModalClosed(result);
        },
        (reason) => {
          this.afterModalClosed(reason);
        }
      );
  
  
    }
  

  goToFicha(row: any){
    //this.proService.setProduct(row);
    //this.router.navigate(['/ficha']);



    /*
    const modalRef = this.modal.open(FichaTecnicaComponent, {
      centered: true,
      size:'lg'
    });

    modalRef.componentInstance.data = row;

    */
  }



  chooseOption(id: number){

    switch(id){
      case 1: 
          this.goToFicha(this.selectedRow);
          this.showMenu = !this.showMenu;
          break;
      case 2:
        this.onRowClick(this.selectedRow);
         this.showMenu = !this.showMenu;
          break;
      case 3:
        //this.add_newRow(this.selectedRow);
        this.showMenu = !this.showMenu;
        break;
      default:
          break;
    }
        
  }


  openMenu(event: MouseEvent, row: any): void {
    this.selectedRow = row;
    event.preventDefault();
  
    const clickedRow = event.target as HTMLElement;
    
    const rowPosition = clickedRow.getBoundingClientRect().top;
  
    const tableOffset = (clickedRow.closest('table') as HTMLElement).getBoundingClientRect().top;
  
    this.menuTop = rowPosition - tableOffset + clickedRow.clientHeight; 
    this.menuLeft = event.clientX;
  
    this.showMenu = true;
  
    //console.log('Posición del menú:', this.menuTop, this.menuLeft);
    //console.log('Fila seleccionada:', row);
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
        abril: item['Abril F'],
        mayo: item['Mayo F'],
        junio: item['Junio F'],
        julio: item['Julio F'],
        agosto: item['Agosto F'],
        septiembre: item['Septiembre F'],
        octubre: item['Octubre F'],
        noviembre: item['Noviembre F'],
        diciembre: item['Diciembre F'],
        totalTrimestre: item['Total Trimestre'],
        eneroM: item['Enero M'],
        febreroM: item['Febrero M'],
        marzoM: item['Marzo M'],
        totalMontoVentaTrimestre: item['Total Monto en Venta Trimestre'],
        piezasDisponibles: item['TOTAL Piezas Disponibles'],
      };
    });
  }



  onCheckboxChange(element: any): void {
    //console.log('Checkbox state changed for element:', element);

    
    if (element.selected) {
      //console.log('Elemento seleccionado:', element);
      this.selected_rows.push(element);


    } else {
      //console.log('Elemento deseleccionado:', element);
    }

  }





   editMany(){
  
      const many_rows = this.selected_rows;
      this.selected_rows = [];
  
      many_rows.forEach((element: any) => {
        element.selected = false; 
      });
      const modalRef = this.modal.open(EditManyModalsComponent, {
        centered: true,
        size: 'xl',
        windowClass: 'rounded'
      });
  
      modalRef.componentInstance.rows = many_rows;
  
    }
  


  closeEditMany(){
    this.selected_rows = [];
  }


}
