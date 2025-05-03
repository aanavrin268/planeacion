import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Column, Group, InfoPivote } from '../../models/plan.model';
import { map, Observable } from 'rxjs';
import { PlanState } from '../../store/plan.state';
import { PlanDataService } from '../../services/plan-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  
  


  constructor(private cdr: ChangeDetectorRef, private statePlan: PlanState, private dataPlanService: PlanDataService){
    this.allSelected = false;


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



  }

  handleCheckboxChange(row: InfoPivote, event: Event): void {
    const target = event.target as HTMLInputElement;
    row.selected = target?.checked || false;
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


// Modifica el método startEditing
startEditing(rowIndex: number, columnKey: string) {
  this.editing = {
    active: true,
    rowIndex,
    columnKey
  };
  
  // Forzar la detección de cambios y luego enfocar
  this.cdr.detectChanges();
  setTimeout(() => {
    if (this.cellInput) {
      this.cellInput.nativeElement.focus();
      this.cellInput.nativeElement.select(); // Selecciona todo el texto
    }
  });
}

// Método para detener la edición
stopEditing() {
  this.editing.active = false;
}

// Método para guardar los cambios
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





  // Obtiene el colspan para una columna de grupo
  getGroupColspan(columnKey: string): number {
    const group = this.groups.find(g => g.startColumn === columnKey);
    return group ? group.colspan : 1;
  }

  // Obtiene el grupo para una columna
  getGroupForColumn(columnKey: string): Group | undefined {
    return this.groups.find(g => g.startColumn === columnKey);
  }

  getFontSize(columnWidth: number): string {
    const baseFontSize = columnWidth / 125;
    return `clamp(0.6rem, ${baseFontSize}rem, 1.2rem)`;
  }



}


