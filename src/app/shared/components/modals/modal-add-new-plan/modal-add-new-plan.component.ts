import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusService } from '../../../../core/services/status.service';
import { conjuntos, periodos_tiempo, statusss, tipo_producto } from '../../../../core/helpers/readables';
import { MiniComponent } from '../mini/mini.component';



@Component({
  selector: 'app-modal-add-new-plan',
  imports: [ MatStepperModule, CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule],
  templateUrl: './modal-add-new-plan.component.html',
  styleUrl: './modal-add-new-plan.component.scss'
})
export class ModalAddNewPlanComponent implements OnInit {

  secondFormGroup!: FormGroup;
  thirdFg!: FormGroup;


  @ViewChild('stepper') private stepper!: MatStepper;


  protected tipoProveedores: any;
  protected fgEmpresa: FormGroup;

  protected conjuntos_list: any[] = [];
  protected tipo_list: any[] = [];
  protected status_list: any[] = [];
  protected periodos_list: any[] = [];

  protected periodSelected: string;

  protected showPeriodContainer: boolean;

  constructor(private _formBuilder: FormBuilder, private active: NgbActiveModal,
    private statusService: StatusService, private modal: NgbModal
  ) {
    this.fgEmpresa = _formBuilder.group({
      nameCompany:['',Validators.required],
      nameProvider:['',Validators.required ],
      categoryProvider:['',Validators.required],
      typeProvider:['',Validators.required],

    });

 
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdFg = _formBuilder.group({
      
    });


    this.conjuntos_list = conjuntos;
    this.tipo_list = tipo_producto;
    this.status_list = statusss;
    this.periodos_list = periodos_tiempo;

    this.periodSelected = '';

    this.showPeriodContainer = false;
  }

  ngOnInit() {

    /*
    this.statusService.getAllStatus().subscribe({
      next:(data) => {
        console.log('status', data);
      },
      error:(error) => {
        console.error('error:', error);
      }
    });

    this.statusService.getAllConjuntos().subscribe({
      next:(data) => {
        console.log('conjutnos', data);
      }
    });

    
    this.statusService.getAllTipoProducto().subscribe({
      next:(data) => {
        console.log('tipo_producto', data);
      }
    });

    */
  }

  openMini(){
    const modalRef = this.modal.open(MiniComponent, {
      size:'md',
      centered: true,
      windowClass: 'redondo'
    });
  }

  choosePeriod(){
    this.showPeriodContainer = true;
  }


  onSelectChange(event: Event, tipo:number){
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    console.log('es: ', value);

    switch(tipo){
      case 5:
         this.periodSelected = value;
         break;
    }

    }

   

  

  close(){
    this.active.close();
  }

  showFormData(fgEmpresa:any){

  }


  resetStepper() {
    this.secondFormGroup?.reset();
    // Aquí puedes agregar lógica adicional para reiniciar el stepper si es necesario
  }
}
