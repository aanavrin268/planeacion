import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'app-tiempo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.scss']
})
export class TiempoComponent implements OnInit, AfterViewInit {
  @ViewChild('leftMenu') leftMenu!: ElementRef;
  showLeftMenu = true;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.setupAnimations();
  }

  setupAnimations() {
    // Inicializamos el menú en el estado correcto según showLeftMenu
    gsap.set(this.leftMenu.nativeElement, {
      x: this.showLeftMenu ? 0 : -300,
      opacity: this.showLeftMenu ? 1 : 0
    });
  }

  minimize() {
    if (this.showLeftMenu) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  }

  showMenu() {
    this.showLeftMenu = true;
    gsap.to(this.leftMenu.nativeElement, {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  hideMenu() {
    gsap.to(this.leftMenu.nativeElement, {
      x: -300,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        this.showLeftMenu = false; // Cambiamos el estado después de la animación
      }
    });
  }
}