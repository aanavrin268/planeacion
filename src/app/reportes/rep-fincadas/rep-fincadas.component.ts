import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rep-fincadas',
  imports: [CommonModule],
  templateUrl: './rep-fincadas.component.html',
  styleUrl: './rep-fincadas.component.scss'
})
export class RepFincadasComponent implements OnInit {

  protected menu_list: any =[] = [];

  constructor() {
    this.menu_list = [
      {id:1, title: "Unidades fincadas", isActivate: false}
    ];

  }

  ngOnInit(): void {
  }

}
