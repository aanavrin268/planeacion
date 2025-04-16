import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { filter, range, Subscription } from 'rxjs';
import { SubmenuComponent } from './shared/components/menus/submenu/submenu.component';
import { PlanService } from './modules/planificacion/services/plan.service';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, SubmenuComponent
  ],  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{

  private routerSusbscription: Subscription;

  isPlanTellingActive = false;


  protected logged!: boolean;
  protected isToggled = false;
  protected showBage: boolean;

  protected currentSelectedRoute: any;

  showSubmenu: string | null = null;


  isTellingOn: boolean = false;

  planSubmenuItems = [
    { label: 'Plan de ventas', link: '/dashPlan' },
    { label: 'Proyección en el tiempo', link: '/inventariosTiempo' },
    { label: 'Scroll telling', link: '/planTelling' },
  ];

  productSubmenuItems = [
    { label: 'Todos los productos', link: '/dashProductoss' },
  ];

  inventarySubmenuItems = [
    { label: '', link: '' },
  ];


  constructor(private apiService: ApiService, private router: Router, private planService: PlanService){
    this.showBage = false;

    this.routerSusbscription = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      console.log("ruta actual", event.url);
      this.currentSelectedRoute = event.url;

      if(this.currentSelectedRoute == '/planTelling'){
        console.log("esta encendido");
        this.isTellingOn = true;
      }
      
      console.log("componente: ", this.getCurrentComponentName());
    })
  }

  ngOnInit(): void {
    this.planService.isPlanTellingActive$.subscribe((isActive) => {
      this.isPlanTellingActive = isActive;
    });

  

   
  }

  isPlanTellingRoute(): boolean {
    return this.router.url.includes('/planTelling');
  }

  ngOnDestroy(): void {
    if(this.routerSusbscription){
      this.routerSusbscription.unsubscribe();
    }
  }

  getCurrentComponentName(){
    let currentRoute = this.router.routerState.snapshot.root;
    while(currentRoute.firstChild){
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute.component?.name || 'componente desconocido';
  }



  toggleMenu(): void {
    this.isToggled = !this.isToggled;
  }

  toggleSubmenu(menu: string) {
    this.showSubmenu = this.showSubmenu === menu ? null : menu;
  }



  }




  
  




