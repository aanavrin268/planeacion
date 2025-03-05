import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { range } from 'rxjs';
import { SubmenuComponent } from './shared/components/menus/submenu/submenu.component';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, SubmenuComponent
  ],  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  protected logged!: boolean;
  protected isToggled = false;
  protected showBage: boolean;

  showSubmenu: string | null = null;

  planSubmenuItems = [
    { label: 'Plan de ventas', link: '/dashPlan' },
    { label: 'Scroll telling', link: '/stPlan' },
  ];


  constructor(private apiService: ApiService, private router: Router){
    this.showBage = false;
  }

  ngOnInit(): void {
 
  }



  toggleMenu(): void {
    this.isToggled = !this.isToggled;
  }

  toggleSubmenu(menu: string) {
    this.showSubmenu = this.showSubmenu === menu ? null : menu;
  }



  }




  
  




