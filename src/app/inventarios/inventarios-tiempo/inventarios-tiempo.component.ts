import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChoosePlanModalComponent } from '../../shared/modals/choose-plan-modal/choose-plan-modal.component';

@Component({
  selector: 'app-inventarios-tiempo',
  imports: [CommonModule],
  templateUrl: './inventarios-tiempo.component.html',
  styleUrl: './inventarios-tiempo.component.scss'
})
export class InventariosTiempoComponent implements OnInit {
  protected isPlanChoosed: boolean;
  protected choosedProviders: any[] = [];

  activeTab: string = 'home';



  constructor(private modalService: NgbModal){
    this.isPlanChoosed = false;

  }

  ngOnInit(): void {


  }

  openChosse(){
    const modalRef = this.modalService.open(ChoosePlanModalComponent, {
      centered:true,
      size: 'md',
      windowClass: 'redondo'
    });


    modalRef.closed.subscribe((data: any[]) => {
      if(data)
      {
        this.choosedProviders = data;
        this.isPlanChoosed = true;
        console.log('datos recibidos', data);

      }
    });
  }

}
