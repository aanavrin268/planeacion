import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusService } from '../../../../core/services/status.service';



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


  @ViewChild('stepper') private stepper!: MatStepper;


  protected tipoProveedores: any;
  protected fgEmpresa: FormGroup;


  constructor(private _formBuilder: FormBuilder, private active: NgbActiveModal,
    private statusService: StatusService
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
  }

  ngOnInit() {
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
