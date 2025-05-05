import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanAllDetails } from '../../models/plan.model';
import { PlanDataService } from '../../services/plan-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanService } from '../../services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-historic-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-historic-modal.component.html',
  styleUrl: './new-historic-modal.component.scss'
})
export class NewHistoricModalComponent implements OnInit {

  protected currentData: PlanAllDetails;
  protected newHistoric: PlanAllDetails;
  
  protected nameInput: string;
  protected descInput: string;
  protected bundle: any;

  constructor(private active: NgbActiveModal, private planDataService: PlanDataService, private planService: PlanService){

    this.currentData = {} as PlanAllDetails;
    this.newHistoric = {} as PlanAllDetails;

    this.nameInput = '';
    this.descInput = '';
  }


  ngOnInit(): void {
    this.planDataService.currentPlan$.subscribe(
      {
        next: (data) => {
          console.log("CURRENT DATA DESDE MODAL NEW HISTORIC", data);
          this.currentData = {...data};
        }
      }
    );

  }




  onCancel(){
    this.active.close();
  }

  async saveHistoric() {
    const loader = Swal.fire({
      title: 'Guardando datos...',
      html: 'Por favor espera mientras se procesa la información.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    try {
      this.newHistoric = { ...this.bundle.planData };
      this.newHistoric.nombre = this.nameInput;
      this.newHistoric.descripcion = this.descInput;
  
      console.warn("DATA TO SAVE about plan", this.newHistoric);
  
      const unpivoteData = this.despivotAllMonths(this.currentData.info);
      console.warn("DATA DEL DETAILS TO SAVE", unpivoteData);
  
      await this.insertPlanPromise();
      await this.insertPlanDetailsPromise(unpivoteData);
  
      Swal.close();
  
      Swal.fire({
        title: 'Acción correcta',
        text: 'Backup generado y guardado con éxito!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
  
      this.onCancel();
  
    } catch (err) {

      Swal.close();
      
      Swal.fire('Error', 'Ha ocurrido un error al guardar el backup', 'error');
      console.error("Error en saveHistoric:", err);
    }
  }

   despivotAllMonths(pivotedData: any[]): any[] {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  
    const result: any[] = [];
  
    pivotedData.forEach(item => {
      months.forEach(month => {
        result.push({
          id_plan: 2222, 
          clave: item.clave || '', 
          disponibles: item.disponibles || 0,
          mes: month,
          unidades_planificadas: item[month] ? Number(item[month]) : 0,
          unidades_facturadas: item[`fac_${month}`] ? Number(item[`fac_${month}`]) : 0,
          proveedor_id: item.proveedor_id || 100
        });
      });
    });
  
    return result;
  }
  


  insertPlanDetailsPromise(unpivotedData: any): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.planService.createPlanDetailsGql(unpivotedData).subscribe(
        {
          next:(response) => {
            console.warn("ATTEPMT INSERT PLAN DETAILES", response);
            resolve(true);
          },
          error:(err) => {
            reject(false);
          }
        }
      )
    });
  }

  insertPlanPromise(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.planService.createPlanGql(this.newHistoric).subscribe(
        {
          next:(data) => {
            console.log("attempt to inseRt", data);
            resolve(true);
          },
          error:(err)=> {
            reject(false);
          }
        }
      );
      
    });
  }

}
