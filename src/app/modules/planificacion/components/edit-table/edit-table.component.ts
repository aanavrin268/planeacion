import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Column, Group, InfoPivote } from '../../models/plan.model';
import { map, Observable } from 'rxjs';
import { PlanState } from '../../store/plan.state';
import { PlanDataService } from '../../services/plan-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMultiEditssComponent } from '../../../../shared/modals/modal-multi-editss/modal-multi-editss.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-table.component.html',
  styleUrl: './edit-table.component.scss'
})
export class EditTableComponent {

  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('cellInput', { static: false }) cellInput!: ElementRef<HTMLInputElement>;



  protected columns$: Observable<Column[]> = new Observable<Column[]>();

  visibleColumnss$: Observable<Column[]> | undefined;

  

  protected allSelected: boolean;
  protected isSingleRowSelected: boolean;
  protected showAbsolute: boolean;


  protected infotText: string;
  protected currentRowKey: string;
  protected absInputValue: string;

  protected allCurrentColumns: any[] =[];


    groups: Group[] = [
      { label: 'Primer Trimestre', colspan: 3, startColumn: 'january', endColumn: 'march' },
      { label: 'Segundo Trimestre', colspan: 3, startColumn: 'april', endColumn: 'june' },
      { label: 'Tercer Trimestre', colspan: 3, startColumn: 'july', endColumn: 'september' },
  
    ];

    editing = {
      active: false,
      rowIndex: -1,
      columnKey: ''
    };
    

    
  headerColor = '#f0f0f0';
  groupColor = 'rgb(233, 74, 74)';

    data: InfoPivote[] = []; 
  
  


  constructor(private cdr: ChangeDetectorRef, private statePlan: PlanState, private dataPlanService: PlanDataService, private modal: NgbModal,
    
  ){
    this.allSelected = false;
    this.isSingleRowSelected = false;
    this.showAbsolute = false;


    this.infotText = '';
    this.currentRowKey = '';
    this.absInputValue = "";
  }

  
  ngOnInit(): void {

 this.dataPlanService.currentPlan$.subscribe(
      {
        next:(data) => {
          console.log("El plan acutal DESDE EDIT TABLE ES: ", data);
          
          this.data = data.info;
          this.cdr.detectChanges(); // Forzar actualización


        }
      }
    );

    //this.columns$ = this.dataPlanService.currentColumns$;

    this.visibleColumnss$ = this.dataPlanService.currentColumns$.pipe(
      map(columns => columns.filter(col => col.visible))
    );

    
    this.dataPlanService.currentColumns$.subscribe(
      {
        next: (data) => {
          this.allCurrentColumns = data;
        }
      }
    );



    this.statePlan.swtichAbsolute.subscribe(
      {
        next: (data) => {
          this.showAbsolute = data;

          if(this.showAbsolute === true){
           
            console.warn("COLUMNAS ACTUALES DESDE ABS: ", this.allCurrentColumns);


            //console.warn("LA EDTIBALE COLUMN LIST: ", editableColumns);

            //let editableColumnsKeys = editableColumns.map((cols: {key: any}) => cols.key);


            //comprobar la fecha ahora
            const current_date = new Date;
            const current_month = current_date.getMonth();
            const adjust_month = current_month + 1;

            console.warn("CURRENT MONTH", adjust_month);

            const excludedMoths = ['enero', 'febrero', 'marzo'];

            let editableColumns = this.allCurrentColumns.map(columns => {
              if(adjust_month >= 4 && excludedMoths.includes(columns.key)){
                return {
                  ...columns,
                  editable: false
                };
              }
              return columns;

            });


            let filteredEditableColumns = editableColumns.filter(columns => columns.editable);

            console.warn("COLUMNAS EDITABLES ACTUALIZADAS:", filteredEditableColumns);

            if(filteredEditableColumns.length < 1){
              
              this.showAbsolute = !this.showAbsolute;
              this.statePlan.changeAbsoluteSwitchValue(this.showAbsolute); 
              Swal.fire('Error', 'No hay columnas disponibles a editar', 'error')
                .then((result) => {
                  this.isSingleRowSelected = false;
                  this.currentRowKey = '';
                  
                  this.cdr.detectChanges();
                });

            }else {
              this.statePlan.absInputValue$.subscribe(
                {
                  next:(response) =>{
                    let dummyData = {
                      nombre: 'Busulfan',
                      value: Number(response)
                    }
  
                    console.log("el abs input recibido es: ", response);
                    this.dataPlanService.updateCurrentPlan(dummyData, filteredEditableColumns);
  
                  }
                }
              );
            }
            }




          
        }
      }
    );



  }

