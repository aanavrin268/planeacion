import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-submenu',
  imports: [CommonModule, RouterModule],
  templateUrl: './submenu.component.html',
  styleUrl: './submenu.component.scss'
})
export class SubmenuComponent implements OnInit {

  @Input() submenuItems: { label: string, link: string }[] = [];


  constructor(){}

  ngOnInit(): void {

  }

}
