import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { gsap } from 'gsap';
import { pp_data_details } from '../../../../core/helpers/readables';
import { TableInventariosModalComponent } from '../../../../shared/modals/table-inventarios-modal/table-inventarios-modal.component';
import { BehaviorsService } from '../../../../core/services/behaviors.service';
import { StackedViewModalComponent } from '../../../../shared/modals/stacked-view-modal/stacked-view-modal.component';


@Component({
  selector: 'app-proveedor-products',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './proveedor-products.component.html',
  styleUrl: './proveedor-products.component.scss'
})
export class ProveedorProductsComponent implements OnInit {
  @ViewChild('cardLefts', { static: true}) cardL!: ElementRef;

  @Input() productsData:any;


  protected dataSource = new MatTableDataSource<any>();
  protected dataSourcePlan = new MatTableDataSource<any>();
  protected dataSourcethird = new MatTableDataSource<any>();

  protected displayedColumns: string[] = [];
  protected monthsColumns: string[] = [];

  protected displayedColumnsPlan: string[] = [];
  protected monthsColumnsPlan: string[] = [];

  protected thirdJson: any[] = [];
  protected displayedColumnsThird: string[] = [];

   meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];


  protected processedData: any;

  protected sendSource: any[] = [];
  protected sendSourcePlan: any[] = [];

  protected editingCell: { row: any, column: string } | null = null; 

  protected isArribosExpanded: boolean;
  protected arribosData: any[] = [];

  protected showLoadSpinner: boolean = false;


  protected currentMonth: number;
  protected nextMonth: number;

  protected formattedThirdJson: any[] = [];


  constructor(private modal: NgbModal, private behaviourService: BehaviorsService, private changeDetectorRef: ChangeDetectorRef){
    this.displayedColumns = ['nombre', 'disponibles'];
    this.displayedColumnsPlan = ['nombre', 'disponibles', 'enero', 'febrero', 'marzo', 'abril', 'mayo',
      'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    this.displayedColumnsThird= ['nombre','enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
         'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    this.isArribosExpanded = false;

    this.currentMonth = 0;
    this.nextMonth = 0;


  }


  ngOnInit(): void {


    this.showLoadSpinner = true;

    console.log("el tipo es:", this.productsData);

    this.monthsColumns = [];
    this.displayedColumns = ['nombre', 'disponibles'];

    this.currentMonth = new Date().getMonth() + 1;
    this.nextMonth = this.currentMonth + 1;

    console.log("mes actual:", this.currentMonth, "  y el prox: ", this.nextMonth);

    if(this.productsData === 1){
      this.getPublicData();
    }else if(this.productsData === 2){
      this.getPrivateData();
    }
    
   
    
   

  }

  getPrivateData(){
    this.behaviourService.itemsPribatePlan$.subscribe({
      next: (data) => {
        console.log("Datos recibidos desde behaviourService", data);
        
        if (!data || data.length === 0) {
          console.warn('Los datos recibidos están vacíos');
          return;
        }
        
        this.arribosData = data;

        console.log("datos de arribos:", data);
        
        const sampleItem = data[0];


        
        this.thirdJson = data?.map((item: { nombre: string }) => ({ nombre: item.nombre })) || [];

     


         this.formattedThirdJson = this.thirdJson.map(item => ({
          ...item,        
          abril: item.abril || 0,  
          mayo: item.mayo || 0,
          junio: item.junio || 0,
          julio: item.junio || 0,
          agosto: item.junio || 0,
          septiembre: item.junio || 0,
          octubre: item.junio || 0,
          noviembre: item.junio || 0,
          diciembre: item.junio || 0,


        }));

        console.log("arreglo con puros nombres de peroducos", this.thirdJson);
        console.log('formattes 3 json: ', this.formattedThirdJson);

         //this.thirdJson = this.generateNewJson(pp_data_details);
    this.dataSourcethird = new MatTableDataSource(this.formattedThirdJson);
        
        if (sampleItem.arribos?.length > 0 && sampleItem.arribos[0].months) {
          sampleItem.arribos[0].months.forEach((month: any) => {
            const key = Object.keys(month)[0];
            if (key && !this.monthsColumns.includes(key)) {
              this.monthsColumns.push(key);
            }
          });
        }
        
        if (!this.monthsColumns.includes('total')) {
          this.monthsColumns.push('total');
        }
        
        this.displayedColumns = [
          'nombre', 
          'disponibles',
          ...this.monthsColumns
        ];
        
        this.processedData = data.map(item => {
          const rowData: any = {
            nombre: item.nombre || '',
            disponibles: item.disponibles || 0,
            proveedor: item.proveedor || '',
            clave: item.clave || ''
          };
          
          let total = 0;
          if (item.arribos?.length > 0 && item.arribos[0].months) {
            item.arribos[0].months.forEach((month: any) => {
              const key = Object.keys(month)[0];
              const value = parseInt(month[key], 10) || 0;
              rowData[key] = value;
              total += value;
            });
          }
          
          rowData.total = total;
          return rowData;
        });
        
        console.log('Columnas mostradas:', this.displayedColumns);
        console.log('Datos procesados:', this.processedData);
        
        this.dataSource = new MatTableDataSource(this.processedData);
        this.dataSourcePlan = new MatTableDataSource(data);
        

        this.calcularDesplazamientos();

        this.changeDetectorRef.detectChanges();
        this.showLoadSpinner = false;
      },
      error: (err) => {
        console.error('Error al recibir datos:', err);
        this.showLoadSpinner = false;

      }
    });
  }

  getPublicData(){
    this.behaviourService.itemsPublicPlan$.subscribe({
      next: (data) => {
        console.log("Datos recibidos desde behaviourService", data);
        
        if (!data || data.length === 0) {
          console.warn('Los datos recibidos están vacíos');
          return;
        }
        
        this.arribosData = data;

        console.log("datos de arribos:", data);
        
        const sampleItem = data[0];


        
        this.thirdJson = data?.map((item: { nombre: string }) => ({ nombre: item.nombre })) || [];

     


         this.formattedThirdJson = this.thirdJson.map(item => ({
          ...item,        
          abril: item.abril || 0,  
          mayo: item.mayo || 0,
          junio: item.junio || 0,
          julio: item.junio || 0,
          agosto: item.junio || 0,
          septiembre: item.junio || 0,
          octubre: item.junio || 0,
          noviembre: item.junio || 0,
          diciembre: item.junio || 0,


        }));

        console.log("arreglo con puros nombres de peroducos", this.thirdJson);
        console.log('formattes 3 json: ', this.formattedThirdJson);

         //this.thirdJson = this.generateNewJson(pp_data_details);
    this.dataSourcethird = new MatTableDataSource(this.formattedThirdJson);
        
        if (sampleItem.arribos?.length > 0 && sampleItem.arribos[0].months) {
          sampleItem.arribos[0].months.forEach((month: any) => {
            const key = Object.keys(month)[0];
            if (key && !this.monthsColumns.includes(key)) {
              this.monthsColumns.push(key);
            }
          });
        }
        
        if (!this.monthsColumns.includes('total')) {
          this.monthsColumns.push('total');
        }
        
        this.displayedColumns = [
          'nombre', 
          'disponibles',
          ...this.monthsColumns
        ];
        
        this.processedData = data.map(item => {
          const rowData: any = {
            nombre: item.nombre || '',
            disponibles: item.disponibles || 0,
            proveedor: item.proveedor || '',
            clave: item.clave || ''
          };
          
          let total = 0;
          if (item.arribos?.length > 0 && item.arribos[0].months) {
            item.arribos[0].months.forEach((month: any) => {
              const key = Object.keys(month)[0];
              const value = parseInt(month[key], 10) || 0;
              rowData[key] = value;
              total += value;
            });
          }
          
          rowData.total = total;
          return rowData;
        });
        
        console.log('Columnas mostradas:', this.displayedColumns);
        console.log('Datos procesados:', this.processedData);
        
        this.dataSource = new MatTableDataSource(this.processedData);
        this.dataSourcePlan = new MatTableDataSource(data);
        

        this.calcularDesplazamientos();

        this.changeDetectorRef.detectChanges();
        this.showLoadSpinner = false;
      },
      error: (err) => {
        console.error('Error al recibir datos:', err);
        this.showLoadSpinner = false;

      }
    });
  }


  calcularDesplazamientos() {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
    console.log('=== INICIO DE CÁLCULO DE DESPLAZAMIENTOS ===');
    
    this.formattedThirdJson = this.formattedThirdJson.map((desplazamientoItem, index) => {
      const planItem = this.arribosData[index]; // Tomamos los datos de PLAN desde arribosData
      const arribosItem = this.processedData[index]; // Tomamos los datos de ARRIBOS desde processedData
      const disponibles = planItem.disponibles || 0; // Tomamos los disponibles de PLAN
      
      console.log(`\n=== Procesando producto ${index + 1}: ${desplazamientoItem.nombre} ===`);
      console.log('Datos de PLAN:', {
        disponibles: planItem.disponibles,
        febrero: planItem.febrero,
        marzo: planItem.marzo
      });
      console.log('Datos de ARRIBOS:', {
        enero: arribosItem.enero,
        febrero: arribosItem.febrero
      });
      
      const nuevoDesplazamiento = { ...desplazamientoItem };
  
      // 1. Enero siempre es 0
      nuevoDesplazamiento.enero = 0;
      console.log('\nEnero (fijo): 0');
  
      // 2. Calcular febrero (caso especial)
      const arribosEnero = arribosItem.enero || 0; // Tomamos de processedData
      const planFebrero = planItem.febrero || 0; // Tomamos de arribosData
      nuevoDesplazamiento.febrero = (arribosEnero - planFebrero) + disponibles;
      
      console.log(`\nCálculo CORREGIDO para febrero:`);
      console.log(`(Arribos enero: ${arribosEnero} - Plan febrero: ${planFebrero}) + Disponibles: ${disponibles}`);
      console.log(`= (${arribosEnero} - ${planFebrero}) + ${disponibles}`);
      console.log(`= (${arribosEnero - planFebrero}) + ${disponibles}`);
      console.log(`Resultado FINAL: ${nuevoDesplazamiento.febrero}`);
  
      // 3. Calcular marzo
      const arribosFebrero = arribosItem.febrero || 0; // Tomamos de processedData
      const planMarzo = planItem.marzo || 0; // Tomamos de arribosData
      nuevoDesplazamiento.marzo = (arribosFebrero - planMarzo) + nuevoDesplazamiento.febrero;
      
      console.log(`\nCálculo para marzo:`);
      console.log(`(Arribos febrero: ${arribosFebrero} - Plan marzo: ${planMarzo}) + Desplazamiento febrero: ${nuevoDesplazamiento.febrero}`);
      console.log(`= (${arribosFebrero} - ${planMarzo}) + ${nuevoDesplazamiento.febrero}`);
      console.log(`= (${arribosFebrero - planMarzo}) + ${nuevoDesplazamiento.febrero}`);
      console.log(`Resultado FINAL: ${nuevoDesplazamiento.marzo}`);
  
      // 4. Calcular de abril a diciembre
      for (let i = 3; i < meses.length; i++) {
        const mesActual = meses[i];
        const mesAnterior = meses[i - 1];
        
        const arribosAnterior = arribosItem[mesAnterior] || 0; // Tomamos de processedData
        const planActual = planItem[mesActual] || 0; // Tomamos de arribosData
        const desplazamientoAnterior = nuevoDesplazamiento[mesAnterior] || 0;
        
        nuevoDesplazamiento[mesActual] = (arribosAnterior - planActual) + desplazamientoAnterior;
        
        console.log(`\nCálculo para ${mesActual}:`);
        console.log(`(Arribos ${mesAnterior}: ${arribosAnterior} - Plan ${mesActual}: ${planActual}) + Desplazamiento ${mesAnterior}: ${desplazamientoAnterior}`);
        console.log(`= (${arribosAnterior} - ${planActual}) + ${desplazamientoAnterior}`);
        console.log(`= (${arribosAnterior - planActual}) + ${desplazamientoAnterior}`);
        console.log(`Resultado FINAL: ${nuevoDesplazamiento[mesActual]}`);
      }
      
      console.log('\nResultado final para producto:', JSON.parse(JSON.stringify(nuevoDesplazamiento)));
      return nuevoDesplazamiento;
    });
  
    console.log('\n=== RESUMEN FINAL DE DESPLAZAMIENTOS ===');
    console.log('Todos los desplazamientos calculados:', JSON.parse(JSON.stringify(this.formattedThirdJson)));
    
    this.dataSourcethird = new MatTableDataSource(this.formattedThirdJson);
  }



  animateCard() {
    const cardElement = this.cardL.nativeElement;

    if (this.isArribosExpanded) {
      // Animación para expandir
      gsap.to(cardElement, {
        width: '104%', // Ancho expandido
        duration: 0.5, // Duración de la animación (en segundos)
        ease: 'power2.out', // Efecto de easing (suave)
      });
    } else {
      // Animación para contraer
      gsap.to(cardElement, {
        width: 'calc(50% - 16px)', // Ancho original
        duration: 0.5, // Duración de la animación (en segundos)
        ease: 'power2.out', // Efecto de easing (suave)
      });
    }
  }


  setExpandOn(){
    this.isArribosExpanded = !this.isArribosExpanded;
    this.animateCard();

    console.log(this.isArribosExpanded);
  }




  // Método para iniciar la edición (se mantiene igual)
startEditing(row: any, column: string) {
  this.editingCell = { row, column };
}

// Método para finalizar la edición (modificado)
stopEditing(event: any, row: any, column: string) {
  const newValue = parseFloat(event.target.value) || 0;

  // 1. Actualizar el valor en la fila de la tabla de arribos
  row[column] = newValue;

  // 2. Si es un mes, actualizar también en el objeto original de arribosData
  if (this.monthsColumns.includes(column)) {
    const arribosItem = this.arribosData.find(item => item.nombre === row.nombre);
    if (arribosItem && arribosItem.arribos?.[0]?.months) {
      const monthObj = arribosItem.arribos[0].months.find((m: {}) => Object.keys(m)[0] === column);
      if (monthObj) {
        monthObj[column] = newValue;
      }
    }

    // Recalcular el total
    this.updateTotal(row);
  }

  // 3. Actualizar los desplazamientos
  this.updateDesplazamientos();

  this.editingCell = null;
}

// Método para recalcular el total (similar pero ajustado)
updateTotal(row: any) {
  let total = 0;
  this.monthsColumns.forEach(month => {
    total += parseFloat(row[month]) || 0;
  });
  row.total = total;
}



updateDesplazamientos() {
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  console.log('=== ACTUALIZACIÓN DE DESPLAZAMIENTOS ===');

  this.formattedThirdJson = this.formattedThirdJson.map((desplazamientoItem, index) => {
    const planItem = this.arribosData[index]; // Datos de PLAN (valores que se restan)
    const arribosItem = this.processedData[index]; // Datos de ARRIBOS (valores que se suman)
    const disponibles = planItem.disponibles || 0; // Tomar de planItem

    console.log(`\nProducto: ${desplazamientoItem.nombre}`);
    console.log('Disponibles:', disponibles);
    
    const nuevoDesplazamiento = { ...desplazamientoItem };

    // 1. Enero siempre es 0
    nuevoDesplazamiento.enero = 0;

    // 2. Febrero: (arribos_enero - plan_febrero) + disponibles
    const arribosEnero = arribosItem.enero || 0;
    const planFebrero = planItem.febrero || 0;
    nuevoDesplazamiento.febrero = (arribosEnero - planFebrero) + disponibles;

    console.log('\nCálculo febrero:');
    console.log(`(${arribosEnero} (arribos enero) - ${planFebrero} (plan febrero)) + ${disponibles} (disponibles)`);
    console.log(`= ${nuevoDesplazamiento.febrero}`);

    // 3. Marzo: (arribos_febrero - plan_marzo) + desplazamiento_febrero
    const arribosFebrero = arribosItem.febrero || 0;
    const planMarzo = planItem.marzo || 0;
    nuevoDesplazamiento.marzo = (arribosFebrero - planMarzo) + nuevoDesplazamiento.febrero;

    console.log('\nCálculo marzo:');
    console.log(`(${arribosFebrero} (arribos febrero) - ${planMarzo} (plan marzo)) + ${nuevoDesplazamiento.febrero} (desplaz. febrero)`);
    console.log(`= ${nuevoDesplazamiento.marzo}`);

    // 4. Abril a Diciembre: (arribos_mes_anterior - plan_mes_actual) + desplazamiento_mes_anterior
    for (let i = 3; i < meses.length; i++) {
      const mesActual = meses[i];
      const mesAnterior = meses[i - 1];
      
      const arribosAnterior = arribosItem[mesAnterior] || 0;
      const planActual = planItem[mesActual] || 0;
      const desplazamientoAnterior = nuevoDesplazamiento[mesAnterior] || 0;
      
      nuevoDesplazamiento[mesActual] = (arribosAnterior - planActual) + desplazamientoAnterior;

      console.log(`\nCálculo ${mesActual}:`);
      console.log(`(${arribosAnterior} (arribos ${mesAnterior}) - ${planActual} (plan ${mesActual})) + ${desplazamientoAnterior} (desplaz. ${mesAnterior})`);
      console.log(`= ${nuevoDesplazamiento[mesActual]}`);
    }

    console.log('\nResultado final:', JSON.parse(JSON.stringify(nuevoDesplazamiento)));
    return nuevoDesplazamiento;
  });

  this.dataSourcethird.data = [...this.formattedThirdJson];
}


// Helper para obtener valores de meses (se mantiene igual)
getMonthValue(months: any[], month: string): number {
  const monthData = months?.find((m: any) => Object.keys(m)[0] === month);
  return parseFloat(monthData?.[month] || 0);
}









// Método para recalcular thirdJson
updateThirdJson() {
  // Regenerar thirdJson basado en el JSON original actualizado (pp_data_details)
  this.thirdJson = this.generateNewJson(pp_data_details);

  // Actualizar la fuente de datos de la tabla de desplazamiento
  this.dataSourcethird.data = this.thirdJson;
}




generateNewJson(data: any[]) {
  return data.map(item => {
    const nombre = item.nombre;

    // Obtener los valores de "arribos" y "plan"
    const arribosMonths = item.arribos[0].months;
    const planMonths = item.plan[0].months;

    // Inicializar el valor de junio (mes anterior a julio)
    let valorNuevoJsonMesAnterior = 0; // Por defecto, es 0
    const arribosJunio = this.getMonthValue(arribosMonths, 'junio');

    // Crear el objeto con cada mes como propiedad independiente
    const newItem: any = {
      nombre,
      enero: 0,
      febrero: 0,
      marzo: 0,
      abril: 0,
      mayo: 0,
      junio: 0,
      julio: 0,
      agosto: 0,
      septiembre: 0,
      octubre: 0,
      noviembre: 0,
      diciembre: 0
    };

    // Calcular los valores desde julio hasta diciembre
    const meses = ['julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    meses.forEach((mes, index) => {
      const mesAnterior = index === 0 ? 'junio' : meses[index - 1]; // Mes anterior
      const arribosMesAnterior = this.getMonthValue(arribosMonths, mesAnterior);
      const planMesActual = this.getMonthValue(planMonths, mes);

      // Aplicar la fórmula
      newItem[mes] = (valorNuevoJsonMesAnterior + arribosMesAnterior) - planMesActual;

      // Actualizar el valor del mes anterior para la siguiente iteración
      valorNuevoJsonMesAnterior = newItem[mes];
    });

    return newItem;
  });
}











  openStacked(tipo: number) {
    const modalRef = this.modal.open(StackedViewModalComponent, {
      centered: true,
      size: 'xl', // Puedes mantener esto o eliminarlo si no es necesario
      windowClass: 'custom-modal-width redondo' // Aplica la clase personalizada
    });
  
    modalRef.componentInstance.data = tipo;
  }

  openZoom(tipo: number){
    let attachedData = {};

    switch(tipo){
        case 1:
          attachedData = {
            title:'Arribos',
            desc: 'Cantidad de piezas arribadas.',
            displayedColumns: this.displayedColumns,
            dataSource: this.sendSource
          };
        break;

        case 2:
          attachedData = {
            title:'Planeación',
            desc: 'Cantidad de piezas planificadas.',
            displayedColumns: this.displayedColumnsPlan,
            dataSource: this.sendSourcePlan
          };
        break;
    }

    const modalRef = this.modal.open(TableInventariosModalComponent, {
      centered:true,
      size:'xl',
      windowClass:'redondo'
    });

   

    modalRef.componentInstance.data = attachedData;

  }

}
