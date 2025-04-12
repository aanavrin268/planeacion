import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


  interface PLAN{
    clave: string;
    nombre: string;
    inventario: string;
    enero: string;
    facturacion_enero: string;
    febrero: string;
    facturacion_febrero: string;
    marzo: string;
    facturacion_marzo: string;
    abril: string;
    mayo: string;
    junio: string;

  }

@Component({
  selector: 'app-canicas',
  imports: [CommonModule],
  templateUrl: './canicas.component.html',
  styleUrl: './canicas.component.scss'
})
export class CanicasComponent implements OnInit {

  data1: PLAN[] = [];
  data2: PLAN[] = [];
  data3: PLAN[] = [];

  showResume: boolean = false;


  jsonDiff: any[] = [];

 


  constructor(){
    this.data1= [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "10", facturacion_enero: "1000", febrero: "10", facturacion_febrero: "10000",
        marzo: "10", facturacion_marzo: "1000", abril: "10",
        mayo: "10", junio:"11",
      }, 
      {clave: "100.00.12", nombre: "captodril", inventario: "1", enero: "1", facturacion_enero: "100", febrero: "1", facturacion_febrero: "10000",
         marzo: "1", facturacion_marzo: "1200", abril: "1",
        mayo: "1", junio:"23",
      },
      {clave: "100.00.13", nombre: "busulfan", inventario: "2", enero: "1", facturacion_enero: "100",  febrero: "1", facturacion_febrero: "1000",
        marzo: "1", facturacion_marzo: "10000", abril: "10",
        mayo: "2", junio:"2",
      }
    ]

