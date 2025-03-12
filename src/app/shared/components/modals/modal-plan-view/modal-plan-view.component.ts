import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditManyModalsComponent } from '../edit-many-modals/edit-many-modals.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../api.service';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { headers, headersQ1, headersQ2, headersQ3, headersQ4, list_menu_views, menu_lists } from '../../../../core/helpers/arrays';
import { gsap } from 'gsap';


@Component({
  selector: 'app-modal-plan-view',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule,   MatProgressSpinnerModule],
  templateUrl: './modal-plan-view.component.html',
  styleUrl: './modal-plan-view.component.scss'
})
export class ModalPlanViewComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected plan: any;
  protected isLoading: boolean;
  protected ogData: any;
  protected plans_list:any[] = [];

  
  protected list_menu_views: any[] = []

  protected selectedRow : any;
  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<any>();  

  limits: number;
  protected showMenu: boolean = false;
  protected showViewsMenu: boolean = false;
  protected typeText: string;

  public data: any[] = [];  

  protected selected_rows: any[] = [];

  menuTop: number = 0;
  menuLeft: number = 0;
  protected idValue: number;
  
  filteredData: any[] = [];
  searchText: string = '';
  originalData: any[] = [];
  protected showOpsMenu: boolean;
  protected showUtility: boolean;

  protected headersQ1: any[]= [];
  protected headersQ2: any[] = [];
  protected headersQ3: any[] = [];
  protected headersQ4: any[] = [];
  protected menu_lists: any[] = [];
  protected ops_menu_list: any[] = [];


  private isFirstShow = true; 


  protected headers: any[] = [];
  protected headersPrivate: any[] = [];

  constructor(private modal: NgbModal, private service: ApiService, private router: Router){
    this.limits = 1; 
    this.idValue = 0;

    this.ops_menu_list= [{id: 1, title: 'Utilidad bruta'}, {id:2, title: 'Cerrar'}];

    this.headersQ1 = headersQ1;
    this.headersQ2 = headersQ2;
    this.headersQ3 = headersQ3;
    this.headersQ4 = headersQ4;
    this.menu_lists = menu_lists;
    this.list_menu_views = list_menu_views;
    this.headers = headers;
    this.isLoading = false;
    this.showOpsMenu = false;
    this.showUtility = false;
    this.typeText = '';

    
  }



  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    }, 100);
  }


  
  ngOnInit(): void {

    if(this.plan.id === 1){
      this.showDRows();
      this.typeText = 'publico';
    }else if(this.plan.id === 2){
      this.typeText = 'privado';
        this.showPrivateRows();
    }

    this.service.getLastIdNumber(this.typeText).subscribe({
      next:(response) => {
        console.log('valor ', this.typeText,  ' ', response.result);
        this.idValue = response.result;
      }
    });

  

  }

  ngAfterViewChecked() {
    if (this.showUtility && this.isFirstShow) {
      gsap.fromTo(
        '.utilidad',
        {
          opacity: 0,
          y: -50, 
        },
        {
          opacity: 1,
          y: 0, 
          duration: 0.5,
          ease: 'bounce.out', 
        }
      );
      this.isFirstShow = false; 
    }
  }

  showElement() {

      gsap.fromTo(
        '.utilidad',
        {
          opacity: 0,
          y: -50, 
        },
        {
          opacity: 1,
          y: 0, 
          duration: 0.5,
          ease: 'bounce.out', 
        }
      );
    

  }



  onOpsMenuClick(option:any){
    switch(option.id){
      case 1:
        this.showUtility = true;

        break;
      case 2:
          this.openOpsMenu();
        break;
    }
  } 

  openOpsMenu(){
    this.showOpsMenu = !this.showOpsMenu;
  }


  openSettingsMenu(){

  }


  async savePublicPlan(pName: string, pType: string){

    const replaceNullWithZero = (obj: { [x: string]: number }) => {
      for (let key in obj) {
          if (obj[key] === null) {
              obj[key] = 0;
          }
      }
      return obj;
  };

  const jsonFixed = this.originalData.map(replaceNullWithZero);

  const jsonFixedWithPlan = jsonFixed.map((item) => {
    return {
        ...item, 
        nombre_plan: pName
    };
});

  

Swal.fire({
  title: 'Guardando...',
  text: 'Por favor, espera un momento.',
  allowOutsideClick: false,
  didOpen: () => {
      Swal.showLoading(); 
  }
});


const filtered_private_data = this.originalData.map(item => ({
  clave: item.clave,
  descripcion: item.descripcion !== null ? item.descripcion : 0,
  enero: item.enero !== null ? item.enero: 0,
  febrero: item.febrero !== null ? item.febrero: 0,
  marzo: item.marzo !== null ? item.marzo:0,
  nombre_plan: pName
}));


try{
const response1 = await this.insertPlanUnionPromise(pName, pType);

const response2 = await this.insertHistoricoPublicoPromise("historico_dos",filtered_private_data);
Swal.fire({
  icon: 'success',
  title: '¡Guardado exitoso!',
  text: 'Los datos se han guardado correctamente.',
  confirmButtonText: 'Aceptar'
});
}catch(err){
console.log("Error:", err);

Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.',
    confirmButtonText: 'Aceptar'
});
}



  }


 async saveVersion() {

  const jtest= {
    "table": "plan_historico_privado",
    "json": [
        {
            "producto": "Acido Ascórbico 1 gr c/ 10 Aurax",
            "inventario": 0,
            "enero": 1000,
            "febrero": 1000,
            "marzo": 1000
        },
        {
            "producto": "Paracetamol 500 mg c/ 10",
            "inventario": 50,
            "enero": 2000,
            "febrero": 1500,
            "marzo": 1800
        },
        {
            "producto": "Ibuprofeno 400 mg c/ 20",
            "inventario": 30,
            "enero": 1200,
            "febrero": 1300,
            "marzo": 1400
        }
    ]
}

    let pName = '';
    let pType = '';
    this.idValue = this.idValue +1;

  if(this.plan.id === 1){
      pName = 'plan público version' + String(this.idValue);
      pType  = 'publico';

      await this.savePublicPlan(pName, pType);

    }else if(this.plan.id === 2){
      pName = 'plan privado version' + String(this.idValue);
      pType  = 'privado';


      const filtered_private_data = this.originalData.map(item => ({
        producto: item.producto,
        inventario: item.inventario !== null ? item.inventario : 0,
        enero: item.enero !== null ? item.enero: 0,
        febrero: item.febrero !== null ? item.febrero: 0,
        marzo: item.marzo !== null ? item.marzo:0
      }));



      const jsonFixedWithPlan = filtered_private_data.map((item) => {
        return {
            ...item, 
            nombre_plan: pName
        };
    });



    



      console.log("filtered_private", filtered_private_data);

      const response1 = await this.insertPlanUnionPromise(pName, pType);
      const response2 = await this.insertPlanHistoricoPrivadoPromise(jtest.table, jsonFixedWithPlan);


    }

    


 
}


  insertPlanHistoricoPrivadoPromise = (table_name: string, data_json: any) => {
    return new Promise((resolve, reject) => {
      this.service.insertPlanHistoricoPrivado(table_name, data_json).subscribe({
        next:(data) => {
          console.log("registor privado", data);
          resolve(data);
        },
        error:(error) => {
          reject(error);
        } 
      })
    })
  }
 

  insertPlanUnionPromise = (name:string, type:string) => {
    return new Promise((resolve, reject) => {
      
    this.service.insertPlanHistoicUnion(name, type).subscribe({
      next:(response) => {
        console.log('registro:', response);
        resolve(response);
      },
      error: (error) => {
        console.error('error al insertar', error);
        reject(error);
      }

    });

    })
  }

  insertHistoricoPublicoPromise = (name: string, data: any) => {
    return new Promise((resolve, reject) => {
      this.service.insertHistoricoPublico(name, data).subscribe({
        next: (response) => {
            console.log("Respuesta:", response);
          resolve(response);
        
        },
        error: (error) => {
           reject(error);
        }
    });
    });
  }



  showPrivateRows() {
    this.isLoading = true;
  
    this.headers = [
      { id: 1, title: 'seleccionar' }, 
      { id: 2, title: 'Producto' },
      { id: 3, title: 'Inventario' },
      { id: 4, title: 'enero' },
      { id: 5, title: 'febrero' },
      { id: 6, title: 'marzo' },

    ];
  
    this.displayedColumns = this.headers.map(header => 
      header.title.toLowerCase().replace(/ /g, '')
    );
  
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
        console.log('private data', this.originalData);
        this.dataSource.data = this.originalData;
        this.filteredData = [...this.dataSource.data];
  
        this.isLoading = false;
      }
    });
  }


  onMenuSelect(option:any){
    switch(option.id){
      case 4:
        this.showViewsMenu = !this.showViewsMenu;
        break;
    }
  }

  openExample(){
    //this.router.navigate(['/example']);
    this.showViewsMenu = !this.showViewsMenu;




  }

  showDRows() {
    this.isLoading = true;

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
        console.log('og data:', response);
        this.ogData = response;


        //const formattedData = this.formatData(response);
        //console.log("data to pdf", formattedData);
        console.log("data publica inicial", response);
  
        this.originalData = [...response];
        this.dataSource.data = response;
  
        // Asigna el paginador después de cargar los datos
  
        this.filteredData = [...this.dataSource.data];

        //this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    });
  }


  afterModalClosed(result: any) {

    if(this.plan.id === 1){ this.showDRows();
    }else if(this.plan.id === 2){ this.showPrivateRows();
    }

  }

    onRowClick(row: any): void {
  
      if(this.plan.id === 1){
        row.id_plan = 1;
      }else if(this.plan.id === 2){
        row.id_plan = 2;
      }
  
      const modalRef = this.modal.open(EditModalComponent, {
        centered: true,
        size: 'lg',
        windowClass:'redondo'
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
    this.menuLeft = event.clientX - 160;
  
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
