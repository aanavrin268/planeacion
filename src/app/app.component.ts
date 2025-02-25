import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { range } from 'rxjs';


interface Dia {
  date: string; 
  value: number;
}

interface Data {
  description: string;
  dias: Dia[];
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  isSidebarCollapsed = false;


  constructor(private apiService: ApiService, private router: Router){}

  ngOnInit(): void {
 
  }

  



  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }






  }




  
  




