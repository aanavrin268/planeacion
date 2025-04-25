import { gql } from '@apollo/client/core';


export const GET_DETALLES_PLAN = gql `
   query GeteDetallesPlanGql {
    geteDetallesPlanGql {
      nombre
      inventario
    }
  }
`;