import { Routes } from '@angular/router';
import { QuatriComponent } from './quatri/quatri.component';
import { TestComponent } from './test/test.component';
import { FichaTecnicaComponent } from './producto/ficha-tecnica/ficha-tecnica.component';
import { DraggableComponent } from './producto/draggable/draggable.component';
import { PruebaComponent } from './prueba/prueba.component';
import { CanicasComponent } from './canicas/canicas.component';
import { DashComponent } from './producto/dash/dash.component';
import { ProductComponent } from './producto/product/product.component';
import { RepFincadasComponent } from './reportes/rep-fincadas/rep-fincadas.component';
import { UFincadasComponent } from './shared/semi/u-fincadas/u-fincadas.component';
import { HomeComponent } from './dashboards/home/home.component';
import { DashProductsComponent } from './dashboards/dash-products/dash-products.component';
import { DashReportsComponent } from './dashboards/dash-reports/dash-reports.component';
import { DashPlanComponent } from './dashboards/dash-plan/dash-plan.component';
import { ExampleComponent } from './plan/example/example.component';
import { ComparativaComponent } from './plan/comparativa/comparativa.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { PlanTellingComponent } from './plan/plan-telling/plan-telling.component';
import { TodosProductosComponent } from './productoss/todos-productos/todos-productos.component';
import { DashProductossComponent } from './dashboards/dash-productoss/dash-productoss.component';
import { DashInventarioComponent } from './dashboards/dash-inventario/dash-inventario.component';
import { InventariosTiempoComponent } from './inventarios/inventarios-tiempo/inventarios-tiempo.component';
import { ModoPivoteComponent } from './plan/modo-pivote/modo-pivote.component';



export const routes: Routes = [
{path:  'quatri', component: QuatriComponent},
{path: 'product', component: ProductComponent},
{path: 'repFincadas', component: RepFincadasComponent},
{path: 'uFincadas', component: UFincadasComponent},
{path: 'home', component: HomeComponent},
{path: 'dashProducts', component: DashProductsComponent},
{path: 'dashReports', component: DashReportsComponent},
{path: 'dashPlan', component: DashPlanComponent},
{path: 'comparativa/:id', component: ComparativaComponent},
{path: 'settings', component: SettingsComponent},
{path: 'planTelling', component: PlanTellingComponent},
{path: 'dashInventarios', component: DashInventarioComponent},
{path: 'inventariosTiempo', component: InventariosTiempoComponent},
{path: 'modo-pivote', component: ModoPivoteComponent},



{path: 'stPlan', component: ExampleComponent},

{path: 'todosProductos', component: TodosProductosComponent},
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
    path: 'prueba',
    component: PruebaComponent
},
{
    path: 'dash',
    component: DashComponent
},
{
    path: 'canica',
    component: CanicasComponent
},



{path: 'test', component:TestComponent},
{path: '', component: CanicasComponent, pathMatch: 'full'}



];
