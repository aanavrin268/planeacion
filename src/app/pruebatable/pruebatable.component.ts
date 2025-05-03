import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import interact from 'interactjs';
import { PlanService } from '../modules/planificacion/services/plan.service';
import { PlanState } from '../modules/planificacion/store/plan.state';
import { Column, Group, InfoPivote, PlanAllDetails, ViewTable } from '../modules/planificacion/models/plan.model';
import { PlanDataService } from '../modules/planificacion/services/plan-data.service';
import { MainTableComponent } from '../modules/planificacion/components/main-table/main-table.component';
import { MainComparativaComponent } from "../modules/planificacion/pages/main-comparativa/main-comparativa.component";
import { map, Observable } from 'rxjs';
import { RibbonInformationComponent } from '../modules/planificacion/components/ribbon-information/ribbon-information.component';
import { RibbonDataComponent } from '../modules/planificacion/components/ribbon-data/ribbon-data.component';
import { EditTableComponent } from '../modules/planificacion/components/edit-table/edit-table.component';
import { RibbonColumnsComponent } from '../modules/planificacion/components/ribbon-columns/ribbon-columns.component';
import { parse } from 'graphql';



@Component({
  selector: 'app-pruebatable',
  standalone: true,
  imports: [CommonModule, FormsModule, MainTableComponent, RibbonInformationComponent, RibbonDataComponent, EditTableComponent, RibbonColumnsComponent],
  templateUrl: './pruebatable.component.html',
  styleUrls: ['./pruebatable.component.scss']
})
export class PruebatableComponent implements OnInit {

  protected columns: Column[] = [];
  data: InfoPivote[] = []; 

  protected list_plans: any[] = [];
  protected list_plan_views: any[] = [];
  protected list_plan_times: any[] =[];
  protected main_menu_list: any[] =[];

  protected isMainMenuOptSelected: boolean;
  protected mainMenuIdSelected: number;
  protected isDropdownHideOpen: boolean;
  protected editMode: boolean;

  protected columns$: Observable<Column[]> = new Observable<Column[]>();

  visibleColumnss$: Observable<Column[]>;
  hiddenColumnss$: Observable<Column[]>;

  protected currentData: PlanAllDetails;

  protected list_plan_names: any[] = [];
  protected rxView_list: ViewTable[] = [];


  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef, private planService: PlanService, private planState: PlanState,
      private planDataService: PlanDataService,  private statePlan: PlanState
  ) {

    this.editMode = false;

    this.currentData = {
      id_plan: 0,
      nombre: '',
      tipo: 0,
      categoria: 0,
      estado: 0,
      updatedAt: '',
      descripcion: '',
      info: [{} as InfoPivote],
    };

    this.visibleColumnss$ = this.columns$.pipe(
      map((columns: Column[]) => columns.filter((col: { visible: any; }) => col.visible))
    );

    this.hiddenColumnss$ = this.columns$.pipe(
      map(columns => columns.filter((col: { visible: any; }) => !col.visible))
    );



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
      {idT: 1, name: 'Información'},  {idT: 2, name: 'Columnas'}, {idT: 3, name: 'Opciones'}, 
      {idT: 4, name: 'Datos'},{idT: 5, name: 'Buscar'},
 

    ];

    this.isMainMenuOptSelected = false;
    this.mainMenuIdSelected = 0;
    this.isDropdownHideOpen = false;
  }


  ngOnInit(): void {
    this.rxView_list = this.planDataService.views_array;


    const localViewsData = localStorage.getItem('localViews');

    if(localViewsData){
      const parsedData = JSON.parse(localViewsData);

      console.log("la paresed data", parsedData);


      let currentId = this.rxView_list[this.rxView_list.length - 1].id;

      const updatedLocalViews = parsedData.map((view:any, index: number) => ({
        ...view,
        id: currentId + 1 + index
      }))

      console.log("Datos actualizados con nuevos IDs:", updatedLocalViews);


      this.rxView_list = [...this.rxView_list, ...updatedLocalViews];
      //this.rxView_list = this.planDataService.views_array;




    }else {
      console.warn("no hay views locales guardas");

    }

    this.planState.isEditing$.subscribe(
      {
        next:(data) => {
          this.editMode = data;
          console.log("desde MAIN MENU EDIT MODE:", this.editMode);
        }
      }
    );

    /*
    this.planService.getJustPlanesByTypeGql(1).subscribe({
      next:(response) => {
        console.log("response de plan_name_list ", response);
        this.list_plan_names = response.map((p) => ({
          id_plan: p.id_plan,
          nombre: p.nombre
        }));

        console.log("mapeo de nombres:", this.list_plan_names);
      }
    })
      */

    this.list_plan_names = [{id_plan: 1, nombre:'Público-dummy v1'}]

    this.loadAndInitData(1);


    
  }

  onViewChange(event: Event){
    let target = event.target as HTMLSelectElement;
    let value = target.value;
    console.log("VIEW CHANFE;", value);


    const selectedView = this.rxView_list.find(view => view.id === Number(value));

    if(selectedView){
      console.log("view encoentrada", selectedView);

      this.planDataService.setCurrentView(selectedView);
    }else {
      console.error("view no encioenteada", selectedView);
    }


    //this.planDataService.setCurrentView()

  }


  onChangePlanName(event: Event){
    let datas = event.target as HTMLSelectElement;
    let value = Number(datas.value);

    console.log("on select id", value);

    this.loadAndInitData(value);

    
    
  }


  loadAndInitData(id_plan: number){
    this.statePlan.loadPlans(id_plan).subscribe(
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
          this.currentData = data;

          console.log("LA CURRENT DATA ES: ", this.currentData);
          this.data = data.info;
        }
      }
    );   
    
    this.columns$ = this.planDataService.currentColumns$;





  }





  toggleColumnVisibility(column: Column){
   // column.visible = !column.visible;

   this.planDataService.toggleColumnVisibilityx(column.key);

    this.cdr.detectChanges();

  }

  get visibleColumns$(): Observable<Column[]> {
    return this.columns$.pipe(
      map((columns: Column[]) => columns.filter((col: { visible: any; key: string; }) => col.visible || col.key === 'name'))
    );
  }

  get hiddenColumns$(): Observable<Column[]> {
    return this.columns$.pipe(
      map((columns: Column[]) => columns.filter((col: { visible: any; }) => !col.visible))
    );
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






}





