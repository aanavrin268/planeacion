import { Routes } from '@angular/router';
import { CanicasComponent } from './modules/planificacion/components/canicas/canicas.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { DashPlanComponent } from './modules/planificacion/pages/dash-plan/dash-plan.component';
import { ExampleComponent } from './modules/planificacion/pages/example/example.component';
import { ComparativaComponent } from './modules/planificacion/pages/comparativa/comparativa.component';
import { DashProductossComponent } from './modules/productos/pages/dash-productoss/dash-productoss.component';
import { InventariosTiempoComponent } from './modules/planificacion/pages/inventarios-tiempo/inventarios-tiempo.component';
import { ModoPivoteComponent } from './modules/planificacion/pages/modo-pivote/modo-pivote.component';
import { MultiComparativaComponent } from './modules/planificacion/pages/multi-comparativa/multi-comparativa.component';
import { PlanTellingComponent } from './modules/planificacion/pages/plan-telling/plan-telling.component';
import { MainComparativaComponent } from './modules/planificacion/pages/main-comparativa/main-comparativa.component';
import { LandingPageComponent } from './modules/home/pages/landing-page/landing-page.component';
import { TestttComponent } from './testtt/testtt.component';
import { FullTableViewComponent } from './modules/home/components/full-table-view/full-table-view.component';
import { PruebatableComponent } from './pruebatable/pruebatable.component';
import { TestPivotssComponent } from './test-pivotss/test-pivotss.component';
import { TiempoComponent } from './modules/planificacion/pages/tiempo/tiempo.component';



export const routes: Routes = [
{path: 'home-1', component: HomeComponent},
{path: 'dashPlan', component: DashPlanComponent},
{path: 'comparativa/:id', component: ComparativaComponent},
{path: 'planTelling', component: PlanTellingComponent},
{path: 'inventariosTiempo', component: InventariosTiempoComponent},
{path: 'modo-pivote', component: ModoPivoteComponent},
{path: 'full-view', component: FullTableViewComponent},
{path: 'time', component: TiempoComponent},


{path: 'multi-comparativa', component: MultiComparativaComponent},
{path: 'main-comparativa', component: MainComparativaComponent},

{path: 'home', component: LandingPageComponent},


{path: 'stPlan', component: ExampleComponent},

{path: 'dashProductoss', component: DashProductossComponent},






{
    path: 'canica',
    component: CanicasComponent
},



{path: '', component: TiempoComponent, pathMatch: 'full'}



];
