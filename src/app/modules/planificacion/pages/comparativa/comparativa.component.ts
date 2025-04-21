import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPlanListModalComponent } from '../../../../shared/components/modals/edit-plan-list-modal/edit-plan-list-modal.component';
import { BehaviorsService } from '../../../../core/services/behaviors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-comparativa',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule,   MatProgressSpinnerModule, MatExpansionModule],
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

  protected id: any;
  protected difference_text: string;

  protected plan_list: any[] = [];
  protected differencesArray: any[] = [];
  originalData: any[] = [];
  protected originalDataC: any[] = [];
  protected settings_list_menu: any[] = [];
  protected filteredData: any[] = [];

  protected selected_plan_list: any[] = [];


  protected dummy_list: any[] = [
    {id:1, name: 'plan_version1', selected: false, data:[]},    {id:2, name: 'plan_version2', selected: false, data:[]},
    {id:3, name: 'plan_version3', selected: false, data:[]},    {id:4, name: 'plan_version4', selected: false, data:[]},
  ];



  dataSource = new MatTableDataSource<any>();  
  protected dataSourceC = new MatTableDataSource<any>();


displayedColumns: string[] = [];
  protected displayedColumnsC: string[] = [];



  constructor(private service: ApiService, private cdr:ChangeDetectorRef, private modal: NgbModal, private behaviorService: BehaviorsService,
    private route: ActivatedRoute, private router: Router
  ){

    this.settings_list_menu = [{id: 1, title: 'Editar lista'}, {id:2, title: 'Cerrar'}];
    this.difference_text = '';

    this.showLoading = false;
    this.isPlanSelected = false;
    this.showSettingsMenu = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('el id es:', this.id);

    });



    //this.plan_list = this.dummy_list;



    this.getPlaListData();


  }

  goToCompare(){
    if(this.selected_plan_list.length === 1){
      this.showError("Error, faltan datos","Seleccina al menos 2 planes para la comparativa");
    }else if(this.selected_plan_list.length === 2){
      //
      this.isPlanSelected = true;
      this.selectPlan(this.selected_plan_list[this.selected_plan_list.length -1]);

    }
    
    
    else if(this.selected_plan_list.length === 3) {
      //this.router.navigate(['multi-comparativa'], { queryParams: 
        //{ selected_data: JSON.stringify(this.selected_plan_list) } });

        this.router.navigate(['main-comparativa'], { queryParams:
          { selected_data: JSON.stringify(this.selected_plan_list), id:this.id}
        })
    }
  }

  cleanAllRows(){
    this.selected_plan_list = [];

    this.plan_list.forEach((plan) => {
      plan.selected = false;
    });
  }




  showError(title:string, message: string){
    Swal.fire(title, message, 'error');
  }




  selectManyPlans(plan:any){

    if(this.selected_plan_list.length === 3){
        this.showError("Error, limite alcanzado", "Solo puedes seleccionar 3 planes para la comparativa");
    }else{
      plan.selected = !plan.selected;
      this.selected_plan_list.push(plan);

    }


    console.log("list;", this.selected_plan_list);

  }

  cleanOneRow(planToRemove: any) {

    this.plan_list.forEach((plan) => {
      planToRemove.selected = false;
    });

    this.selected_plan_list = this.selected_plan_list.filter(
      plan => plan.id_ph !== planToRemove.id_ph
    );



    
  


    console.log("Lista actualizada:", this.selected_plan_list);
  }



  openMultiEdit(){
  }


  ngAfterViewChecked(): void {
    if (this.isPlanSelected && this.dataSource && !this.dataSource.paginator && !this.dataSourceC.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSourceC.paginator = this.paginatorC;
      this.cdr.detectChanges(); 
    }


  }


  getDifferences(dataSource1: any[], dataSource2: any[]): any[] {
    const differences: any[] = [];
  
    // Verificamos que ambos arrays tengan la misma longitud
    if (dataSource1.length !== dataSource2.length) {
      console.error("Los dataSource no tienen la misma longitud.");
      return differences;
    }
  
    dataSource1.forEach((row1, index) => {
      const row2 = dataSource2[index];
  
      const rowDifferences: any[] = [];
  
      Object.keys(row1).forEach(key => {
        if (key !== 'id_ph' && key !== 'nombre_plan' && row2.hasOwnProperty(key)) {
          const value1 = String(row1[key]);
          const value2 = String(row2[key]);
  
          if (value1 !== value2) {
            rowDifferences.push({
              campo: key, 
              valor1: row1[key],
              valor2: row2[key]  
            });
          }
        }
      });
  
      if (rowDifferences.length > 0) {
        differences.push({
          nombre: row1.nombre, 
          diferencias: rowDifferences 
        });
      }
    });
  
    return differences;
}


  

  async getDifferencesPromise(data1: any[], data2: any[]){
    return new Promise((resolve, reject) => {
      try{
        const dif = this.getDifferences(data1, data2);
        resolve(dif);
      }catch(err){
        reject(err);
      }


    })
  }

  
  getPlaListData(){

    this.plan_list = this.dummy_list

    if(this.id == 1){
      
    this.displayedColumns = ['nombre', 'inventario', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    this.displayedColumnsC = ['nombre', 'inventario', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

      this.behaviorService.loadAllPlanhistoricUnion();
      this.behaviorService.planHistoric$.subscribe(
        (data) => {
          this.plan_list = data;
          console.log("list", this.plan_list);
        }
      );

    }else if(this.id == 2){
      
    this.displayedColumns = ['nombre', 'inventario', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    this.displayedColumnsC = ['nombre', 'inventario', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
      this.behaviorService.loadAllPlanPrivateUnion();
      this.behaviorService.planPrivateHistoric$.subscribe(
        (data) => {
          this.plan_list = data;
        }
      );
    }

 
  }

  afterModalClosed(result:any){
/*
    this.service.getAllPlanHistoricUnion().subscribe({
      next:(response)=> {
        console.log("historic", response);
        this.plan_list = response.result;
        
      }
    });

    */


  }

  openEditList(){
    this.openSettingsMenu();

    const modalRef = this.modal.open(EditPlanListModalComponent, {
      size:'md', 
      centered: true,
      windowClass: 'redondo'
    });

    modalRef.componentInstance.id = this.id;

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
        nombre: item['nombre'],
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

async selectPlan(plan: any) {
  this.selectedPlan = plan;
  this.showLoading = true;



  console.log("plan seleccionado", plan);

  Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espera un momento.',
      allowOutsideClick: false,
      didOpen: async () => {
          Swal.showLoading(); 
          //cargar los datos de la actual table

        if(this.id == 1){

          const getDetallesPlanPublicPromise = new Promise((resolve, reject) => {
            /*
            this.service.getDetallesPlan().subscribe({
              next:(response) => {
                console.log("plan actual publico", response);
                //const formattedData = this.formatData(response);
                //console.log("data to pdf", formattedData);
          
                this.originalData = [...response.result];
                this.dataSource.data = response.result;
                resolve(true);
              },
              error:(err) => {
                reject(err);
              }
            });

            */

            this.service.getPlanSelectedByName(this.selected_plan_list[0].name).subscribe({
              next:(response) => {
                console.log("el primer plan selesccionado es: ", response.result[0]);
      
                //const formattedData = this.formatData(response.result[0]);
                //console.log("data to pdf", formattedData);
          
                this.originalData = [...response.result[0]];
                this.dataSource.data = response.result[0];
                resolve(true);
              },
              error:(err) => {
                reject(err);
              }
            });
          });

          const getPlanSelectedByNamePublicPromise = new Promise((resolve, reject) => {
            this.service.getPlanSelectedByName(plan.name).subscribe({
              next:(response) => {
                console.log("selected plan data from api is", response.result[0]);
      
                //const formattedData = this.formatData(response.result[0]);
                //console.log("data to pdf", formattedData);
          
                this.originalDataC = [...response.result[0]];
                this.dataSourceC.data = response.result[0];
                resolve(true);
              },
              error:(err) => {
                reject(err);
              }
            });
          });
     

          Promise.all([getDetallesPlanPublicPromise, getPlanSelectedByNamePublicPromise])
            .then(() => {
              this.differencesArray = this.getDifferences(this.originalDataC, this.originalData);
              console.log("diferencias ", this.differencesArray);

              if(this.differencesArray.length === 0){
                this.difference_text = '(0 diferencias encontradas)';
              }else if(this.differencesArray.length === 1){
                this.difference_text = '(1 diferencia encontrada)';

              }else{
                this.difference_text = '(' +  this.differencesArray.length  +'diferencias encontradas)';

              }
            })
            .catch((error) => {
              console.log("error al obtener todos los datos publicos de losplanes", error);
            })

          
  
          
          

        } 

        else if (this.id == 2) {

          // Función optimizada para manejar números con decimales
          const convertNumber = (value: any): number => {
            if (value === null || value === undefined) return 0;
            if (typeof value === 'number') return Math.round(value); // Redondea si ya es número
            
            // Elimina comas y convierte a número
            const numStr = String(value).replace(/,/g, '');
            const num = parseFloat(numStr);
            
            // Redondea y verifica que sea un número válido
            return isNaN(num) ? 0 : Math.round(num);
          };


          const getDetallesPlanPrivatePromise = new Promise((resolve, reject) => {
            this.service.getDetallesPlanPrivate().subscribe({
              next: (response) => {
                const formattedData = response.map((item: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => {
                  const newItem: { [key: string]: any } = {};
                  for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                      const newKey = key.toLowerCase().replace(/ /g, '');
                      newItem[newKey] = item[key];
                    }
                  }
                  newItem['seleccionar'] = false;
                  return newItem;
                });
        
                this.originalData = [...formattedData];




                const roundedData = this.originalData.map(item => ({
                  clave: item.clave,
                  proveedor: item.proveedor,
                  nombre: item.nombre,
                  inventario: convertNumber(item.inventario),
                  enero: convertNumber(item.enero),
                  febrero: convertNumber(item.febrero),
                  marzo: convertNumber(item.marzo),
                  abril: convertNumber(item.abril),
                  mayo: convertNumber(item.mayo),
                  junio: convertNumber(item.junio),
                  julio: convertNumber(item.julio),
                  agosto: convertNumber(item.agosto),
                  septiembre: convertNumber(item.septiembre),
                  octubre: convertNumber(item.octubre),
                  noviembre: convertNumber(item.noviembre),
                  diciembre: convertNumber(item.diciembre),
                  seleccionar: item.seleccionar || false
                }));



                console.log('private data', this.originalData);
                console.log('private data rounden', roundedData);

                this.originalData = roundedData;

                //this.dataSource.data = this.originalData;
                  this.dataSource.data = this.originalData;

                this.filteredData = [...this.dataSource.data];
                resolve(true); 
              },
              error: (err) => {
                reject(err); 
              }
            });
          });
        
          const getPlanSelectedPrivateByNamePromise = new Promise((resolve, reject) => {
            this.service.getPlanSelectedPrivateByName(plan.name).subscribe({
              next: (response) => {
                console.log("selected plan data from api is", response.result[0]);
        
                this.originalDataC = [...response.result[0]];
                this.dataSourceC.data = response.result[0];
                resolve(true); 
              },
              error: (err) => {
                reject(err); 
              }
            });
          });
        
          Promise.all([getDetallesPlanPrivatePromise, getPlanSelectedPrivateByNamePromise])
            .then(() => {
               this.differencesArray = this.getDifferences(this.originalDataC, this.originalData);
              console.log("diferencias ", this.differencesArray);

              if(this.differencesArray.length === 0){
                this.difference_text = '(0 diferencias encontradas)';
              }else if(this.differencesArray.length === 1){
                this.difference_text = '(1 diferencia encontrada)';

              }else{
                this.difference_text = '(' +  this.differencesArray.length  +'diferencias encontradas)';

              }

            })
            .catch((err) => {
              console.error("Error al obtener los datos:", err);
            });
        }
        
        
      
    
   




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
