interface InfoPivote {
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
    estado: number;
    updatedAt: string;
    info: [InfoPivote]
}