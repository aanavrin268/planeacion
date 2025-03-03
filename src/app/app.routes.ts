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



export const routes: Routes = [
{path:  'quatri', component: QuatriComponent},
{path: 'product', component: ProductComponent},
{path: 'repFincadas', component: RepFincadasComponent},
{path: 'uFincadas', component: UFincadasComponent},
{path: 'home', component: HomeComponent},
{path: 'dashProducts', component: DashProductsComponent},
{path: 'dashReports', component: DashReportsComponent},
{path: 'dashPlan', component: DashPlanComponent},

{path: 'example', component: ExampleComponent},


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
{path: '', component: HomeComponent, pathMatch: 'full'}



];
