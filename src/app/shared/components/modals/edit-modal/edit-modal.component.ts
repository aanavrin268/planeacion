import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';  
import { MatFormFieldModule } from '@angular/material/form-field';  
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { IconBadgeComponent } from '../../../ui/icon-badge/icon-badge.component';


@Component({
  selector: 'app-edit-modal',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, CommonModule, FormsModule,
    IconBadgeComponent
  ],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss'
})
export class EditModalComponent implements OnInit {
  @ViewChild('inputAllValues') inputAllValues!: ElementRef;

  editForm: FormGroup;

  protected showEdit: boolean;

  protected enero_disabled!: boolean;
  protected febrero_disabled!: boolean;
  protected marzo_disabled!: boolean;
  protected isToggled: boolean;

  protected item: string;
  protected proveedor: string;

  protected currentMonth: any;
  protected monthQ: any;

  protected ogMothsData: any = {
    enero: 0, febrero: 0, marzo: 0, abril:0, mayo:0, junio:0, julio:0,
    agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre:0
  }

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

    this.showEdit = false;

    this.item = "";
    this.proveedor = "";
    this.isToggled = false;

    this.enero_disabled = false;
    this.febrero_disabled = false;
    this.marzo_disabled = false;

   }


  ngOnInit(): void {

    this.getMonthlyData();


    //const descripcion = this.row.id_plan === 1 ? this.row.nombre : '';
    //const proveedor = this.row.id_plan === 1 ? this.row.proveedor : ''

    
    const descripcion = this.row.nombre;
    const proveedor = this.row.proveedor;

    this.item = descripcion;
    this.proveedor = proveedor;

    console.log("recived data from father", this.row);
    this.editForm.patchValue({
      clave: this.row.clave,
      proveedor: proveedor,
      descripcion: descripcion,
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

    this.setEditablesInputs();

    this.item = this.editForm.get('descripcion')?.value;
    this.proveedor = this.editForm.get('proveedor')?.value;

  }

  resetAllValues(){
    this.editForm.patchValue({
      abril: this.ogMothsData.abril,
      mayo: this.ogMothsData.mayo,
      junio: this.ogMothsData.junio,
      julio: this.ogMothsData.julio,
      agosto: this.ogMothsData.agosto,
      septiembre: this.ogMothsData.septiembre,
      octubre: this.ogMothsData.octubre,
      noviembre: this.ogMothsData.noviembre,
      diciembre: this.ogMothsData.diciembre
    });
  }


  planchAllVlaues(){
    this.ogMothsData.abril = this.editForm.get('abril')?.value;  
    this.ogMothsData.mayo = this.editForm.get('mayo')?.value;  
    this.ogMothsData.junio = this.editForm.get('junio')?.value;  
    this.ogMothsData.julio = this.editForm.get('julio')?.value;  
    this.ogMothsData.agosto = this.editForm.get('agosto')?.value;  
    this.ogMothsData.septiembre = this.editForm.get('septiembre')?.value; 
    this.ogMothsData.octubre = this.editForm.get('octubre')?.value;  
    this.ogMothsData.noviembre = this.editForm.get('noviembre')?.value;  
    this.ogMothsData.diciembre = this.editForm.get('diciembre')?.value;   




    console.log("hola");

   let value = this.inputAllValues.nativeElement.value;
    console.log("value", value);

    

    

    this.editForm.patchValue({
      abril: value,
      mayo: value,
      junio: value,
      julio: value,
      agosto: value,
      septiembre: value,
      octubre: value,
      noviembre: value,
      diciembre: value
    });
    
  }


  setEditablesInputs(){
    if(this.monthQ === 'Q2'){
      this.editForm.patchValue({
          enero: this.row.fac_enero,
          febrero: this.row.fac_febrero,
          marzo: this.row.fac_marzo,
      });

      this.editForm.get('enero')?.disable();
      this.editForm.get('febrero')?.disable();
      this.editForm.get('marzo')?.disable();

      this.enero_disabled = true;
      this.febrero_disabled = true;
      this.marzo_disabled = true;
    }
  }



  getMonthlyData(){
     const current_date = new Date();
        this.currentMonth = current_date.getMonth() +1;
    
   
        if(this.currentMonth >= 1 && this.currentMonth <=3){
          this.monthQ = 'Q1';
    
    
        } else if(this.currentMonth > 3  && this.currentMonth <=6){
          this.monthQ = 'Q2';
        
        } else if(this.currentMonth > 7  && this.currentMonth <=9){
          this.monthQ = 'Q3';
  
        } else if(this.currentMonth > 9  && this.currentMonth <=12){
          this.monthQ = 'Q4';
    
        }
    
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
    const convertNumber = (value: any): number => {
      if (value === null || value === undefined) return 0;
      if (typeof value === 'number') return value;
      const numStr = String(value).replace(/,/g, '');
      return parseInt(numStr, 10) || 0;
    };
    

    //const table = 'DetallePlan';
    const table = 'PlanPublico2025_back';
    const condition = 'clave';

    //const table =  'vw_final_plan_public';
    //const condition = 'clave';
    const condition_value = this.editForm.get('clave')?.value;


    

    
    const months = {
        "enero": convertNumber(this.editForm.get('enero')?.value),
        "febrero": convertNumber(this.editForm.get('febrero')?.value),
        "marzo": convertNumber(this.editForm.get('marzo')?.value),
        "abril": convertNumber(this.editForm.get('abril')?.value),
        "mayo": convertNumber(this.editForm.get('mayo')?.value),
        "junio": convertNumber(this.editForm.get('junio')?.value),
        "julio": convertNumber(this.editForm.get('julio')?.value),
        "agosto": convertNumber(this.editForm.get('agosto')?.value),
        "septiembre": convertNumber(this.editForm.get('septiembre')?.value),
        "octubre": convertNumber(this.editForm.get('octubre')?.value),
        "noviembre": convertNumber(this.editForm.get('noviembre')?.value),
        "diciembre": convertNumber(this.editForm.get('diciembre')?.value),

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







actualizarDetallePrivado() {
  const convertNumber = (value: any): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    const numStr = String(value).replace(/,/g, '');
    return parseInt(numStr, 10) || 0;
  };
  

    

  const table = 'PlanPrivado2025_back';
  const condition = 'clave';
  const condition_value = this.editForm.get('clave')?.value;
  
  const months = {
    "enero": convertNumber(this.editForm.get('enero')?.value),
    "febrero": convertNumber(this.editForm.get('febrero')?.value),
    "marzo": convertNumber(this.editForm.get('marzo')?.value),
    "abril": convertNumber(this.editForm.get('abril')?.value),
    "mayo": convertNumber(this.editForm.get('mayo')?.value),
    "junio": convertNumber(this.editForm.get('junio')?.value),
    "julio": convertNumber(this.editForm.get('julio')?.value),
    "agosto": convertNumber(this.editForm.get('agosto')?.value),
    "septiembre": convertNumber(this.editForm.get('septiembre')?.value),
    "octubre": convertNumber(this.editForm.get('octubre')?.value),
    "noviembre": convertNumber(this.editForm.get('noviembre')?.value),
    "diciembre": convertNumber(this.editForm.get('diciembre')?.value),

};

  const monthsJson = JSON.stringify(months);


  console.log("meses", monthsJson);

  this.service.actualizarDetallePlanPrivado(table, condition, condition_value, monthsJson)
    .subscribe(
      response => {

        console.log("update data:", response);
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


      if(this.row.id_plan === 1){
        console.log("ES 1");
        this.actualizarDetalle();


        


      }else if(this.row.id_plan === 2){
        console.log("ES 2")
        this.actualizarDetallePrivado();
      }

      //this.actualizarDetalle();

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
