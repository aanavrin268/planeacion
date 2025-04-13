import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface PLANFULL {
  nombre: string;
  tipo: string;
  data: PLAN[];
}

interface PLAN {
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

type PlanResult = {
  nombre: string;
  data: any[];
};

type ResultType = {
  planA: PlanResult;
  planB: PlanResult;
  planC: PlanResult;
};

@Component({
  selector: 'app-canicas',
  imports: [CommonModule, FormsModule],
  templateUrl: './canicas.component.html',
  styleUrl: './canicas.component.scss',
  standalone: true
})
export class CanicasComponent implements OnInit {
  planA: PLANFULL;
  planB: PLANFULL;
  planC: PLANFULL;

  data1: PLAN[] = [];
  data2: PLAN[] = [];
  data3: PLAN[] = [];

  showEdits: boolean = false;

  showResume: boolean = false;
  jsonDiff: any[] = [];
  plan_list: any[] = [];
  selectedPlanA: any;
  selectedPlanB: any;
  selectedPlanC: any;

  accuracyResult: { plan: string; accuracy: number; improvement: number } = { plan: '', accuracy: 0, improvement: 0 };
  stylesResult: { plan1: { style: string; score: number; name: string }; plan2: { style: string; score: number; name: string }; plan3: { style: string; score: number; name: string } } | null = null;
  costsResult: { plan1: { cost: number; details: string; name: string; percentage: number }; plan2: { cost: number; details: string; name: string; percentage: number }; plan3: { cost: number; details: string; name: string; percentage: number } } | null = null;
  efficiencyResult: { plan: string; efficiency: number; difference: number } = { plan: '', efficiency: 0, difference: 0 };

  constructor(private cdr: ChangeDetectorRef, private active: NgbActiveModal) {
    this.data1 = [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "10", facturacion_enero: "1000", febrero: "10", facturacion_febrero: "10000", marzo: "10", facturacion_marzo: "1000", abril: "10", mayo: "10", junio:"11"},
      {clave: "100.00.12", nombre: "captodril", inventario: "1", enero: "1", facturacion_enero: "100", febrero: "1", facturacion_febrero: "10000", marzo: "1", facturacion_marzo: "1200", abril: "1", mayo: "1", junio:"23"},
      {clave: "100.00.13", nombre: "busulfan", inventario: "2", enero: "1", facturacion_enero: "100", febrero: "1", facturacion_febrero: "1000", marzo: "1", facturacion_marzo: "10000", abril: "10", mayo: "2", junio:"2"}
    ];

    this.data2 = [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "8", facturacion_enero: "123000", febrero: "8", facturacion_febrero: "123000", marzo: "8", facturacion_marzo: "123000", abril: "7", mayo: "1", junio:"9"},
      {clave: "100.00.12", nombre: "captodril", inventario: "1", enero: "11", facturacion_enero: "100234", febrero: "11", facturacion_febrero: "100234", marzo: "11", facturacion_marzo: "100234", abril: "12", mayo: "10", junio:"11"},
      {clave: "100.00.13", nombre: "busulfan", inventario: "2", enero: "1", facturacion_enero: "200212", febrero: "1", facturacion_febrero: "200212", marzo: "1", facturacion_marzo: "200212", abril: "1", mayo: "11", junio:"11"}
    ];

