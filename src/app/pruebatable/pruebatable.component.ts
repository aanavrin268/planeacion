import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import interact from 'interactjs';
import { PlanService } from '../modules/planificacion/services/plan.service';
import { PlanState } from '../modules/planificacion/store/plan.state';
import { Column, Group, InfoPivote } from '../modules/planificacion/models/plan.model';
import { PlanDataService } from '../modules/planificacion/services/plan-data.service';
import { MainTableComponent } from '../modules/planificacion/components/main-table/main-table.component';
import { MainComparativaComponent } from "../modules/planificacion/pages/main-comparativa/main-comparativa.component";



@Component({
  selector: 'app-pruebatable',
  standalone: true,
  imports: [CommonModule, FormsModule, MainTableComponent],
  templateUrl: './pruebatable.component.html',
  styleUrls: ['./pruebatable.component.scss']
})
export class PruebatableComponent implements AfterViewInit, OnInit {
  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef<HTMLDivElement>;

  protected columns: Column[] = [];

  /*
  columns: Column[] = [
    { key: 'name', header: 'Nombre', width: 200 , visible: true },
    { key: 'january', header: 'Enero', width: 100 , visible: true},
    { key: 'february', header: 'Febrero', width: 100, visible: true },
    { key: 'march', header: 'Marzo', width: 100 , visible: true},
    { key: 'april', header: 'Abril', width: 100, visible: true },
    { key: 'may', header: 'Mayo', width: 100 , visible: true},
    { key: 'june', header: 'Junio', width: 100 , visible: true},
    { key: 'july', header: 'Julio', width: 100 , visible: true},
    { key: 'augost', header: 'Agosto', width: 100, visible: true },
    { key: 'september', header: 'Septiembre', width: 100 , visible: true},

  ];

  */


  data: InfoPivote[] = []; // Usa el tipo correcto en lugar de RowData[]

  /*
  data: RowData[] = [
    { name: 'Tacrolimus', january: 100, february: 200, march: 300, april: 300, may: 500, june: 100,
      july: 100, augost: 200, september: 1000
     },
    { name: 'Busulfan', january: 150, february: 250, march: 350, april: 300, may: 500, june: 100,
      july: 100, augost: 200, september: 1000
     }
  ];

  */

  groups: Group[] = [
    { label: 'Primer Trimestre', colspan: 3, startColumn: 'january', endColumn: 'march' },
    { label: 'Segundo Trimestre', colspan: 3, startColumn: 'april', endColumn: 'june' },
    { label: 'Tercer Trimestre', colspan: 3, startColumn: 'july', endColumn: 'september' },

  ];

  headerColor = '#f0f0f0';
  groupColor = 'rgb(233, 74, 74)';

  protected list_plans: any[] = [];
  protected list_plan_views: any[] = [];
  protected list_plan_times: any[] =[];
  protected main_menu_list: any[] =[];

  protected isMainMenuOptSelected: boolean;
  protected mainMenuIdSelected: number;
  protected isDropdownHideOpen: boolean;

