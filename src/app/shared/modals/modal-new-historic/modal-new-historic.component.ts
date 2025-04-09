import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../../../api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-new-historic',
  imports: [],
  templateUrl: './modal-new-historic.component.html',
  styleUrl: './modal-new-historic.component.scss'
})
export class ModalNewHistoricComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef;

  protected data: any;
  protected idValue: number;
  protected idPlan: number;

  protected originalData: any[] = [];

  constructor(private service: ApiService, private active: NgbActiveModal){
      this.idValue = 0;
      this.idPlan = 0;
  }

  ngOnInit(): void{
    console.log("data received:", this.data);

    this.idValue = this.data.idValue;
    this.idPlan = this.data.idPlan;
    this.originalData = this.data.ogData;

    
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
 

  closeModal(){
    this.active.close();
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



  saveNewPlan(){
    let nameValue = this.nameInput.nativeElement.value;

    console.log("new name: ", nameValue);

    if(nameValue === '') return;
    else this.saveVersion();
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

  this.closeModal();

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
  
    if(this.idPlan === 1){
        //pName = 'plan públicoss version' + String(this.idValue);
        pName = this.nameInput.nativeElement.value;
        pType  = 'publico';

        await this.savePublicPlan(pName, pType);
      }else if(this.idPlan === 2){

        
        //pName = 'plan privado version' + String(this.idValue);
        pName = this.nameInput.nativeElement.value;

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
          this.closeModal();

  
      
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
      
  
  
   
  }


