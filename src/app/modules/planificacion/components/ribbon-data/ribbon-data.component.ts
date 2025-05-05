import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewHistoricModalComponent } from '../new-historic-modal/new-historic-modal.component';
import { PlanState } from '../../store/plan.state';
import { PlanService } from '../../services/plan.service';
import { PlanDetailss, PlanInput } from '../../models/plan.model';
import { PlanDataService } from '../../services/plan-data.service';
import { OverwriteHistoricModalComponent } from '../overwrite-historic-modal/overwrite-historic-modal.component';

@Component({
  selector: 'app-ribbon-data',
  imports: [],
  templateUrl: './ribbon-data.component.html',
  styleUrl: './ribbon-data.component.scss'
})
export class RibbonDataComponent implements OnInit {

  protected editSwitch: boolean;
  protected multiSwitch: boolean;

  constructor(private modal: NgbModal, private state: PlanState, private planService: PlanService, private planDataService: PlanDataService){
    this.editSwitch = false;
    this.multiSwitch = false;
  }


  ngOnInit(): void {


  }

  overwriteHistoric(){


    const modalRef = this.modal.open(OverwriteHistoricModalComponent, {
      centered:true,
      size:'md',
      windowClass: 'redondo'
    });

    //modalRef.componentInstance.bundle = finalBundle;
  }

 
  onSwitchChange(event: Event){
    const isChecked = (event.target as HTMLInputElement).checked;

    if(isChecked){
      console.log("encendido");

    }else {
      console.log("apagado");
    }

    this.state.changeEditValue(isChecked);
    this.activateMultiEdit();


  }

  activateMultiEdit(){
    this.multiSwitch = !this.multiSwitch;
    this.planDataService.toggleActionsColumn(this.multiSwitch);

  }

  allowEdits(){
    this.editSwitch = !this.editSwitch;
    this.state.changeEditValue(this.editSwitch);
  }


  addNewHistoric(){

    const bundleData: PlanInput = {
      nombre: '',
      tipo: 2,
      categoria: 1,
      estado: 1,
      descripcion: ''

    };


    const bundleDataInfo: PlanDetailss[] = [
      {
      id_plan: 1005,
      clave: '010.000.0244.00',
      disponibles: 999,
      mes: 'febrero',
      unidades_planificadas: 100,
      unidades_facturadas: 1000,
      proveedor_id: 8
    },
    {
      id_plan: 1005,
      clave: '010.000.0244.00',
      disponibles: 999,
      mes: 'marzo',
      unidades_planificadas: 100,
      unidades_facturadas: 1000,
      proveedor_id: 8
    },
    {
      id_plan: 1005,
      clave: '010.000.0244.00',
      disponibles: 999,
      mes: 'abril',
      unidades_planificadas: 100,
      unidades_facturadas: 1000,
      proveedor_id: 8
    },
    {
      id_plan: 1005,
      clave: '010.000.0244.00',
      disponibles: 999,
      mes: 'mayo',
      unidades_planificadas: 100,
      unidades_facturadas: 1000,
      proveedor_id: 8
    },
    {
      id_plan: 1005,
      clave: '010.000.0244.00',
      disponibles: 999,
      mes: 'junio',
      unidades_planificadas: 100,
      unidades_facturadas: 1000,
      proveedor_id: 8
    },

    ];

    const finalBundle = {
      planData: bundleData,
      planDetails: bundleDataInfo

    };

    /*
   

    */

    
    const modalRef = this.modal.open(NewHistoricModalComponent, {
      centered:true,
      size:'md',
      windowClass: 'redondo'
    });

    modalRef.componentInstance.bundle = finalBundle;
    


   



  }




}
