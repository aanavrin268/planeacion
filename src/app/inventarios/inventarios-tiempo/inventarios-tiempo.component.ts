import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChoosePlanModalComponent } from '../../shared/modals/choose-plan-modal/choose-plan-modal.component';
import { pp_data_details, public_providers_data } from '../../core/helpers/readables';
import { ProveedorProductsComponent } from '../proveedor-products/proveedor-products.component';

@Component({
  selector: 'app-inventarios-tiempo',
  imports: [CommonModule, ProveedorProductsComponent],
  templateUrl: './inventarios-tiempo.component.html',
  styleUrl: './inventarios-tiempo.component.scss'
})
export class InventariosTiempoComponent implements OnInit {
  protected isPlanChoosed: boolean;
  protected choosedProviders: any[] = [];

  protected allProvidersDetails: any[] = [];
  protected selectedProviderData: any;

  activeTab: string = 'home';
  anotherSelect: string = '';


  constructor(private modalService: NgbModal){
    this.isPlanChoosed = false;

  }

  ngOnInit(): void {
    //this.choosedProviders = public_providers_data.result;


  }


  setNavsValue(provider: string){
    this.activeTab = provider;
    this.anotherSelect = provider;

    const foundProvider = pp_data_details
      .find(item => item.proveedor === provider);

    if(foundProvider){
      this.selectedProviderData = foundProvider;
      console.log("ecnottrado:", this.selectedProviderData);
    }else{
      console.error("no encontrado");
    }



  }

  openChosse(){
    const modalRef = this.modalService.open(ChoosePlanModalComponent, {
      centered:true,
      size: 'lg',
      windowClass: 'redondo'
    });


    modalRef.closed.subscribe((data: any[]) => {
      if(data)
      {
        //this.choosedProviders = data;
        this.isPlanChoosed = true;
        console.log('datos recibidos', data);

        this.choosedProviders = public_providers_data.result;
        this.choosedProviders = public_providers_data.result;


      }
    });
  }

}
