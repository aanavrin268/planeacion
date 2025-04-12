import { Component, OnInit } from '@angular/core';


  interface PLAN{
    clave: string;
    nombre: string;
    inventario: string;
    enero: string;
    febrero: string;
    marzo: string;
    abril: string;
  }

@Component({
  selector: 'app-canicas',
  imports: [],
  templateUrl: './canicas.component.html',
  styleUrl: './canicas.component.scss'
})
export class CanicasComponent implements OnInit {

  data1: PLAN[] = [];
  data2: PLAN[] = [];
  data3: PLAN[] = [];


  jsonDiff: any[] = [];

 


  constructor(){
    this.data1= [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "10", febrero: "10", marzo: "10", abril: "10"}, 
      {clave: "100.00.12", nombre: "captodril", inventario: "1", enero: "1", febrero: "1", marzo: "1", abril: "1"},
      {clave: "100.00.13", nombre: "busulfan", inventario: "2", enero: "1", febrero: "1", marzo: "1", abril: "10"}


    ]

    this.data2= [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "8", febrero: "8", marzo: "8", abril: "7"}, 
      {clave: "100.00.12", nombre: "captodril", inventario: "1", enero: "11", febrero: "11", marzo: "11", abril: "12"},
      {clave: "100.00.13", nombre: "busulfan", inventario: "2", enero: "1", febrero: "1", marzo: "1", abril: "1"}


    ]

    this.data3= [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "10", febrero: "10", marzo: "10", abril: "10"}, 
      {clave: "100.00.12", nombre: "captodril", inventario: "100", enero: "1", febrero: "1", marzo: "1", abril: "1"},
      {clave: "100.00.13", nombre: "busulfan", inventario: "100", enero: "1", febrero: "1", marzo: "1", abril: "1"}


    ]
  }
  ngOnInit(): void {

    this.compareData(this.data1, this.data2);
    this.compareData(this.data1, this.data3);

  }



  compareData(dataSoruce1: PLAN[], dataSource2: PLAN[]) {
    // Objeto para mapear por clave y facilitar la comparación
    const map1: { [key: string]: PLAN } = {};
    const map2: { [key: string]: PLAN } = {};
    
    // Mapear data1 por clave
    dataSoruce1.forEach(item => {
      map1[item.clave] = item;
    });
    
    // Mapear data2 por clave
    dataSource2.forEach(item => {
      map2[item.clave] = item;
    });
    
    // Conjunto de todas las claves únicas
    const allKeys = new Set([...Object.keys(map1), ...Object.keys(map2)]);
    
    this.jsonDiff = [];
    
    allKeys.forEach(clave => {
      const item1 = map1[clave];
      const item2 = map2[clave];
      
      // Si el elemento existe en ambos arrays
      if (item1 && item2) {
        const diffs: { propiedad: string; valores: { valor1: string; valor2: string; }; }[] = [];
        
        // Obtener todas las propiedades del objeto (excluyendo clave y nombre)
        const properties = Object.keys(item1).filter(prop => prop !== 'clave' && prop !== 'nombre');
        
        // Comparar cada propiedad dinámicamente
        properties.forEach(prop => {
          // Usar acceso de propiedades con type assertion para evitar el error de TypeScript
          const value1 = (item1 as unknown as {[key: string]: string})[prop];
          const value2 = (item2 as unknown as {[key: string]: string})[prop];
          
          if (value1 !== value2) {
            diffs.push({
              propiedad: prop,
              valores: { valor1: value1, valor2: value2 }
            });
          }
        });
        
        // Si hay diferencias, agregar al resultado
        if (diffs.length > 0) {
          this.jsonDiff.push({
            nombre: item1.nombre,
            diffs: diffs
          });
        }
      }
      // Si existe en data1 pero no en data2 o viceversa, lo ignoramos
      // ya que solo queremos elementos que estén en ambos pero con diferencias
    });
    
    console.log('Diferencias encontradas:', this.jsonDiff);
  }



}
