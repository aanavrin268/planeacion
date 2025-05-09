import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanDataService } from '../../services/plan-data.service';
import { Column } from '../../models/plan.model';

interface ITEM_WITH_ICON{
  id: number;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-new-agregate-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-agregate-modal.component.html',
  styleUrl: './new-agregate-modal.component.scss'
})
export class NewAgregateModalComponent implements OnInit {

  protected list_functions: ITEM_WITH_ICON[] = [];
  protected columns_filtered: any[] = [];
  protected newAgregateColumn: Column;


  constructor(private active: NgbActiveModal, private dataPlanService: PlanDataService){
    this.newAgregateColumn = {} as Column;

    this.list_functions = [
      {id: 1, title: 'Suma', icon: 'bi bi-plus'}, {id: 2, title: 'Promedio', icon: 'bi bi-percent'}
    ];
  }

  ngOnInit(): void {
    this.dataPlanService.currentColumns$.subscribe(
      {
        next:(data) => {
          console.log("current colums fesde new aggre: ", data);

          const filtered_data = data.filter(cols => cols.agregate);

          this.columns_filtered = filtered_data.map(columns => ({
            ...columns,
            selected: false
          }));

          console.log("filtered agregate list: ", this.columns_filtered);
        }
      }
    );
  }

  onFunctionSelected(item:ITEM_WITH_ICON){
    let idValue = item.id;
    let header_value = '';

    switch(idValue){
      case 1:
        //sumar
        break;
      case 2:
        //avg
        break;
    }
  }

  onRemoveItem(column: any){

    const searchingValue = this.columns_filtered.find(cols => cols.key === column.key);

    if(searchingValue){
      console.log("valor para remover encontrado", searchingValue);
      searchingValue.selected = false;
    }else {
      console.error("ERROR, no se encontro el valor a remover", searchingValue);
    }
  }

  onChangeOption(event: Event){
    let targets = event.target as HTMLSelectElement;

    let values = targets.value;

    console.log("el change values: ", values);

   const searchingValue = this.columns_filtered.find(cols => cols.key === values);

   if(searchingValue){
    console.log("fue encoentrado", searchingValue);

    searchingValue.selected = true;

   }else{
    console.error("ERROR, valor no enctrado", searchingValue);
   }


  }


  get allNonSelectedColumns(): any[] {
    return this.columns_filtered.filter(cols => !cols.selected);
  }

  get allSelectedColumns():any[]{
    return this.columns_filtered.filter(cols => cols.selected);
  }

  onSave(){

  }

  close(){
    this.active.close();
  }

}



/*

  0.- Bus de datos
    Arquitectura centralizada de datos.
    Permite centralizar el flujo de datos que comparter diferente tecnologias de la empresa (organizacion)
    como son BDs, APIS, apps y data warehouse.
    ANALOGIA: Es como un rtp, siedo el rtp el bus de datos. Los pasajeros son los datos. Las diferetens paradas o estaciones
    serían las aplicación que utilizan los datos. Los horarios, rutas, etc serían las politicas de gobernzna.
    -Interoperatribilidad: Conectad diferentes sistemas heterogeneos.

      -Data hub
      -AirFlow
      -Grate expectations
      -Apachi NIFI
      -Apache Kafka
      -AirByte
      -ETL PipeLine
      -ELK Stack

  1- Catalogación de activos de datos.
    Se catalagon todos los activos de datos (objetos de la bd)
    Se catalagan los metadatos (tanto los metadatos de los obejtos de la bd como la propia BD en si)
    Se inventarían los activos de datos.
    Se crea un catalogo de activos gobernando.
    Se definen modelos de datos gobernados aplicados al catalogo estructurado.

  2- Creación de protocolos, reglas y defición de roles basados en la segurdad/accesidibildiad.
    Se crean políticas de acceso a los datos.
    Se crean protocolos de acceso a los datos.
    Se determinan los data owners, data steward y los data clients para cada tabla.
    Se crean políticas de acceso de de datos, restricciones y protocolos de acceso a los mismos.
    Se modifican/aplican estas politicas/protocolos a la bd actual, tomando en cuenta principalmente el acceso
    Protección y definicion de datos sensibles.
    Separación de esquemas públicos y esquemas sensibles.
    y el permiso que que cada data owner y stwward debe cumplicar.
    Cifrado de datos  (en proceso y en transtito)
    Reguaciones de datos GDPR Y PII

  3.- Linaje de datos
    TLS/SSL (capa de transport segura y capa de sockets seguros) estandar de conexión (
    cifrado en transito).
    Open SSL
    Trazabilidad
    Mapeo del linaje
    -Monitoreo y audotira
    Automatización
    Cultura de datos


*/



/** 
 * 
 * 
 * 
 * 
 * Ejemplo:
Flujo: Los datos de clientes.id se usan en ventas.id_cliente para calcular totales en ventas_por_region.
Linaje en DataHub: Un diagrama muestra: clientes → ventas → ventas_por_region.
Cumplimiento: El linaje documenta cómo los datos sensibles (como clientes.email) se transforman, ayudando a auditorías GDPR.
*/