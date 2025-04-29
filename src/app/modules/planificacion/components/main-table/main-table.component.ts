import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import interact from 'interactjs';
import { Column, Group, InfoPivote } from '../../models/plan.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanState } from '../../store/plan.state';
import { PlanDataService } from '../../services/plan-data.service';

@Component({
  selector: 'app-main-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './main-table.component.html',
  styleUrl: './main-table.component.scss'
})
export class MainTableComponent implements OnInit, AfterViewInit {
  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef<HTMLDivElement>;


  protected columns: Column[] = [];

    groups: Group[] = [
      { label: 'Primer Trimestre', colspan: 3, startColumn: 'january', endColumn: 'march' },
      { label: 'Segundo Trimestre', colspan: 3, startColumn: 'april', endColumn: 'june' },
      { label: 'Tercer Trimestre', colspan: 3, startColumn: 'july', endColumn: 'september' },
  
    ];

    
  headerColor = '#f0f0f0';
  groupColor = 'rgb(233, 74, 74)';

    data: InfoPivote[] = []; 
  
  


  constructor(private cdr: ChangeDetectorRef, private statePlan: PlanState, private dataPlanService: PlanDataService){

  }

  
  ngOnInit(): void {

 this.dataPlanService.currentPlan$.subscribe(
      {
        next:(data) => {
          console.log("El plan acutal DESDE MAIN TABLE ES: ", data);

          this.data = data.info;
          this.generateColumnsFromData(this.data[0]);

        }
      }
    );


  }



  
  generateColumnsFromData(sampleData: any){
    const excludedKeys = ['clave', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 
        'diciembre', 'fac_abril', 'proveedor', 'fac_mayo', 'fac_junio', 'fac_julio', 'fac_agosto', 'fac_septiembre',
        'fac_octubre', 'fac_noviembre', 'fac_diciembre', '__typename'
    ];
    const specialHeaders: { [key: string]: string} = {
      'nombre': 'Nombre',
      'proveedor': 'Proveedor',
      'inventario': 'Inventario',
      'enero': 'Enero',
      'febrero': 'Febrero',
      'marzo': 'Marzo',
      'abril': 'Abril',
      'mayo': 'Mayo',
      'junio': 'Junio',
      'julio': 'Julio',
      'agosto': 'Agosto',
      'septiembre': 'Septiembre',
      'octubre': 'Octubre',
      'noviembre': 'Noviembre',
      'diciembre': 'Diciembre',
      'fac_enero': 'Fac. Enero',
      'fac_febrero': 'Fac. Febrero',
      'fac_marzo': 'Fac. Marzo',
      'fac_abril': 'Fac. Abril'
    }

    this.columns = Object.keys(sampleData)
      .filter(key => !excludedKeys.includes(key))
      .map(key => ({
        key: key,
        header: specialHeaders[key] || this.formatHeader(key),
        width: this.calculateWidth(key),
        visible: true
      }));

      console.log("nuevos columns", this.columns)

      this.orderColumns();
      this.cdr.detectChanges();
  }

  private orderColumns(){
    const columnOrder = ['nombre', 'proveedor', 'inventario', 'enero', 'febrero' , 'marzo'];
    this.columns.sort((a, b) => {
      const aIndex = columnOrder.indexOf(a.key);
      const bIndex = columnOrder.indexOf(b.key);

      if(aIndex >= 0 && bIndex >= 0) return aIndex - bIndex;
      if(aIndex >= 0) return -1;
      if(bIndex >= 0 ) return 1;

      return a.key.localeCompare(b.key);
    })
  }

  private calculateWidth(key: string):number{
    if(key === 'nombre') return 200;
    if(key === 'proveedor') return 100;
    if(key.startsWith('fac_')) return 80;
    return 100;
  }

  private formatHeader(key: string): string{
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }




  ngAfterViewInit(): void {
    interact('tr:not(:first-child) th.resizable')
      .resizable({
        edges: { right: true },
        listeners: {
          move: (event) => {
            const target = event.target;
            const key = target.getAttribute('data-key');
            const currentCol = this.columns.find(c => c.key === key);
            if (!currentCol) return;

            // Calcular el ancho total actual de la tabla (sin la columna actual)
            const totalWidthWithoutCurrent = this.columns
              .filter(c => c.key !== key)
              .reduce((sum, col) => sum + col.width, 0);

            // Obtener el ancho máximo permitido de la tabla
            const containerWidth = this.tableContainer.nativeElement.offsetWidth;
            const maxTableWidth = containerWidth * 0.8;

            // Calcular el ancho máximo para la columna actual
            const maxColumnWidth = maxTableWidth - totalWidthWithoutCurrent;

            // Aplicar el nuevo ancho
            const newWidth = Math.max(50, Math.min(event.rect.width, maxColumnWidth));
            target.style.width = `${newWidth}px`;

            // Actualizar celdas de datos
            document.querySelectorAll<HTMLElement>(`td[data-key="${key}"]`)
              .forEach(cell => {
                cell.style.width = `${newWidth}px`;
              });

            // Actualizar el modelo
            currentCol.width = newWidth;

            // Depuración
            console.log(`Column: ${key}, New Width: ${newWidth}, Total Table Width: ${totalWidthWithoutCurrent + newWidth}, Max Table Width: ${maxTableWidth}`);
          }
        }
      });

    console.log('Interact.js inicializado para:', document.querySelectorAll('tr:not(:first-child) th.resizable').length, 'elementos');
  }

  toggleColumnVisibility(column: Column){
    column.visible = !column.visible;

    this.cdr.detectChanges();

  }

  trackByColumnKey(index: number, column: Column): string {
    return column.key
  }

  get visibleColumns(){

    

    return this.columns.filter(column => column.visible || column.key === 'name');
  }


  getHiddenColumns(){
    return this.columns.filter(column => !column.visible);
  }







  
  // Determina si una columna es el inicio de un grupo
  isGroupStartColumn(columnKey: string): boolean {
    return !!this.groups.find(g => g.startColumn === columnKey);
  }

  // Determina si una columna pertenece a un grupo
  isGroupColumn(columnKey: string): boolean {
    return !!this.groups.find(g => {
      const startIndex = this.columns.findIndex(c => c.key === g.startColumn);
      const endIndex = this.columns.findIndex(c => c.key === g.endColumn);
      const columnIndex = this.columns.findIndex(c => c.key === columnKey);
      return columnIndex >= startIndex && columnIndex <= endIndex;
    });
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

  getGroupFontSize(group: Group | undefined): string {
    if (!group) return '1rem';
    const startIndex = this.columns.findIndex(c => c.key === group.startColumn);
    const endIndex = this.columns.findIndex(c => c.key === group.endColumn);
    const totalWidth = this.columns.slice(startIndex, endIndex + 1)
      .reduce((sum, col) => sum + col.width, 0);
    const baseFontSize = totalWidth / 100;
    return `clamp(0.8rem, ${baseFontSize}rem, 1.5rem)`;
  }

}
