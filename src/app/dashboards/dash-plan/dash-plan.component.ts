import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddNewPlanComponent } from '../../shared/components/modals/modal-add-new-plan/modal-add-new-plan.component';
import { ModalPlanViewComponent } from '../../shared/components/modals/modal-plan-view/modal-plan-view.component';
import { gsap } from 'gsap';



@Component({
  selector: 'app-dash-plan',
  imports: [CommonModule],
  templateUrl: './dash-plan.component.html',
  styleUrl: './dash-plan.component.scss'
})
export class DashPlanComponent implements OnInit {

  protected plan_list:any[] = [];
  protected showAn: boolean = false;

  @ViewChild('menu') menu!: ElementRef;


  constructor(private modal: NgbModal){
    this.plan_list = [
      {id:1, name: 'Plan público', filters:['Todos los Qs', 'Historico', 'Sector público'], time:'historico'},
      {id: 2, name: 'Plan privado', filters:['Todos los Qs', 'Productos', 'Sector privado'], time:'historico'}

    ];
  }

  ngOnInit(): void {


  }


  openIt() {
    if (this.showAn) {
      // Cerrar menú con animación de salida
      gsap.to(this.menu.nativeElement, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          this.showAn = false;
          this.menu.nativeElement.style.display = "none"; // Ocultamos después de la animación
        }
      });
    } else {
      this.showAn = true; // Activamos la bandera primero
  
      // Aseguramos que el menú esté visible antes de animar
      this.menu.nativeElement.style.display = "block";
  
      // Definimos manualmente el estado inicial antes de la animación
      gsap.set(this.menu.nativeElement, { opacity: 0, scale: 0.5 });
  
      // Animación de entrada
      gsap.to(this.menu.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }
  
  



  addNewPlan(){
    const modalRef = this.modal.open(ModalAddNewPlanComponent, 
      {
        size:'lg',
        centered:true,
        windowClass:'redondo'
      });


      
  }

  openPlan(plan:any){

    console.log("el plan es", plan);

    const modalRef = this.modal.open(ModalPlanViewComponent, 
      { 
        size:'xl',
        centered:true,
        windowClass: 'redondo'
      }
    );


    //plan.nombre = ''

    modalRef.componentInstance.plan = plan;
  }

}