    this.data3 = [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "10", facturacion_enero: "100", febrero: "10", facturacion_febrero: "100", marzo: "10", facturacion_marzo: "100", abril: "10", mayo: "12", junio: "12"},
      {clave: "100.00.12", nombre: "captodril", inventario: "100", enero: "1", facturacion_enero: "200", febrero: "1", facturacion_febrero: "200", marzo: "1", facturacion_marzo: "200", abril: "1", mayo: "12", junio: "12"},
      {clave: "100.00.13", nombre: "busulfan", inventario: "100", enero: "1", facturacion_enero: "200", febrero: "1", facturacion_febrero: "200", marzo: "1", facturacion_marzo: "200", abril: "1", mayo: "12", junio: "12"}
    ];

    this.planA = { nombre: 'plan_conservador', tipo: "1", data: [] };
    this.planB = { nombre: 'plan_normal', tipo: "1", data: [] };
    this.planC = { nombre: 'plan_magico', tipo: "1", data: [] };
  }

  ngOnInit(): void {
    this.planA.data = this.data1;
    this.planB.data = this.data2;
    this.planC.data = this.data3;

    this.plan_list = [this.planA.nombre, this.planB.nombre, this.planC.nombre];
    this.selectedPlanA = this.plan_list[0];
    this.selectedPlanB = this.plan_list[1];
    this.selectedPlanC = this.plan_list[2];

    this.getAllData(this.data1, this.data2, this.data3);
  }


  close(){
    this.active.close();
  }

  finalCheck() {
    const finas = this.checkData();
    console.log('finalCheck finas:', finas);
  
    // Actualizar planA, planB, y planC con los nombres y datos seleccionados
    this.planA = { nombre: finas.planA.nombre, tipo: "1", data: finas.planA.data };
    this.planB = { nombre: finas.planB.nombre, tipo: "1", data: finas.planB.data };
    this.planC = { nombre: finas.planC.nombre, tipo: "1", data: finas.planC.data };
  
    // Recalcular los resultados con los datos actualizados
    this.getAllData(finas.planA.data, finas.planB.data, finas.planC.data);
  }
  checkData() {
    try {
      const result = this.changeData();
      const plansMap = {
        [this.planA.nombre]: this.planA,
        [this.planB.nombre]: this.planB,
        [this.planC.nombre]: this.planC
      };

      const planKeys: Array<keyof ResultType> = ['planA', 'planB', 'planC'];
      const typedResult: ResultType = {} as ResultType;

      planKeys.forEach(key => {
        typedResult[key] = {
          nombre: result[key],
          data: plansMap[result[key]]?.data || []
        };
      });

      console.log('checkData result:', typedResult);
      return typedResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  changeData() {
    const newPlanList = {
      planA: this.selectedPlanA,
      planB: this.selectedPlanB,
      planC: this.selectedPlanC
    };

    const selectedValues = Object.values(newPlanList);
    const uniqueValues = new Set(selectedValues);

    if (selectedValues.length !== uniqueValues.size) {
      throw new Error('No se permiten planes duplicados');
    }

    return newPlanList;
  }

  getAllData(dataS1: PLAN[], dataS2: PLAN[], dataS3: PLAN[]) {
    console.log('getAllData inputs:', { dataS1, dataS2, dataS3 });
    this.compareData(dataS1, dataS2);
    this.compareData(dataS1, dataS3);

    this.accuracyResult = this.calculateMostAccuratePlan(dataS1, dataS2, dataS3);
    this.stylesResult = this.calculatePlanningStyle(dataS1, dataS2, dataS3);
    this.costsResult = this.calculateOpportunityCost(dataS1, dataS2, dataS3);
    this.efficiencyResult = this.calculateInventoryEfficiency(dataS1, dataS2, dataS3);

    console.log('Updated results:', {
      accuracyResult: this.accuracyResult,
      stylesResult: this.stylesResult,
      costsResult: this.costsResult,
      efficiencyResult: this.efficiencyResult
    });

    this.cdr.detectChanges();
  }

  openResumen() {
    this.showResume = !this.showResume;
  }

  compareData(dataSoruce1: PLAN[], dataSource2: PLAN[]) {
    const map1: { [key: string]: PLAN } = {};
    const map2: { [key: string]: PLAN } = {};

    dataSoruce1.forEach(item => map1[item.clave] = item);
    dataSource2.forEach(item => map2[item.clave] = item);

    const allKeys = new Set([...Object.keys(map1), ...Object.keys(map2)]);
    this.jsonDiff = [];

    allKeys.forEach(clave => {
      const item1 = map1[clave];
      const item2 = map2[clave];

      if (item1 && item2) {
        const diffs: { propiedad: string; valores: { valor1: string; valor2: string } }[] = [];
        const properties = Object.keys(item1).filter(prop => prop !== 'clave' && prop !== 'nombre');

        properties.forEach(prop => {
          const value1 = (item1 as any)[prop];
          const value2 = (item2 as any)[prop];
          if (value1 !== value2) {
            diffs.push({ propiedad: prop, valores: { valor1: value1, valor2: value2 } });
          }
        });

        if (diffs.length > 0) {
          this.jsonDiff.push({ nombre: item1.nombre, diffs });
        }
      }
    });
  }

  calculateMostAccuratePlan(dataS1: PLAN[], dataS2: PLAN[], dataS3: PLAN[]): { plan: string; accuracy: number; improvement: number } {
    const accuracy1 = this.calculatePlanningAccuracy(dataS1);
    const accuracy2 = this.calculatePlanningAccuracy(dataS2);
    const accuracy3 = this.calculatePlanningAccuracy(dataS3);

    const plans = [
      { plan: this.planA.nombre, accuracy: accuracy1 },
      { plan: this.planB.nombre, accuracy: accuracy2 },
      { plan: this.planC.nombre, accuracy: accuracy3 }
    ];

    const mostAccurate = plans.reduce((prev, current) => (prev.accuracy > current.accuracy) ? prev : current);
    const referenceAccuracy = plans.find(p => p.plan === this.planA.nombre)?.accuracy || 0;
    const improvement = referenceAccuracy ? ((mostAccurate.accuracy - referenceAccuracy) / referenceAccuracy * 100) : 0;

    return { ...mostAccurate, improvement };
  }

  private calculatePlanningAccuracy(data: PLAN[]): number {
    let totalAccuracy = 0;

    data.forEach(item => {
      const eneroDiff = Math.abs(parseInt(item.enero) - parseInt(item.facturacion_enero));
      const febreroDiff = Math.abs(parseInt(item.febrero) - parseInt(item.facturacion_febrero));
      const marzoDiff = Math.abs(parseInt(item.marzo) - parseInt(item.facturacion_marzo));

      totalAccuracy += 100 - (eneroDiff / parseInt(item.facturacion_enero) * 100);
      totalAccuracy += 100 - (febreroDiff / parseInt(item.facturacion_febrero) * 100);
      totalAccuracy += 100 - (marzoDiff / parseInt(item.facturacion_marzo) * 100);
    });

    return totalAccuracy / (data.length * 3);
  }

  calculateInventoryEfficiency(dataS1: PLAN[], dataS2: PLAN[], dataS3: PLAN[]): { plan: string; efficiency: number; difference: number } {
    const efficiency1 = this.calculateInventoryScore(dataS1);
    const efficiency2 = this.calculateInventoryScore(dataS2);
    const efficiency3 = this.calculateInventoryScore(dataS3);

    const plans = [
      { plan: this.planA.nombre, efficiency: efficiency1 },
      { plan: this.planB.nombre, efficiency: efficiency2 },
      { plan: this.planC.nombre, efficiency: efficiency3 }
    ];

    const mostEfficient = plans.reduce((prev, current) => (prev.efficiency > current.efficiency) ? prev : current);
    const referenceEfficiency = plans.find(p => p.plan === this.planA.nombre)?.efficiency || 0;
    const difference = referenceEfficiency ? ((mostEfficient.efficiency - referenceEfficiency) / referenceEfficiency * 100) : 0;

    return { ...mostEfficient, difference };
  }

  private calculateInventoryScore(data: PLAN[]): number {
    return data.reduce((score, item) => {
      const totalSold = parseInt(item.facturacion_enero) + parseInt(item.facturacion_febrero) + parseInt(item.facturacion_marzo);
      return score + (100 - Math.abs(parseInt(item.inventario) - totalSold));
    }, 0);
  }

  calculatePlanningStyle(dataS1: PLAN[], dataS2: PLAN[], dataS3: PLAN[]): { plan1: { style: string; score: number; name: string }; plan2: { style: string; score: number; name: string }; plan3: { style: string; score: number; name: string } } {
    return {
      plan1: { ...this.determinePlanningStyle(dataS1), name: this.planA.nombre },
      plan2: { ...this.determinePlanningStyle(dataS2), name: this.planB.nombre },
      plan3: { ...this.determinePlanningStyle(dataS3), name: this.planC.nombre }
    };
  }

  private determinePlanningStyle(data: PLAN[]): { style: string; score: number } {
    let overPlan = 0;
    let underPlan = 0;

    data.forEach(item => {
      if (parseInt(item.enero) > parseInt(item.facturacion_enero)) overPlan++;
      else if (parseInt(item.enero) < parseInt(item.facturacion_enero)) underPlan++;
      if (parseInt(item.febrero) > parseInt(item.facturacion_febrero)) overPlan++;
      else if (parseInt(item.febrero) < parseInt(item.facturacion_febrero)) underPlan++;
      if (parseInt(item.marzo) > parseInt(item.facturacion_marzo)) overPlan++;
      else if (parseInt(item.marzo) < parseInt(item.facturacion_marzo)) underPlan++;
    });

    const total = overPlan + underPlan;
    const overPercentage = total ? (overPlan / total) * 100 : 50;

    if (overPercentage > 70) return { style: 'Conservador', score: overPercentage };
    if (overPercentage < 30) return { style: 'Agresivo', score: 100 - overPercentage };
    return { style: 'Balanceado', score: 50 };
  }

  calculateOpportunityCost(dataS1: PLAN[], dataS2: PLAN[], dataS3: PLAN[]): { plan1: { cost: number; details: string; name: string; percentage: number }; plan2: { cost: number; details: string; name: string; percentage: number }; plan3: { cost: number; details: string; name: string; percentage: number } } {
    const cost1 = this.computeOpportunityCost(dataS1);
    const cost2 = this.computeOpportunityCost(dataS2);
    const cost3 = this.computeOpportunityCost(dataS3);

    const referenceCost = cost1.cost;
    return {
      plan1: { ...cost1, name: this.planA.nombre, percentage: 0 },
      plan2: { ...cost2, name: this.planB.nombre, percentage: referenceCost ? ((cost2.cost - referenceCost) / referenceCost * 100) : 0 },
      plan3: { ...cost3, name: this.planC.nombre, percentage: referenceCost ? ((cost3.cost - referenceCost) / referenceCost * 100) : 0 }
    };
  }

  private computeOpportunityCost(data: PLAN[]): { cost: number; details: string } {
    let lostSales = 0;
    let excessInventory = 0;

    data.forEach(item => {
      lostSales += Math.max(0, parseInt(item.facturacion_enero) - parseInt(item.enero));
      lostSales += Math.max(0, parseInt(item.facturacion_febrero) - parseInt(item.febrero));
      lostSales += Math.max(0, parseInt(item.facturacion_marzo) - parseInt(item.marzo));

      excessInventory += Math.max(0, parseInt(item.enero) - parseInt(item.facturacion_enero));
      excessInventory += Math.max(0, parseInt(item.febrero) - parseInt(item.facturacion_febrero));
      excessInventory += Math.max(0, parseInt(item.marzo) - parseInt(item.facturacion_marzo));
    });

    return {
      cost: lostSales + (excessInventory * 0.5),
      details: `Ventas perdidas: ${lostSales}, Exceso inventario: ${excessInventory}`
    };
  }
}