    this.data2= [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "8", facturacion_enero: "123000", febrero: "8", facturacion_febrero: "123000",
         marzo: "8", facturacion_marzo: "123000", abril: "7",
        mayo: "1", junio:"9",
      }, 
      {clave: "100.00.12", nombre: "captodril", inventario: "1", enero: "11", facturacion_enero: "100234", febrero: "11", facturacion_febrero: "100234",
         marzo: "11", facturacion_marzo: "100234", abril: "12",
        mayo: "10", junio:"11",
      },
      {clave: "100.00.13", nombre: "busulfan", inventario: "2", enero: "1", facturacion_enero: "200212", febrero: "1", facturacion_febrero: "200212",
         marzo: "1", facturacion_marzo: "200212", abril: "1",
        mayo: "11", junio:"11",
      }


    ]

    this.data3= [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "10", facturacion_enero: "100", febrero: "10", facturacion_febrero: "100", 
         marzo: "10", facturacion_marzo: "100", abril: "10", 
        mayo: "12", junio: "12"
      }, 
      {clave: "100.00.12", nombre: "captodril", inventario: "100", enero: "1", facturacion_enero: "200", febrero: "1",  facturacion_febrero: "200", 
        marzo: "1", facturacion_marzo: "200", abril: "1", 
        mayo: "12", junio: "12"
      },
      {clave: "100.00.13", nombre: "busulfan", inventario: "100", enero: "1", facturacion_enero: "200", febrero: "1",  facturacion_febrero: "200", 
        marzo: "1", facturacion_marzo: "200", abril: "1", 
        mayo: "12", junio: "12"
      }


    ]
  }
  ngOnInit(): void {

    this.compareData(this.data1, this.data2);
    this.compareData(this.data1, this.data3);


    // Análisis de precisión
  const accuracy = this.calculateMostAccuratePlan();
  console.log('Plan más preciso:', accuracy);

  // Estilo de planeación
  const styles = this.calculatePlanningStyle();
  console.log('Estilos de planeación:', styles);

  // Costo de oportunidad
  const costs = this.calculateOpportunityCost();
  console.log('Costos de oportunidad:', costs);

  // Eficiencia de inventario
  const efficiency = this.calculateInventoryEfficiency();
  console.log('Eficiencia de inventario:', efficiency);

  }

  openResumen(){
    this.showResume = !this.showResume;
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

  /**
 * Calcula qué plan tuvo una planeación más cercana a la realidad (ventas fijas)
 */
calculateMostAccuratePlan(): { plan: string, accuracy: number } {
  const accuracy2 = this.calculatePlanningAccuracy(this.data2);
  const accuracy3 = this.calculatePlanningAccuracy(this.data3);
  
  return accuracy2 > accuracy3 
    ? { plan: 'data2', accuracy: accuracy2 }
    : { plan: 'data3', accuracy: accuracy3 };
}

private calculatePlanningAccuracy(data: PLAN[]): number {
  let totalAccuracy = 0;
  
  data.forEach(item => {
    // Comparar lo planeado cada mes con lo facturado (que es fijo)
    const eneroDiff = Math.abs(parseInt(item.enero) - parseInt(item.facturacion_enero));
    const febreroDiff = Math.abs(parseInt(item.febrero) - parseInt(item.facturacion_febrero));
    const marzoDiff = Math.abs(parseInt(item.marzo) - parseInt(item.facturacion_marzo));
    
    // Invertimos la diferencia para que mayor sea mejor (100% - % de diferencia)
    totalAccuracy += 100 - (eneroDiff / parseInt(item.facturacion_enero) * 100);
    totalAccuracy += 100 - (febreroDiff / parseInt(item.facturacion_febrero) * 100);
    totalAccuracy += 100 - (marzoDiff / parseInt(item.facturacion_marzo) * 100);
  });
  
  return totalAccuracy / (data.length * 3); // Promedio de precisión por mes
}

/**
 * Evalúa qué plan tuvo mejor manejo de inventario (planeado vs vendido)
 */
calculateInventoryEfficiency(): { plan: string, efficiency: number } {
  const efficiency2 = this.calculateInventoryScore(this.data2);
  const efficiency3 = this.calculateInventoryScore(this.data3);
  
  return efficiency2 > efficiency3 
    ? { plan: 'data2', efficiency: efficiency2 }
    : { plan: 'data3', efficiency: efficiency3 };
}

private calculateInventoryScore(data: PLAN[]): number {
  return data.reduce((score, item) => {
    const totalSold = parseInt(item.facturacion_enero) + 
                     parseInt(item.facturacion_febrero) + 
                     parseInt(item.facturacion_marzo);
    
    // Puntaje más alto cuando el inventario planeado está más cerca de lo vendido
    return score + (100 - Math.abs(parseInt(item.inventario) - totalSold));
  }, 0);
}

/**
 * Identifica qué plan fue más conservador/agresivo en sus proyecciones
 */
calculatePlanningStyle(): { 
  plan2: { style: string, score: number }, 
  plan3: { style: string, score: number } 
} {
  const style2 = this.determinePlanningStyle(this.data2);
  const style3 = this.determinePlanningStyle(this.data3);
  
  return {
    plan2: style2,
    plan3: style3
  };
}

private determinePlanningStyle(data: PLAN[]): { style: string, score: number } {
  let overPlan = 0;
  let underPlan = 0;
  
  data.forEach(item => {
    // Comparar lo planeado vs facturado para cada mes
    if (parseInt(item.enero) > parseInt(item.facturacion_enero)) overPlan++;
    else if (parseInt(item.enero) < parseInt(item.facturacion_enero)) underPlan++;
    
    if (parseInt(item.febrero) > parseInt(item.facturacion_febrero)) overPlan++;
    else if (parseInt(item.febrero) < parseInt(item.facturacion_febrero)) underPlan++;
    
    if (parseInt(item.marzo) > parseInt(item.facturacion_marzo)) overPlan++;
    else if (parseInt(item.marzo) < parseInt(item.facturacion_marzo)) underPlan++;
  });
  
  const total = overPlan + underPlan;
  const overPercentage = (overPlan / total) * 100;
  
  if (overPercentage > 70) return { style: 'Conservador', score: overPercentage };
  if (overPercentage < 30) return { style: 'Agresivo', score: 100 - overPercentage };
  return { style: 'Balanceado', score: 50 };
}

/**
 * Calcula el costo de oportunidad de cada plan
 */
calculateOpportunityCost(): { 
  plan2: { cost: number, details: string }, 
  plan3: { cost: number, details: string } 
} {
  const cost2 = this.computeOpportunityCost(this.data2);
  const cost3 = this.computeOpportunityCost(this.data3);
  
  return {
    plan2: cost2,
    plan3: cost3
  };
}

private computeOpportunityCost(data: PLAN[]): { cost: number, details: string } {
  let lostSales = 0;
  let excessInventory = 0;
  
  data.forEach(item => {
    // Ventas perdidas (planeó menos de lo vendido)
    lostSales += Math.max(0, parseInt(item.facturacion_enero) - parseInt(item.enero));
    lostSales += Math.max(0, parseInt(item.facturacion_febrero) - parseInt(item.febrero));
    lostSales += Math.max(0, parseInt(item.facturacion_marzo) - parseInt(item.marzo));
    
    // Exceso de inventario (planeó más de lo vendido)
    excessInventory += Math.max(0, parseInt(item.enero) - parseInt(item.facturacion_enero));
    excessInventory += Math.max(0, parseInt(item.febrero) - parseInt(item.facturacion_febrero));
    excessInventory += Math.max(0, parseInt(item.marzo) - parseInt(item.facturacion_marzo));
  });
  
  return {
    cost: lostSales + (excessInventory * 0.5), // Ponderar exceso de inventario
    details: `Ventas perdidas: ${lostSales}, Exceso inventario: ${excessInventory}`
  };

}



}
