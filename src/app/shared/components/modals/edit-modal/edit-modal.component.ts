import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';  
import { MatFormFieldModule } from '@angular/material/form-field';  
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-modal',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss'
})
export class EditModalComponent implements OnInit {
  editForm: FormGroup;

  row: any;

  constructor(private fbuilder: FormBuilder, private service: ApiService, private active: NgbActiveModal,
    private cdRef: ChangeDetectorRef
  ) {
    this.editForm = fbuilder.group(
      {
        clave: ['', Validators.required],
        proveedor: ['', Validators.required],
        descripcion: ['', Validators.required],
        conjuntos: ['', Validators.required],
        enero: ['', Validators.required],
        febrero: ['', Validators.required],
        marzo: ['', Validators.required],
        abril: ['', Validators.required],
        mayo: ['', Validators.required],
        junio: ['', Validators.required],
        julio: ['', Validators.required],
        agosto: ['', Validators.required],
        septiembre: ['', Validators.required],
        octubre: ['', Validators.required],
        noviembre: ['', Validators.required],
        diciembre: ['', Validators.required],



      }
    );
   }


  ngOnInit(): void {

    console.log("ros", this.row);
    this.editForm.patchValue({
      clave: this.row.clave,
      proveedor: this.row.proveedor,
      descripcion: this.row.descripcion,
      conjuntos: this.row.conjuntos,
      enero: this.row.enero,
      febrero: this.row.febrero,
      marzo: this.row.marzo,
      abril:this.row.abril,
      mayo:this.row.mayo,
      junio:this.row.junio,
      julio:this.row.julio,
      agosto:this.row.agosto,
      septiembre:this.row.septiembre,
      octubre:this.row.octubre,
      noviembre:this.row.noviembre,
      diciembre:this.row.diciembre
    });


    this.editForm.get('clave')?.disable();
    this.editForm.get('descripcion')?.disable();
    this.editForm.get('proveedor')?.disable();
    this.editForm.get('conjuntos')?.disable();

  }



  allowEdit(){
    this.editForm.get('clave')?.enable();
    this.editForm.get('descripcion')?.enable();
    this.editForm.get('proveedor')?.enable();
    this.editForm.get('conjuntos')?.enable();

    this.cdRef.detectChanges();

  }


  close(){
    this.active.close();
  }


  actualizarDetalle() {
    const table = 'DetallePlan';
    const condition = 'clave institucional';
    const condition_value = this.editForm.get('clave')?.value;
    
    const months = {
        "Enero F": this.editForm.get('enero')?.value,
        "Febrero F": this.editForm.get('febrero')?.value,
        "Marzo F": this.editForm.get('marzo')?.value,
        "Abril F": this.editForm.get('abril')?.value,
        "Mayo F": this.editForm.get('mayo')?.value,
        "Junio F": this.editForm.get('junio')?.value,
        "Julio F": this.editForm.get('julio')?.value,
        "Agosto F": this.editForm.get('agosto')?.value,
        "Septiembre F": this.editForm.get('septiembre')?.value,
        "Octubre F": this.editForm.get('octubre')?.value,
        "Noviembre F": this.editForm.get('noviembre')?.value,
        "Diciembre F": this.editForm.get('diciembre')?.value,

    };

    const monthsJson = JSON.stringify(months);


    console.log("meses", monthsJson);

    this.service.actualizarDetallePlan(table, condition, condition_value, monthsJson)
      .subscribe(
        response => {
          this.active.close();


          Swal.fire({
            title: '¡Actualización exitosa!',
            text: '¡Registro actualizado con éxito!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        error => {
          this.active.close();

          Swal.fire({
            title: '¡Ups!',
            text: 'Ha ocurrido un error al intentar actualizar',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
}



  testSend(){

    if(this.editForm.valid){

      const payload = {
        "table":"DetallePlan",
        "field":"Enero F",
        "value": this.editForm.get('enero')?.value,
        "condition":"clave institucional",
        "condition_value":  this.editForm.get('clave')?.value
      };

      this.actualizarDetalle();

    }

/*
      this.service.updateTable(payload.table, payload.field, payload.value, payload.condition,
          payload.condition_value
      ).subscribe(
        {
          next: (response) => { 
            
            console.log("respuesta:" , response);
            this.active.close();


            Swal.fire({
              title: '¡Actualización exitosa!',
              text: '¡Registro actualizado con éxito!',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          
          },
          error: (error) => {
            console.log(error);
          }
        }



      )
      

    }else{
      alert("Formulario invalido");
    }

  */
  }

  onSubmit(){


  }


  
}
