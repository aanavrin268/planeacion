import { Component } from '@angular/core';
import { PivotTableXComponent } from '../modules/planificacion/components/pivot-table-x/pivot-table-x.component';

@Component({
  selector: 'app-test-pivotss',
  imports: [PivotTableXComponent],
  templateUrl: './test-pivotss.component.html',
  styleUrl: './test-pivotss.component.scss'
})
export class TestPivotssComponent {

  pivotData = [{
    "nombre": "Busulfan",
    "inventario": 3000,
    "enero": 100,
    "fac_enero": 1000,
    "febrero": "200",
    "fac_febrero": "1000",
    "marzo": "100",
    "fac_marzo": "3000",
    "clave": "",
    "disponibles": 0,
    "abril": "100",
    "fac_abril": "1000",
    "mayo": "100",
    "fac_mayo": "0",
    "junio": "1000",
    "fac_junio": "0",
    "julio": "2000",
    "fac_julio": "0",
    "agosto": "2000",
    "fac_agosto": "0",
    "septiembre": "",
    "fac_septiembre": "",
    "octubre": "",
    "fac_octubre": "",
    "noviembre": "",
    "fac_noviembre": "",
    "diciembre": "",
    "fac_diciembre": ""
  }];

}
