import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { List_With_Select, ViewTable } from '../../models/plan.model';


@Component({
  selector: 'app-new-view-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-view-modal.component.html',
  styleUrl: './new-view-modal.component.scss'
})
export class NewViewModalComponent implements OnInit {

  protected all_headers: List_With_Select[] = [];
  protected list_localViews: any[] = [];

  protected inputName: string;
  protected newView: ViewTable;

  constructor(private active: NgbActiveModal){
    this.inputName = '';

    this.newView = {} as ViewTable;

    /*
    this.all_headers = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'octubre', 'noviembre',
      'diciembre', 'fac_enero', 'fac_febrero', 'fac_marzo', 'fac_abril', 'fac_mayo', 'fac_junio', 'clave', 'disponibles', '__typename',
      'fac_julio', 'fac_agosto', 'fac_septiembre' , 'fac_octubre' ,'fac_noviembre', 'fac_diciembre']
      */

      this.all_headers = [
        {
          value: 'enero', selected: true,
          id: 1
        },
        {
          value: 'febrero', selected: true,
          id: 2
        },
        {
          value: 'marzo', selected: false,
          id: 3
        },
        {
          value: 'abril', selected: false,
          id: 4
        },
        {
          value: 'mayo', selected: false,
          id: 5
        },
        {
          value: 'junio', selected: false,
          id: 6
        },
        {
          value: 'julio', selected: false,
          id: 7
        },
        {
          value: 'agosto', selected: false,
          id: 8
        },
        {
          value: 'septiembre', selected: false,
          id: 9
        },
        {
          value: 'octubre', selected: false,
          id: 10
        },
        {
          value: 'noviembre', selected: false,
          id: 11
        },
        {
          value: 'diciembre', selected: false,
          id: 12
        },
        {
          value: 'fac_enero', selected: false,
          id: 13
        },
        {
          value: 'fac_febrero', selected: false,
          id: 14
        },
        {
          value: 'fac_marzo', selected: false,
          id: 15
        },
        {
          value: 'fac_abril', selected: false,
          id: 16
        },
        {
          value: 'fac_mayo', selected: false,
          id: 17
        },
        {
          value: 'fac_junio', selected: false,
          id: 18
        },
        {
          value: 'clave', selected: false,
          id: 19
        },
        {
          value: 'disponibles', selected: false,
          id: 20
        },
        {
          value: 'fac_julio', selected: false,
          id: 21
        },
        {
          value: 'fac_agosto', selected: false,
          id: 22
        },
        {
          value: 'fac_septiembre', selected: false,
          id: 23
        },
        {
          value: 'fac_octubre', selected: false,
          id: 24
        },
        {
          value: 'fac_noviembre', selected: false,
          id: 25
        },
        {
          value: 'fac_diciembre', selected: false,
          id: 26
        }
      ];


  }

  ngOnInit(): void {


  }

  get AllSelectedHeaders(): List_With_Select[]{
    return this.all_headers.filter(headers => headers.selected === true);
  }

  get AllNonSelectedHeaders(): List_With_Select[]{
    return this.all_headers.filter(headers => headers.selected === false);
  }

  onCancel(){
    this.active.close();
  }

  onSave() {



    if (this.inputName === '' || this.AllSelectedHeaders.length === 0) {
      console.error("¡Completa los datos!");
      return;
    }
  
    // Preparar el nuevo objeto
    const exlcludedStrings = this.AllNonSelectedHeaders.map(header => header.value);
    
    this.newView = {
      id: 0,
      name: this.inputName,
      excludedKeys: exlcludedStrings
    };
  
    console.log("ITEM TO LOCAL SAVE", this.newView);
  
    // Obtener vistas existentes o inicializar array vacío
    const savedLocalViews = localStorage.getItem('localViews');
    let localViewsArray = savedLocalViews ? JSON.parse(savedLocalViews) : [];
  
    // Calcular nuevo ID
    if (localViewsArray.length > 0) {
      const lastId = localViewsArray[localViewsArray.length - 1].id;
      this.newView.id = Number(lastId) + 1;
    }
  
    // Agregar nueva vista
    localViewsArray.push(this.newView);
  
    // Guardar en localStorage
    localStorage.setItem('localViews', JSON.stringify(localViewsArray));
    
    // Actualizar la propiedad list_localViews si es necesaria
    this.list_localViews = localViewsArray;
  
    console.log("Vista guardada correctamente. Total:", localViewsArray.length);


  }

  removeItem(id: number){
    console.log("id to remove", id);

    const headerToRemove = this.all_headers.find(header => header.id === Number(id));

    if(headerToRemove){
      headerToRemove.selected = false;
    }else {
      console.error("HEADER to remove NO ENCOENTEdo", headerToRemove);

    }


  }

  onSelectOption(event: Event){
    let elemnts = event.target as HTMLSelectElement;
    let elementId = elemnts.value;

    console.log("id del header", elementId);

    const selectedHeader = this.all_headers.find(header => header.id === Number(elementId));

    if(selectedHeader){
      console.log("header encintrado!", selectedHeader);
      selectedHeader.selected = true;
     

    }else{
      console.error("HEADER NO ENCOENTEdo", selectedHeader);
    }

  }



}



