import { Component, OnDestroy, OnInit } from '@angular/core';
import { gsap } from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import { PlanService } from '../services/plan.service';



@Component({
  selector: 'app-plan-telling',
  imports: [],
  templateUrl: './plan-telling.component.html',
  styleUrl: './plan-telling.component.scss'
})
export class PlanTellingComponent implements OnInit, OnDestroy {

  constructor(private planService: PlanService){
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'none', duration: 2});
  }


  ngOnInit(): void {
    this.planService.setPlanTellingActive(true);


    this.initScrollAnimations();
  }


  ngOnDestroy(): void {
    this.planService.setPlanTellingActive(false);

  }


  initScrollAnimations(){
    const tl = gsap.timeline();

    tl.from('.seccion_2', {xPercent: -100});
    tl.from('.seccion_3', {xPercent: 100});
    tl.from('.seccion_4', {yPercent: -100});

    ScrollTrigger.create({
      animation: tl,
      trigger: '.contenedor_animacion',
      markers: false,
      start: 'top top',
      end: '+=4000',
      pinReparent: true,
      pin: true,
      scrub: true,

    });


  }

}