  protected plans$: any;
  protected loading$: any;
  protected error$: any;




  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef, private planService: PlanService, private planState: PlanState,
      private planDataService: PlanDataService,  private statePlan: PlanState
  ) {
    this.list_plans = [
      {idP: 1, name: 'plan_moderado'},  {idP: 2, name: 'plan_escalado'},

    ]

    this.list_plan_views = [
      {idV: 1, name: 'Crear nueva'},  {idV: 2, name: 'Por unidades'},

    ];

    this.list_plan_times = [
      {idT: 1, name: 'Anual'},  {idT: 2, name: 'Mensual'}, {idT: 3, name: 'Semanal'}, 
 

    ];

    this.main_menu_list = [
      {idT: 1, name: 'Inventario'},  {idT: 2, name: 'Columnas'}, {idT: 3, name: 'Opciones'}, 
      {idT: 4, name: 'Datos'},{idT: 5, name: 'Buscar'},
 

    ];

    this.isMainMenuOptSelected = false;
    this.mainMenuIdSelected = 0;
    this.isDropdownHideOpen = false;
  }


  ngOnInit(): void {

    this.plans$ = this.planState.plans$;
    this.loading$ = this.planState.loading$;
    this.error$ = this.planState.error$;

    this.statePlan.loadPlans().subscribe(
      {
        next:(response) => {
          console.log("response desde el MAIN MENU", response);

          this.planDataService.setCurrentPlan(response[0]);
        }
      }
    );


    this.planDataService.currentPlan$.subscribe(
      {
        next:(data) => {
          console.log("El plan acutal desde main menu es: ", data);

          this.data = data.info;
          this.generateColumnsFromData(this.data[0]);

        }
      }
    );

    


    /*
    this.planState.loadPlans().subscribe(
      {
        next:(data) => {


          console.log("FETCHE DATA", data[0]);

          this.planDataService.setCurrentPlan(data[0]);

          this.planDataService.currentPlan$.subscribe(
            {
              next:(response) => {
                console.log("OBSERVABLE DATA: ", response);
              }
            }
          );


          console.log("PLANES GQL NEW 1:", this.planState.getPlansValue());
          this.data =  data[0].info;
          console.log("la new data es", )

          this.generateColumnsFromData(this.data[0]);
        }
      }
    );


    console.log("after something gql", this.plans$);

    */






    
  }





  generateColumnsFromData(sampleData: any){
    const excludedKeys = ['clave', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 
        'diciembre', 'fac_abril', 'proveedor', 'fac_mayo', 'fac_junio', 'fac_julio', 'fac_agosto', 'fac_septiembre',
        'fac_octubre', 'fac_noviembre', 'fac_diciembre', '__typename'
    ];
    const specialHeaders: { [key: string]: string} = {
      'nombre': 'Nombre',
      'proveedor': 'Proveedor',
      'inventario': 'Inventario',
      'enero': 'Enero',
      'febrero': 'Febrero',
      'marzo': 'Marzo',
      'abril': 'Abril',
      'mayo': 'Mayo',
      'junio': 'Junio',
      'julio': 'Julio',
      'agosto': 'Agosto',
      'septiembre': 'Septiembre',
      'octubre': 'Octubre',
      'noviembre': 'Noviembre',
      'diciembre': 'Diciembre',
      'fac_enero': 'Fac. Enero',
      'fac_febrero': 'Fac. Febrero',
      'fac_marzo': 'Fac. Marzo',
      'fac_abril': 'Fac. Abril'
    }

    this.columns = Object.keys(sampleData)
      .filter(key => !excludedKeys.includes(key))
      .map(key => ({
        key: key,
        header: specialHeaders[key] || this.formatHeader(key),
        width: this.calculateWidth(key),
        visible: true
      }));

      console.log("nuevos columns MAIN MENU", this.columns)

      this.orderColumns();
      this.cdr.detectChanges();
  }

  private orderColumns(){
    const columnOrder = ['nombre', 'proveedor', 'inventario', 'enero', 'febrero' , 'marzo'];
    this.columns.sort((a, b) => {
      const aIndex = columnOrder.indexOf(a.key);
      const bIndex = columnOrder.indexOf(b.key);

      if(aIndex >= 0 && bIndex >= 0) return aIndex - bIndex;
      if(aIndex >= 0) return -1;
      if(bIndex >= 0 ) return 1;

      return a.key.localeCompare(b.key);
    })
  }

  private calculateWidth(key: string):number{
    if(key === 'nombre') return 200;
    if(key === 'proveedor') return 100;
    if(key.startsWith('fac_')) return 80;
    return 100;
  }

  private formatHeader(key: string): string{
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }





  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  ngAfterViewInit(): void {
    console.log("soy el after");

  }

  toggleColumnVisibility(column: Column){
    column.visible = !column.visible;

    this.cdr.detectChanges();

  }

  trackByColumnKey(index: number, column: Column): string {
    return column.key
  }

  get visibleColumns(){
    return this.columns.filter(column => column.visible || column.key === 'name');
  }


  getHiddenColumns(){
    return this.columns.filter(column => !column.visible);
  }

  


isDropdownOpen = false;

toggleHideDropwon(){
  this.isDropdownHideOpen = !this.isDropdownHideOpen;
}

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

closeDropdown() {
  this.isDropdownOpen = false;
}



  onMainMenuOptionSelected(option:any){
    console.log("main manue:", option);

    this.isMainMenuOptSelected = true;
    this.mainMenuIdSelected = option.idT;

  }




  // Determina si una columna es el inicio de un grupo
  isGroupStartColumn(columnKey: string): boolean {
    return !!this.groups.find(g => g.startColumn === columnKey);
  }

  // Determina si una columna pertenece a un grupo
  isGroupColumn(columnKey: string): boolean {
    return !!this.groups.find(g => {
      const startIndex = this.columns.findIndex(c => c.key === g.startColumn);
      const endIndex = this.columns.findIndex(c => c.key === g.endColumn);
      const columnIndex = this.columns.findIndex(c => c.key === columnKey);
      return columnIndex >= startIndex && columnIndex <= endIndex;
    });
  }

  // Obtiene el colspan para una columna de grupo
  getGroupColspan(columnKey: string): number {
    const group = this.groups.find(g => g.startColumn === columnKey);
    return group ? group.colspan : 1;
  }

  // Obtiene el grupo para una columna
  getGroupForColumn(columnKey: string): Group | undefined {
    return this.groups.find(g => g.startColumn === columnKey);
  }

  getFontSize(columnWidth: number): string {
    const baseFontSize = columnWidth / 125;
    return `clamp(0.6rem, ${baseFontSize}rem, 1.2rem)`;
  }

  getGroupFontSize(group: Group | undefined): string {
    if (!group) return '1rem';
    const startIndex = this.columns.findIndex(c => c.key === group.startColumn);
    const endIndex = this.columns.findIndex(c => c.key === group.endColumn);
    const totalWidth = this.columns.slice(startIndex, endIndex + 1)
      .reduce((sum, col) => sum + col.width, 0);
    const baseFontSize = totalWidth / 100;
    return `clamp(0.8rem, ${baseFontSize}rem, 1.5rem)`;
  }
}





/*
  trazabiidad factura pt
  OCR para factueas
  proceso de convertido de monedas
  catalogo de frozen times
  catalogo costos
  modulo de presupuestos con alertas, en base a importacion,
  productos de imorotacion, ajuste presupeusto en base al ajuste que pueda ocurrer o no,
  bajar pasivos
  sistema de rankeo de prioridades


*/