import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../api.service';
import { MatInputModule } from '@angular/material/input';  
import { MatFormFieldModule } from '@angular/material/form-field';  

@Component({
  selector: 'app-edit-many-modals',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './edit-many-modals.component.html',
  styleUrl: './edit-many-modals.component.scss'
})
export class EditManyModalsComponent implements OnInit {
  rows: any[] = [];
  formGroups: FormGroup[] = [];
  months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  constructor(private active: NgbActiveModal, private fbuilder: FormBuilder, private service: ApiService){}

  ngOnInit(): void {
    console.log('many', this.rows);
    
    this.rows.forEach((row) => {
      const monthControls: any = {};
      
      this.months.forEach(month => {
        monthControls[month] = [row[month]]; 
      });
      
      const formGroup = this.fbuilder.group(monthControls);
      this.formGroups.push(formGroup);
    });
  }

  getUpdatedValues() {
    return this.rows.map((row, index) => ({
      ...row,
      ...this.formGroups[index].value
    }));
  }

  close() {
    this.active.close();
  }

  save() {
    const updatedData = this.getUpdatedValues();
    console.log('updaedValus', updatedData);
    //this.active.close(updatedData);

    this.actualizarDetalle(updatedData);
  }



  actualizarDetalle(data: any[]) {
    const updatePromises = data.map(item => {
      const table = 'DetallePlan';
      const condition = 'clave institucional';
      const condition_value = item.clave;
      
      const months = {
        "Enero F": item.enero,
        "Febrero F": item.febrero,
        "Marzo F": item.marzo,
        "Abril F": item.abril,
        "Mayo F": item.mayo,
        "Junio F": item.junio,
        "Julio F": item.julio,
        "Agosto F": item.agosto,
        "Septiembre F": item.septiembre,
        "Octubre F": item.octubre,
        "Noviembre F": item.noviembre,
        "Diciembre F": item.diciembre
      };
  
      const monthsJson = JSON.stringify(months);
  
      return this.service.actualizarDetallePlan(table, condition, condition_value, monthsJson).toPromise();
    });
  
    Promise.all(updatePromises)
      .then(() => {
        this.active.close();
        Swal.fire({
          title: '¡Actualización exitosa!',
          text: '¡Todos los registros fueron actualizados con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      })
      .catch(error => {
        this.active.close();
        Swal.fire({
          title: '¡Ups!',
          text: 'Ha ocurrido un error al intentar actualizar algunos registros',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }
  
}