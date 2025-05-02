import { gql } from '@apollo/client/core';


export const CREATE_PLAN_DETAILS = gql`
    mutation CreatePlanDetails($input: [PlanDetailsInput!]!){
        createPlanDetails(input: $input){
            id_plan,
            clave,
            disponibles,
            mes,
            unidades_planificadas,
            unidades_facturadas,
            proveedor_id,
        }
    }
`;


export const CREATE_PLAN = gql`
     mutation CreatePlan($input: PlanInput!){
        createPlan(input: $input){
            nombre, 
            tipo,
            categoria,
            estado,
            descripcion
        }
    }

`;
   