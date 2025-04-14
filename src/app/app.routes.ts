import { Routes } from '@angular/router';
import { FichaTecnicaComponent } from './producto/ficha-tecnica/ficha-tecnica.component';
import { DraggableComponent } from './producto/draggable/draggable.component';
import { CanicasComponent } from './modules/planificacion/components/canicas/canicas.component';
import { DashComponent } from './producto/dash/dash.component';
import { ProductComponent } from './producto/product/product.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { DashProductsComponent } from './dashboards/dash-products/dash-products.component';
import { DashReportsComponent } from './dashboards/dash-reports/dash-reports.component';
import { DashPlanComponent } from './dashboards/dash-plan/dash-plan.component';
import { ExampleComponent } from './plan/example/example.component';
import { ComparativaComponent } from './plan/comparativa/comparativa.component';
import { PlanTellingComponent } from './plan/plan-telling/plan-telling.component';
import { DashProductossComponent } from './dashboards/dash-productoss/dash-productoss.component';
import { DashInventarioComponent } from './dashboards/dash-inventario/dash-inventario.component';
import { InventariosTiempoComponent } from './inventarios/inventarios-tiempo/inventarios-tiempo.component';
import { ModoPivoteComponent } from './plan/modo-pivote/modo-pivote.component';
import { MultiComparativaComponent } from './plan/multi-comparativa/multi-comparativa.component';
import { MainComparativaComponent } from './plan/main-comparativa/main-comparativa.component';



export const routes: Routes = [
{path: 'product', component: ProductComponent},
{path: 'home', component: HomeComponent},
{path: 'dashProducts', component: DashProductsComponent},
{path: 'dashReports', component: DashReportsComponent},
{path: 'dashPlan', component: DashPlanComponent},
{path: 'comparativa/:id', component: ComparativaComponent},
{path: 'planTelling', component: PlanTellingComponent},
{path: 'dashInventarios', component: DashInventarioComponent},
{path: 'inventariosTiempo', component: InventariosTiempoComponent},
{path: 'modo-pivote', component: ModoPivoteComponent},
{path: 'multi-comparativa', component: MultiComparativaComponent},



{path: 'stPlan', component: ExampleComponent},

{path: 'dashProductoss', component: DashProductossComponent},




{
    path:'ficha',
    component: FichaTecnicaComponent
},
{
    path: 'drag',
    component: DraggableComponent
},

{
    path: 'dash',
    component: DashComponent
},
{
    path: 'canica',
    component: CanicasComponent
},



{path: '', component: MainComparativaComponent, pathMatch: 'full'}



];
