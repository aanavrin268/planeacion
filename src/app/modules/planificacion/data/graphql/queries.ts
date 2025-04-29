import { gql } from '@apollo/client/core';


export const GET_DETALLES_PLAN = gql `
   query GeteDetallesPlanGql {
    geteDetallesPlanGql {
      nombre
      inventario
    }
  }

 
`;

export const GET_DETALLES_PLAN_ID = gql`
  query GetPlanAllDetailsById($idPlan: Int!) {
    getPlanAllDetailsById(id_plan: $idPlan) {
      id_plan,
    nombre,
    tipo,
    estado, 
    updatedAt,
    info{
      clave,
      disponibles,
      enero,
      fac_enero,
      febrero,
      fac_febrero,
      marzo,
      fac_marzo,
      abril,
      fac_abril,
      mayo,
      fac_mayo,
      junio,
      fac_junio,
      julio,
      fac_julio,
      agosto,
      fac_agosto,
      septiembre,
      fac_septiembre,
      octubre,
      fac_octubre,
      noviembre,
      fac_noviembre,
      diciembre,
      fac_diciembre
    }
  
  }
}
`;