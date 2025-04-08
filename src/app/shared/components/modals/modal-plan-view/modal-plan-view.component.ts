import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
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
import { plan_public_all_data } from '../../../../core/helpers/readables';
import { ColumnSelecterModalComponent } from '../../../modals/column-selecter-modal/column-selecter-modal.component';


@Component({
  selector: 'app-modal-plan-view',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule,   MatProgressSpinnerModule],
  templateUrl: './modal-plan-view.component.html',
  styleUrl: './modal-plan-view.component.scss',
  encapsulation: ViewEncapsulation.None // <-- Desactiva la encapsulación

})
export class ModalPlanViewComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected plan: any;
  protected isLoading: boolean;
  protected ogData: any;
  protected plans_list:any[] = [];


  @ViewChildren('cardElement') cardElements!: QueryList<ElementRef>; 

  cards: number[] = []; 
  nextCardId = 1; 
  private animateNextCard = false; 
  private movedCardId: number | null = null; 
  protected showSettingsMenu: boolean;

  
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
  protected showUtilityDetails: boolean;


  protected settings_options_list:any[] = [];

  protected headersQ1: any[]= [];
  protected headersQ2: any[] = [];
  protected headersQ3: any[] = [];
  protected headersQ4: any[] = [];
  protected menu_lists: any[] = [];
  protected ops_menu_list: any[] = [];

  protected data_list: any[] = [
    {id: 1, text:'$ total de ventas: ', value:'$ 30,000'},
    {id: 2, text:'$ total de unidades vendidas: ', value:'$ 60,000'},
    {id: 3, text:'$ total de costos: ', value:'$ 40,000'},

  ];


  private isFirstShow = true; 
  private isDeatilsFirstShow = true;


  protected headers: any[] = [];
  protected headersPrivate: any[] = [];
  protected basicHeaders: any[] = [];


  protected currentMonth!: number;
  protected monthText: string;
  protected monthQ: string;

  protected qs_array:any[] = [];

  constructor(private modal: NgbModal, private service: ApiService, private router: Router, 
    private cdRef: ChangeDetectorRef
  ){
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
    this.showUtilityDetails = false;
    this.typeText = '';

    this.monthText = '';
    this.monthQ = '';
    this.showSettingsMenu = false;

    this.settings_options_list = [
      {id:1, title:'Generar backup'},  {id:2, title:'Cerrar'},

    ];
    
  }



  ngAfterViewInit(): void {
    this.cdRef.detectChanges();


    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    }, 100);
  }


  
  ngOnInit(): void {

    this.getMonthlyData()
    this.loadRowsData();
  }


isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}




  async restAllColumns() {
    this.qs_array = [];
    this.headers = [];
    this.headers = headers;
    this.currentMonth = new Date().getMonth() + 1;
    
    await this.getMonthlyData();
    await this.loadRowsData();
    
    //this.dataSource = new MatTableDataSource([...this.ogData]);
    this.cdRef.detectChanges();
  }

  loadRowsData(){

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


  onSettingsMenuSelect(option:any){
    switch(option.id){
      case 1:
          this.saveVersion();
  
      break;

      case 2:
          this.openSettingsMenu();
          break;
    }
  }


  selectColumnsNumber(){
    const qObject = {
      currentMont: this.currentMonth,
    };

    const modalRef = this.modal.open(ColumnSelecterModalComponent, {
      centered: true,
      windowClass:'redondo',
      size:'md'
    });

    modalRef.componentInstance.qObject = qObject;

    modalRef.result
      .then((result) => {
          console.log("data traidos", result);
          this.qs_array = result;

         
          console.log("headers antes: ", this.headers)
          this.headers = [];
          this.headers = headers;


          console.log("headers despues: ", this.headers)



          const newQtext = result.join(',');

          this.monthQ = newQtext;


                
          let newHeaders: any[] = [];
          let allHeaders: any[] = [];


                  
            if (result.includes('Q1')) {
              newHeaders = headersQ1;
            }

            if (result.includes('Q2')) {
              newHeaders = newHeaders.concat(headersQ2); 
            }

            if (result.includes('Q3')) {
              newHeaders = newHeaders.concat(headersQ3); 
            }

            if (result.includes('Q4')) {
              newHeaders = newHeaders.concat(headersQ4); 
            }


          
          allHeaders = this.headers.concat(newHeaders);
        
          this.headers = Array.from(
            new Map(allHeaders.map(header => [header.title, header])).values()
          );
        
          this.displayedColumns = this.headers.map(header => 
            header.title.toLowerCase().replace(' ', '')
          );


      },
      (reason) => {
        console.log("razon", reason);
      }
    
    )

  }

  getMonthlyData(){

    const current_date = new Date();
    this.currentMonth = current_date.getMonth() +1;

    let newHeaders: any[] = [];
    let allHeaders: any[] = [];


    if(this.currentMonth >= 1 && this.currentMonth <=3){
      this.monthText = 'Vista actual'
      this.monthQ = 'Q1';

      newHeaders = this.headersQ1;

    } else if(this.currentMonth > 3  && this.currentMonth <=6){
      this.monthText = 'Vista actual'
      this.monthQ = 'Q2';

      newHeaders = this.headersQ2;

    } else if(this.currentMonth > 7  && this.currentMonth <=9){
      this.monthText = 'Vista actual'
      this.monthQ = 'Q3';

      newHeaders = this.headersQ3;
    } else if(this.currentMonth > 9  && this.currentMonth <=12){
      this.monthText = 'Vista actual'
      this.monthQ = 'Q4';

      newHeaders = this.headersQ4;
    }


    
    allHeaders = this.headers.concat(newHeaders);
  
    this.headers = Array.from(
      new Map(allHeaders.map(header => [header.title, header])).values()
    );
  
    this.displayedColumns = this.headers.map(header => 
      header.title.toLowerCase().replace(' ', '')
    );


    console.log("dipslay columnas curent: ", this.displayedColumns);

    
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
    if (this.showUtilityDetails && this.isDeatilsFirstShow) {
      gsap.fromTo(
        '.utilidad-details',
        {
          opacity: 0,
          y: -100
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'bounce.out',
        }
      );
      this.isDeatilsFirstShow = false;
    }
    
    if (!this.showUtilityDetails && !this.isDeatilsFirstShow) {
      gsap.to('.utilidad-details', {
        opacity: 0,
        y: -100,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
        },
      });
      this.isDeatilsFirstShow = true; 
    }


    if (this.animateNextCard) {
      const lastIndex = this.cards.length - 1;
      const cardElement = this.cardElements.toArray()[lastIndex]?.nativeElement;
      if (cardElement) {
        gsap.from(cardElement, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
      this.animateNextCard = false; 
    }

    if (this.movedCardId !== null) {
      const cardElement = this.cardElements.toArray().find(
        (el) => el.nativeElement.getAttribute('data-card-id') === this.movedCardId?.toString()
      )?.nativeElement;

      if (cardElement) {
        gsap.to(cardElement, {
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
      this.movedCardId = null; 
    }
  }

  addCard() {
    this.cards.push(this.nextCardId);
    this.nextCardId++;
    this.animateNextCard = true; // Activa la animación para la nueva card
    console.log('Nueva card agregada:', this.cards); // Depuración
  }

  moveCardToBottom() {
    if (this.cards.length === 0) {
      console.warn('No hay cards para mover.'); // Depuración
      return;
    }

    // Mueve la última card al principio del array
    const movedCard = this.cards.pop(); // Elimina la última card
    if (movedCard !== undefined) {
      this.cards.unshift(movedCard); // Agrega la card al principio del array
      this.movedCardId = movedCard; // Guarda el ID de la card movida
      console.log('Card movida al fondo:', this.cards); // Depuración
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
        this.openOpsMenu();
        //this.addCard();
        //this.openOpsMenu();
        break;
      case 2:
          this.openOpsMenu();
        break;
    }
  } 

  openUtilityDetails(){
    this.showUtilityDetails = !this.showUtilityDetails;

   
  }

  openOpsMenu(){
    this.showOpsMenu = !this.showOpsMenu;
  }


  openSettingsMenu(){
    this.showSettingsMenu  = !this.showSettingsMenu;
  }


  async savePublicPlan(pName: string, pType: string){

        
    const jTest2 =
    {
      "table": "dbo.tb_200_historic_public",
      "json": [
          {
              "clave": "01PT1001",
              "proveedor": "planta",
              "nombre": "Acido Ascorbico (1g/10comp eferv)",
              "inventario": 0,
              "enero": 21300,
              "febrero": 18500,
              "marzo": 15200,
              "abril": 13350,
              "mayo": 11400,
              "junio": 9250,
              "julio": 10800,
              "agosto": 12550,
              "septiembre": 14500,
              "octubre": 16850,
              "noviembre": 20500,
              "diciembre": 27300,
              "nombre_plan": "plan privado version21"
          },

          ]

    }

    const convertNumber = (value: any): number => {
      if (value === null || value === undefined) return 0;
      if (typeof value === 'number') return value;
      const numStr = String(value).replace(/,/g, '');
      return parseInt(numStr, 10) || 0;
    };
  
   
  



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


/*
const filtered_private_data = this.originalData.map(item => ({
  clave: item.clave,
  descripcion: item.descripcion !== null ? item.descripcion : 0,
  enero: item.enero !== null ? item.enero: 0,
  febrero: item.febrero !== null ? item.febrero: 0,
  marzo: item.marzo !== null ? item.marzo:0,
  nombre_plan: pName
}));

*/

const filtered_private_data = this.originalData.map(item => ({
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
  nombre_plan: pName

}));


try{
const response1 = await this.insertPlanUnionPromise(pName, pType);

//const response2 = await this.insertHistoricoPublicoPromise("historico_dos",filtered_private_data);
const response2 = await this.insertHistoricoPublicoPromise('dbo.tb_200_historic_publico', filtered_private_data);



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

    this.showSettingsMenu = false;
  const jtest= {
    //"table": "plan_historico_privado",
    "table": "dbo.tb_200_historic_privado",
    "json": [
        {
            "clave":"000.100.234.21",
            "proveedor": "Biocon",
            "nombre": "Acido Ascórbico 1 gr c/ 10 Aurax",
            "inventario": 0,
            "enero": 1000,
            "febrero": 1000,
            "marzo": 1000,
            "abril": 1000,
            "mayo": 1000,
            "junio": 1000,
            "julio": 1000,
            "agosto": 1000,
            "septiembre": 1000,
            "octubre": 1000,
            "noviembre": 1000,
            "diciembre": 1000

        },
        {
          "clave":"000.100.234.21",
          "proveedor": "Biocon",
            "nombre": "Paracetamol 500 mg c/ 10",
            "inventario": 50,
            "enero": 2000,
            "febrero": 1500,
            "marzo": 1800,
            "abril": 1000,
            "mayo": 1000,
            "junio": 1000,
            "julio": 1000,
            "agosto": 1000,
            "septiembre": 1000,
            "octubre": 1000,
            "noviembre": 1000,
            "diciembre": 1000

        },
        {
          "clave":"000.100.234.21",
          "proveedor": "Biocon",
            "nombre": "Ibuprofeno 400 mg c/ 20",
            "inventario": 30,
            "enero": 1200,
            "febrero": 1300,
            "marzo": 1400,
            "abril": 1000,
            "mayo": 1000,
            "junio": 1000,
            "julio": 1000,
            "agosto": 1000,
            "septiembre": 1000,
            "octubre": 1000,
            "noviembre": 1000,
            "diciembre": 1000

        }
    ]
}

const jTest2 =
{
  "table": "dbo.tb_200_historic_privado",
  "json": [
      {
          "clave": "01PT1001",
          "proveedor": "planta",
          "nombre": "Acido Ascorbico (1g/10comp eferv)",
          "inventario": 0,
          "enero": 21300,
          "febrero": 18500,
          "marzo": 15200,
          "abril": 13350,
          "mayo": 11400,
          "junio": 9250,
          "julio": 10800,
          "agosto": 12550,
          "septiembre": 14500,
          "octubre": 16850,
          "noviembre": 20500,
          "diciembre": 27300,
          "nombre_plan": "plan privado version21"
      },

      ]

}

    let pName = '';
    let pType = '';
    this.idValue = this.idValue +1;

  if(this.plan.id === 1){


      pName = 'plan públicoss version' + String(this.idValue);
      pType  = 'publico';

      await this.savePublicPlan(pName, pType);





    }else if(this.plan.id === 2){
      pName = 'plan privado version' + String(this.idValue);
      pType = 'privado';

      Swal.fire({
        title: 'Guardando...',
        text: 'Por favor, espera un momento.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading(); 
        }
      });
    
      // Función para convertir valores numéricos
      const convertNumber = (value: any): number => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'number') return value;
        const numStr = String(value).replace(/,/g, '');
        return parseInt(numStr, 10) || 0;
      };
    
      const filtered_private_data = this.originalData.map(item => ({
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
        diciembre: convertNumber(item.diciembre)
      }));
    
      const jsonFixedWithPlan = filtered_private_data.map((item) => ({
        ...item, 
        nombre_plan: pName
      }));
    
      console.log("Datos transformados para send:", jsonFixedWithPlan);
    
      try {
        const response1 = await this.insertPlanUnionPromise(pName, pType);
        const response2 = await this.insertPlanHistoricoPrivadoPromise(jtest.table, jsonFixedWithPlan);

    
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
  /*
    this.headers = [
      { id: 1, title: 'seleccionar' }, 
      { id: 2, title: 'nombre' },
      { id: 3, title: 'inventario' },
      { id: 4, title: 'enero' },
      { id: 5, title: 'febrero' },
      { id: 5, title: 'marzo' },


    ];
  
    this.displayedColumns = this.headers.map(header => 
      header.title.toLowerCase().replace(/ /g, '')
    );

    */
  
    this.service.getDetallesPlanPrivate().subscribe({
      next: (response) => {
        const formattedData = response.map((item: any) => {
          const newItem: { [key: string]: any } = {};
          
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              const newKey = key.toLowerCase().replace(/ /g, '');
              
              // Formatear solo los valores numéricos (excepto 'clave' y 'seleccionar')
              if (key !== 'clave' && key !== 'seleccionar' && key !== 'proveedor' && key !== 'nombre' && 
                  typeof item[key] === 'number') {
                // Formatear con separadores de miles y sin decimales
                newItem[newKey] = new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 0
                }).format(item[key]);
              } else {
                newItem[newKey] = item[key];
              }
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
/*
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

*/

    //this.ogData = plan_public_all_data;


    //const formattedData = this.formatData(response);
    //console.log("data to pdf", formattedData);

    //this.originalData = [...plan_public_all_data];
    //this.dataSource.data =plan_public_all_data;


    //this.filteredData = [...this.dataSource.data];

    //this.isLoading = false;
  
    this.service.getDetallesPlan().subscribe({
      next: (response) => {
        console.log('og data:', response);
        
        // Formatear los datos numéricos
        const formattedData = response.result.map((item: any) => {
          const newItem: { [key: string]: any } = {};
          
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              // Mantener el nombre original de la key (sin lowercase/replace si no es necesario)
              const newKey = key;
              
              // Formatear solo los valores numéricos (excluyendo campos específicos)
              if (key !== 'clave' && key !== 'seleccionar' && key !== 'proveedor' && key !== 'nombre' && 
                  typeof item[key] === 'number') {
                // Formatear con separadores de miles y 2 decimales (ajusta según necesites)
                newItem[newKey] = new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                }).format(item[key]);
              } else {
                newItem[newKey] = item[key];
              }
            }
          }
          
          // Asegurar que el campo 'seleccionar' existe
          newItem['seleccionar'] = item.seleccionar || false;
          return newItem;
        });
    
        this.ogData = formattedData;
        this.originalData = [...formattedData];
        this.dataSource.data = formattedData;
        this.filteredData = [...formattedData];
    
        console.log('Datos formateados:', formattedData);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
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
