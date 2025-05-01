export interface PlanDetail{
    nombre: string;
    inventario: number;
}



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