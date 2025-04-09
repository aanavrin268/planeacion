import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';  
import { MatFormFieldModule } from '@angular/material/form-field';  
import { ApiService } from '../../../api.service';


@Component({
  selector: 'app-modal-multi-editss',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './modal-multi-editss.component.html',
  styleUrl: './modal-multi-editss.component.scss'
})
export class ModalMultiEditssComponent implements OnInit {
  @ViewChild('absolute') absolute!: ElementRef;

   rows: any[] = [];
    formGroups: FormGroup[] = [];
    months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
              'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    protected isToggled: boolean;
    protected rows_og: any[] = [];
  
    constructor(private active: NgbActiveModal, private fbuilder: FormBuilder, private service: ApiService){
      this.isToggled = false;

    }
  
    ngOnInit(): void {
      console.log('many', this.rows);
      this.rows_og = JSON.parse(JSON.stringify(this.rows));
      console.log('Datos originales guardados:', this.rows_og);
      
      
      this.rows.forEach((row) => {
        const monthControls: any = {};
        
        this.months.forEach(month => {
          monthControls[month] = [row[month]]; 
        });
        
        const formGroup = this.fbuilder.group(monthControls);
        this.formGroups.push(formGroup);
      });
    }

    resetOgValues() {
      this.rows = JSON.parse(JSON.stringify(this.rows_og)); 
    
      this.rows.forEach((row, index) => {
        const formGroup = this.formGroups[index];
        if (formGroup) {
          formGroup.patchValue(row); 
        }
      });
    
      console.log("Todos los datos reseteados:", this.rows);
    }

    setAbsoluteValue() {
      let absValue = this.absolute.nativeElement.value;
      console.log("value", absValue);
    
      const meses = [
        'abril', 'mayo', 'junio', 'julio', 'agosto',
        'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
    
      this.rows.forEach((row, index) => {
        meses.forEach(mes => {
          row[mes] = absValue;
          
          const formGroup = this.formGroups[index];
          if (formGroup) {
            formGroup.get(mes)?.setValue(absValue);
          }
        });
      });
    
      console.log("Arreglo actualizado:", this.rows);
    }
    
  
    getUpdatedValues() {
      return this.rows.map((row, index) => ({
        ...row,
        ...this.formGroups[index].value
      }));
    }



  
    close() {

      this.resetOgValues();
      
      this.active.close();
    }
  
    save() {
      const updatedData = this.getUpdatedValues();
      console.log('updaedValus', updatedData);
      //this.active.close(updatedData);
  
      this.actualizarDetalle(updatedData);
    }
  
  
  
    actualizarDetalle(data: any[]) {
      const convertNumber = (value: any): number => {
        if (value === null || value === undefined) return 0;
        if (typeof value === 'number') return value;
        const numStr = String(value).replace(/,/g, '');
        return parseInt(numStr, 10) || 0;
      };
      


      const updatePromises = data.map(item => {
        const table = 'DetallePlan';
        const condition = 'clave institucional';
        const condition_value = item.clave;
        
        const months = {
          "Enero F": convertNumber(item.enero),
          "Febrero F": convertNumber(item.febrero),
          "Marzo F": convertNumber(item.marzo),
          "Abril F": convertNumber(item.abril),
          "Mayo F": convertNumber(item.mayo),
          "Junio F": convertNumber(item.junio),
          "Julio F": convertNumber(item.julio),
          "Agosto F": convertNumber(item.agosto),
          "Septiembre F": convertNumber(item.septiembre),
          "Octubre F": convertNumber(item.octubre),
          "Noviembre F": convertNumber(item.noviembre),
          "Diciembre F": convertNumber(item.diciembre)
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
