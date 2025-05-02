export interface Column {
    key: string;
    header: string;
    width: number;
    visible: boolean;
  }
  
export   interface RowData {
    [key: string]: number | string;
  }
  
export  interface Group {
    label: string;
    colspan: number;
    startColumn: string;
    endColumn: string;
  }

  /*
          QUERIES
  
  */

          
export interface Count {
      public: number;
      private: number;
      all: number;
  }


export interface InfoPivote {
    [key: string]: number | string | null; 
    clave: string;
    disponibles: number;
    enero: number;
    fac_enero: number;
    febrero: string;
    fac_febrero: string;
    marzo: string;
    fac_marzo: string;
    abril: string;
    fac_abril: string;
    mayo: string;
    fac_mayo: string;
    junio: string;
    fac_junio: string;
    julio: string;
    fac_julio: string;
    agosto: string;
    fac_agosto: string;
    septiembre: string;
    fac_septiembre: string;
    octubre: string;
    fac_octubre: string;
    noviembre: string;
    fac_noviembre: string;
    diciembre: string;
    fac_diciembre: string;
}


export interface PlanDetail{
    nombre: string;
    inventario: number;
}

export interface PlanAllDetails{
    id_plan: number;
    nombre: string;
    tipo: number;
    categoria: number;
    estado: number;
    updatedAt: string;
    descripcion: string;
    info: [InfoPivote]
}



export interface PlanJust{
  id_plan: number;
  nombre: string;
  tipo: number | string;
  categoria: number | string;
  estado: number | string;
  descripcion: string;
  updatedAt: string;
}


/*
  MUTACIONES

*/


export interface PlanDetailsInput{
  id_plan: number;
  clave: string;
  disponibles: number;
  mes: string;
  unidades_planificadas: number;
  unidades_facturadas: number;
  proveedor_id: number;
}

export interface PlanDetailss   {
  id_plan: number;
  clave: string;
  disponibles: number;
  mes: string;
  unidades_planificadas: number;
  unidades_facturadas: number;
  proveedor_id: number;
}


export interface PlanInput {
  nombre: string;
  tipo: number;
  categoria: number;
  estado: number;
  descripcion: string;
}