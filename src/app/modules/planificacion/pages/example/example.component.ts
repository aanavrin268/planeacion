import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



@Component({
  selector: 'app-example',
  imports: [],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {


  
  constructor() {
    // Registrar el plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    this.setupScrollAnimations();
  }


  setupScrollAnimations(): void {
    // Animaciones para cada sección
    gsap.from('.intro-section h1', {
      scrollTrigger: {
        trigger: '.intro-section',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      y: -100,
      opacity: 0,
    });

    gsap.from('.market-section .chart-bar', {
      scrollTrigger: {
        trigger: '.market-section',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
    });

    gsap.from('.goals-section li', {
      scrollTrigger: {
        trigger: '.goals-section',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      x: -100,
      opacity: 0,
      stagger: 0.2,
    });

    gsap.from('.strategies-section .card', {
      scrollTrigger: {
        trigger: '.strategies-section',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
    });

    gsap.from('.results-section .result-item', {
      scrollTrigger: {
        trigger: '.results-section',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
    });

    gsap.from('.conclusion-section h2', {
      scrollTrigger: {
        trigger: '.conclusion-section',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
      y: -100,
      opacity: 0,
    });
  }


}
