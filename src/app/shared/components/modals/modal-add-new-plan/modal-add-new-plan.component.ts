import { Component, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



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

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;


  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


  resetStepper() {
    this.firstFormGroup?.reset();
    this.secondFormGroup?.reset();
    // Aquí puedes agregar lógica adicional para reiniciar el stepper si es necesario
  }
}
