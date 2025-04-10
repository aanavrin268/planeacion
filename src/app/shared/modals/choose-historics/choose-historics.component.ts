import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-choose-historics',
  imports: [CommonModule],
  templateUrl: './choose-historics.component.html',
  styleUrl: './choose-historics.component.scss'
})
export class ChooseHistoricsComponent implements OnInit {
  protected dataBundle: any;

  protected planId: number;
  protected idValue : number;
  protected originalData: any[] = [];
  protected selectedPlanName: string;
  protected selectedPlanId: number | null;
  protected isPlanSelected: boolean;

  protected listData: any[] = [];

  constructor(private service: ApiService, private modal: NgbActiveModal){
      this.planId = 0;
      this.idValue = 0;

      this.selectedPlanId = null;

      this.isPlanSelected = false;

      this.selectedPlanName = '';
  }


  ngOnInit(): void {
    console.log("bundle received", this.dataBundle);
    if(this.dataBundle){
      this.planId = this.dataBundle.idPlan;
      this.idValue = this.dataBundle.idValue;
      this.originalData = this.dataBundle.ogData;


      if(this.planId === 1){
        this.loadPublicList();
      }else if(this.planId ===2 ){
        this.loadPrivateList();
      }
    }

  }

  onSelectItem(item:any, index: number){
    console.log("item ", item);
    this.isPlanSelected =  true;
    this.selectedPlanId = index;
    this.selectedPlanName = item.name;

  }

  loadPrivateList(){
   this.service.getAllPlanPrivadoHistoric().subscribe({
    next:(response) => {
      console.log("private response", response);
      this.listData = response.result;
    }
   })
  }

  loadPublicList(){
    this.service.getAllPlanHistoricUnion().subscribe({
      next:(response) => {
          console.log("public response", response);
          this.listData = response.result;
      }
    });
  }

  onCancel(){
    this.modal.close();
  }

 async onSave(){

  if(!this.isPlanSelected) return;
  else {
    try{

      await this.deleteFirst();
      await this.updateSecond();
  
    }catch(err){
      console.error("error al ejectuar la trnsaccion", err);
    }

  }
  }

  async deleteFirst(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.service.deleteHistoricPublic(this.selectedPlanName).subscribe({
        next:(response) => {
          console.log("primer paso ", response);
          resolve(true);
        },
        error:(response) => {
          console.error('Ha orucrirod un error', response);
          reject(false);
        }
      })

    })
  
  }

  async updateSecond(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      try{
          this.saveVersion();
          resolve(true);

      }catch(err){
          console.error("error al guardar la version", err);
          reject(false);
      }
  
    })
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
   
    
        let pName = '';
        let pType = '';
        this.idValue = this.idValue +1;
    
      if(this.planId === 1){
          pName = this.selectedPlanName;
          pType  = 'publico';
  
          await this.savePublicPlan(pName, pType);
        }else if(this.planId === 2){
  
          
          pName = this.selectedPlanName;
          pType = 'privado';
    
          Swal.fire({
            title: 'Sobrescribiendo...',
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
            this.onCancel();
  
    
        
            Swal.fire({
              icon: 'success',
              title: '¡Actualización exitosa!',
              text: 'Los datos se han actualizado correctamente.',
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


       async savePublicPlan(pName: string, pType: string){
        
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
          title: 'Sobrescribiendo...',
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
          title: '¡Actualización exitosa!',
          text: 'Los datos se actualizado correctamente.',
          confirmButtonText: 'Aceptar'
        });
      
        this.onCancel();
      
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
 
        
        

}