  resetSingleRow(){
    this.isSingleRowSelected = false;
    this.currentRowKey = '';
  }

  onSingleRowSelected(row:any){
    this.showAbsolute = !this.showAbsolute;
    this.statePlan.changeAbsoluteSwitchValue(this.showAbsolute);
    this.isSingleRowSelected = true;
    this.currentRowKey = row.nombre;

    console.log("rowwwww", row);


  }


  openMultiWindow(){

    const bundleData = {
      data: this.getSelectedRows()
    };

    const modalRef = this.modal.open(ModalMultiEditssComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'redondo'
    });

    modalRef.componentInstance.bundle = bundleData;

  }

  deleteAllSelection(){

    this.data.forEach(items => items.selected = false);
    
  }

  handleCheckboxChange(row: InfoPivote, event: Event): void {
    const target = event.target as HTMLInputElement;
    row.selected = target?.checked || false;

    if(this.getSelectedRows().length > 0){
      if(this.getSelectedRows().length === 1){
        this.infotText = '1  producto seleccionado';
      }else if(this.getSelectedRows().length > 1){
        this.infotText = this.getSelectedRows().length + '  productos seleccionados';

      }

    }


  }

  getSelectedRows(): InfoPivote[]{
    return this.data.filter(row => row.selected);
  }

  get isSomeSelected(): boolean {
    return this.data.some(row => row.selected) && !this.allSelected;
  }


  toggleSelectAll(event: Event){
    const checked = (event.target as HTMLInputElement).checked;
    this.allSelected = checked;

    this.data.forEach(item => item.selected = checked);
  }


  // Añade este método para verificar si una columna es editable
isEditableColumn(columnKey: string): boolean {
  const nonEditableColumns = ['acciones','nombre', 'inventario', 'disponibles'];
  return !nonEditableColumns.includes(columnKey.toLowerCase());
}


startEditing(rowIndex: number, columnKey: string) {
  this.editing = {
    active: true,
    rowIndex,
    columnKey
  };
  
  this.cdr.detectChanges();
  setTimeout(() => {
    if (this.cellInput) {
      this.cellInput.nativeElement.focus();
      this.cellInput.nativeElement.select(); 
    }
  });
}

stopEditing() {
  this.editing.active = false;
}

saveEditing(event: any, row: InfoPivote, columnKey: string) {
  row[columnKey] = event.target.value;
  this.stopEditing();
  
  // Aquí podrías añadir lógica para guardar los cambios en tu servicio
  // this.dataPlanService.updatePlanData(this.data);
}

  toggleColumnVisibility(column: Column) {
    this.dataPlanService.toggleColumnVisibilityx(column.key);
  }



  ngAfterViewInit(): void {

    console.log("");
  }



  trackByColumnKey(index: number, column: Column): string {
    return column.key
  }


  
  // Determina si una columna es el inicio de un grupo
  isGroupStartColumn(columnKey: string): boolean {
    return !!this.groups.find(g => g.startColumn === columnKey);
  }





  getGroupColspan(columnKey: string): number {
    const group = this.groups.find(g => g.startColumn === columnKey);
    return group ? group.colspan : 1;
  }

  getGroupForColumn(columnKey: string): Group | undefined {
    return this.groups.find(g => g.startColumn === columnKey);
  }

  getFontSize(columnWidth: number): string {
    const baseFontSize = columnWidth / 125;
    return `clamp(0.6rem, ${baseFontSize}rem, 1.2rem)`;
  }



}


