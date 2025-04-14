import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { range } from 'rxjs';
import { SubmenuComponent } from './shared/components/menus/submenu/submenu.component';
import { PlanService } from './modules/planificacion/services/plan.service';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, SubmenuComponent
  ],  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  isPlanTellingActive = false;


  protected logged!: boolean;
  protected isToggled = false;
  protected showBage: boolean;

  showSubmenu: string | null = null;

  

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
  }

  ngOnInit(): void {
    this.planService.isPlanTellingActive$.subscribe((isActive) => {
      this.isPlanTellingActive = isActive;
    });
  }



  toggleMenu(): void {
    this.isToggled = !this.isToggled;
  }

  toggleSubmenu(menu: string) {
    this.showSubmenu = this.showSubmenu === menu ? null : menu;
  }



  }




  
  




