import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from '../shared/components/modals/edit-modal/edit-modal.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditManyModalsComponent } from '../shared/components/modals/edit-many-modals/edit-many-modals.component';
import { jsPDF } from 'jspdf';

import 'jspdf-autotable'; 
import { FichaTecnicaComponent } from '../producto/ficha-tecnica/ficha-tecnica.component';
import { ProductService } from '../core/services/product.service';



@Component({
  selector: 'app-quatri',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './quatri.component.html',
  styleUrls: ['./quatri.component.scss']
})
export class QuatriComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  protected first_quarter: string[] = ['Enero', 'Febrero', 'Marzo'];
  protected second_quarter: string[] = ['Abril', 'Mayo', 'Junio'];
  protected third_quarter: string[] = ['Julio', 'Agosto', 'Septiembre'];
  protected fourth_quarter: string[] = ['Octubre', 'Noviembre', 'Diciembre'];

  protected time_list = [
    {id: 1, name: 'dia'}, {id: 2, name: 'semana'}, {id: 3, name: 'mes'},
  ];

  protected number_list = [
    {id:1, value: 1}, {id:2, value: 2}, {id:3, value: 3}, {id:4, value: 4}, {id:5, value: 5}, {id:6, value: 6},
  ];

  public data: any[] = [];  
  public days: string[] = [];  
  protected ranges: any[] = [];
  protected years: any[] = [];

  protected selectedRow : any;

  protected showMenu: boolean = false;
  

  protected groupedByYearAndQuarter: any[] = [];
  numberVal!: number;

  protected today!: Date;

  protected initMonth!: number;
  protected endMonth!: number;

  protected number_listt:any[] = [
    1, 2, 3, 4
  ];

  protected headers = [
    {id: 1, title: 'seleccionar'},   
    {id: 2, title: 'clave'},   
    {id: 3, title: 'Proveedor'},
    {id: 4, title: 'descripcion'}, 
    {id: 5, title: 'conjuntos'},
  ];

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

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();  

  displayedColumnsRight: string[] = [];
  dataSourceRight: any[] = [];
  public dataRight: any[] = [];
  
  trimestreAgrupado: any[] = [];
  trimestres: any[] = [];

  filteredQs: any[] = [];
  limits: number;


  filteredData: any[] = [];
  searchText: string = '';
  originalData: any[] = [];

  protected selected_rows: any[] = [];

  menuTop: number = 0;
  menuLeft: number = 0;

  protected menu_lists: any[] = [
    {id:1, title:'Ver producto'},
    {id:2, title:'Editar información'},
    {id:3, title:'Cancelar'},

  ]

  constructor(private router: Router, private service: ApiService, private modal: NgbModal, private proService: ProductService) {
    this.limits = 1;
  }

  ngOnInit() {
    
    this.showDRows();
    this.today = new Date();
    console.log('hoy es: ', this.today);

  }

  goToFicha(row: any){
    this.proService.setProduct(row);
    this.router.navigate(['/ficha']);



    /*
    const modalRef = this.modal.open(FichaTecnicaComponent, {
      centered: true,
      size:'lg'
    });

    modalRef.componentInstance.data = row;

    */
  }



  generatePDFT(data: any[]) {
    data = this.dataSource.data;


    const doc = new jsPDF();

    const headers = ['Clave', 'Proveedor', 'Descripción', 'Conjuntos', 'Enero', 'Febrero', 'Marzo', 
                    'Piezas Disponibles'];

    const tableData = data.map(item => [
      item.clave, item.proveedor, item.descripcion, item.conjuntos, item.enero, item.febrero, item.marzo,
      item.abril, item.mayo, item.junio, item.julio, item.agosto, item.septiembre, item.octubre,
      item.noviembre, item.diciembre, item.totalTrimestre, item.eneroM, item.febreroM, item.marzoM,
      item.totalMontoVentaTrimestre, item.piezasDisponibles
    ]);

    (doc as any).autoTable({
      head: [headers], 
      body: tableData, 
      theme: 'striped', 
      styles: { fontSize: 10, cellPadding: 2 },
    });

    doc.save('tabla_datos.pdf');
  }


  generatePDF() {
    var columns = ['ID', 'Country', 'Rank', 'Capital'];
    var data = [
      [1, 'Denmark', 7.526, 'Copenhagen'],
      [2, 'Switzerland', 7.509, 'Bern'],
      [3, 'Iceland', 7.501, 'Reykjavík'],
      [4, 'Norway', 7.498, 'Oslo'],
      [5, 'Finland', 7.413, 'Helsinki'],
    ];
    var doc = new jsPDF();

    (doc as any).autoTable(columns, data);
    doc.save('angular-demo.pdf');
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
  

  closeEditMany(){
    this.selected_rows = [];
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


  add_newRow(row: any){
    this.selected_rows.push(row);

    console.log(this.selected_rows.length);
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
  
  

  closeMenu(): void {
    this.showMenu = false;
  }


  onChange(event: any) {

    this.limits = Number(event.target.value);
    console.log('limits:', this.limits);
    this.showDRows();
  }

  showDRows(){
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
        this.dataSource.paginator = this.paginator;
        this.filteredData = [...this.dataSource.data];
      }
    });
  }

  filterData(): void {
    if (this.searchText.trim()) {
      this.filteredData = this.originalData.filter(item => {
        return Object.values(item).some(val =>
          String(val).toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    } else {
      this.filteredData = [...this.originalData];
    }
  
    this.dataSource.data = this.filteredData;
  }



  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
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



  goToQs() {
    this.router.navigate(['/test']);
  }

 
}
