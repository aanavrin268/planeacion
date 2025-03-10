import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ApiService } from '../../api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPlanListModalComponent } from '../../shared/components/modals/edit-plan-list-modal/edit-plan-list-modal.component';
import { BehaviorsService } from '../../core/services/behaviors.service';


@Component({
  selector: 'app-comparativa',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule,   MatProgressSpinnerModule],
  templateUrl: './comparativa.component.html',
  styleUrl: './comparativa.component.scss'
})
export class ComparativaComponent implements OnInit, AfterViewChecked {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatorC!: MatPaginator;

  protected isPlanSelected: boolean;
  protected showSettingsMenu: boolean;
  protected showLoading: boolean;
  protected selectedPlan: any;

  protected plan_list: any[] = [];
  originalData: any[] = [];
  protected originalDataC: any[] = [];
  protected settings_list_menu: any[] = [];




  dataSource = new MatTableDataSource<any>();  
  protected dataSourceC = new MatTableDataSource<any>();


displayedColumns: string[] = [];
  protected displayedColumnsC: string[] = [];



  constructor(private service: ApiService, private cdr:ChangeDetectorRef, private modal: NgbModal, private behaviorService: BehaviorsService){

    this.settings_list_menu = [{id: 1, title: 'Editar lista'}, {id:2, title: 'Cerrar'}];

    this.showLoading = false;
    this.isPlanSelected = false;
    this.showSettingsMenu = false;
  }

  ngOnInit(): void {
   
    this.displayedColumns = ['clave', 'proveedor', 'descripcion', 'conjuntos', 'enero', 'febrero', 'marzo'];
    this.displayedColumnsC = ['clave', 'proveedor', 'descripcion', 'conjuntos', 'enero', 'febrero', 'marzo'];


    this.getPlaListData();


    this.service.getDetallesPlan().subscribe({
      next:(response) => {
        console.log("plan actual", response);
        const formattedData = this.formatData(response);
        console.log("data to pdf", formattedData);
  
        this.originalData = [...formattedData];
        this.dataSource.data = formattedData;

      }
    })


  
  }


  ngAfterViewChecked(): void {
    if (this.isPlanSelected && this.dataSource && !this.dataSource.paginator && !this.dataSourceC.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSourceC.paginator = this.paginatorC;
      this.cdr.detectChanges(); 
    }


  }


  getPlaListData(){
    this.behaviorService.loadAllPlanhistoricUnion();
    this.behaviorService.planHistoric$.subscribe(
      (data) => {
        this.plan_list = data;
      }
    )
  }

  afterModalClosed(result:any){

    this.service.getAllPlanHistoricUnion().subscribe({
      next:(response)=> {
        console.log("historic", response);
        this.plan_list = response.result;
      }
    });
  }

  openEditList(){
    this.openSettingsMenu();

    const modalRef = this.modal.open(EditPlanListModalComponent, {
      size:'md', 
      centered: true,
      windowClass: 'redondo'
    });

    modalRef.componentInstance.list = this.plan_list;

    modalRef.result.then(
      (result) => {

      },
      (reason) => {

      }
    );
  }


  onSettingsSelected(item:any){
    switch(item.id){
      case 1:
        this.openEditList();
        break;
      case 2:
          this.openSettingsMenu();
        break;
    }
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

  openSettingsMenu(){
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  closeSelected(){
    Swal.fire({
      title:'Atención!',
      text:'¿Cerrar la comparación actual?',
      icon:'question',
      showCancelButton: true,
      confirmButtonText:'Si, cerrar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      focusCancel: true,
      
    }).then((result) => {
      if(result.isConfirmed){
        this.isPlanSelected = false;

        this.dataSourceC.data = [];

      }else if(result.isDismissed){

      }
    })
  }

  isDifferent(row1: any, row2: any, column: string): boolean {
    return row1[column] !== row2[column];
}

selectPlan(plan: any) {
  this.selectedPlan = plan;
  this.showLoading = true;



  console.log("plan seleccionado", plan);

  Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espera un momento.',
      allowOutsideClick: false,
      didOpen: () => {
          Swal.showLoading(); 
          //cargar los datos de la actual table
          
      this.service.getPlanSelectedByName(plan.name).subscribe({
        next:(response) => {
          console.log("selected plan data from api is", response.result[0]);

          //const formattedData = this.formatData(response.result[0]);
          //console.log("data to pdf", formattedData);
    
          this.originalDataC = [...response.result[0]];
          this.dataSourceC.data = response.result[0];
        }
      })

          //cargar los datos del seleccionado
      }
  });

  setTimeout(() => {
      Swal.close();

      this.isPlanSelected = true;
      

      this.showLoading = false;
  }, 600); 
}

}
