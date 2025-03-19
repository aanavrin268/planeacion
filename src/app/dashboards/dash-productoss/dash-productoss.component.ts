import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dash-productoss',
  imports: [CommonModule],
  templateUrl: './dash-productoss.component.html',
  styleUrl: './dash-productoss.component.scss'
})
export class DashProductossComponent implements OnInit {

  protected filters: any[] = [
    {
      name: 'Disponibilidad',
      options: ['Disponible', 'No disponible'],
      selectedOptions: [] as string[],
    },
    {
      name: 'Tipo de producto',
      options: ['PT', 'MT', 'MT'],
      selectedOptions: [],
    },
  ];

  filteredProducts: any[] = []; 


  protected products: any[] = [];

  protected options_list:any[] = [
    {id: 1, title:'Todos los productos', cuantity:100, image:'medicamento.png'},
    {id: 2, title:'Comercial público', cuantity:100, image:'hospital.png'},
    {id: 3, title:'Comercial privado', cuantity:100, image:'paciente.png'},
    {id: 4, title:'Proveedor', cuantity:100, image:'proveedor.png'},


  ];


  constructor(private apiService: ApiService){
  }

  ngOnInit(): void {
    this.apiService.getAllProductoss().subscribe(
      {
        next:(response) => {
          console.log('Respuesta:', response);
          this.products = response;
        }
      }
    )

  }

  toggleSelection(filter: any, option: string) {
    const index = filter.selectedOptions.indexOf(option);
    if (index === -1) {
      filter.selectedOptions.push(option);
    } else {
      filter.selectedOptions.splice(index, 1);
    }
    this.applyFilters();
  }

  isSelected(filter: any, option: string): boolean {
    return filter.selectedOptions.includes(option);
  }

  applyFilters() {
    console.log('Filtros aplicados:', this.filters);
  }

 

}
