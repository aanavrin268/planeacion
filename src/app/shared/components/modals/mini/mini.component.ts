import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbDatepickerModule




@Component({
  selector: 'app-mini',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbDatepickerModule
  ],  templateUrl: './mini.component.html',
  styleUrl: './mini.component.scss'
})
export class MiniComponent {

  startDate: NgbDateStruct | null = null;
  endDate: NgbDateStruct | null = null;


  constructor() {
  
  }


}
