import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewViewModalComponent } from '../new-view-modal/new-view-modal.component';
import { map, Observable } from 'rxjs';
import { Column } from '../../models/plan.model';
import { PlanDataService } from '../../services/plan-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ribbon-columns',
  imports: [CommonModule, FormsModule],
  templateUrl: './ribbon-columns.component.html',
  styleUrl: './ribbon-columns.component.scss'
})
export class RibbonColumnsComponent implements OnInit {

  protected columns$: Observable<Column[]> = new Observable<Column[]>();

  visibleColumnss$: Observable<Column[]>;
  hiddenColumnss$: Observable<Column[]>;

  isDropdownOpen = false;
  protected isDropdownHideOpen: boolean;




  constructor(private modal: NgbModal, private cdr: ChangeDetectorRef, private planDataService: PlanDataService){

    this.isDropdownHideOpen = false;


    this.visibleColumnss$ = this.columns$.pipe(
          map((columns: Column[]) => columns.filter((col: { visible: any; }) => col.visible))
        );
    
        this.hiddenColumnss$ = this.columns$.pipe(
          map(columns => columns.filter((col: { visible: any; }) => !col.visible))
        );

  }


  ngOnInit(): void {
    this.columns$ = this.planDataService.currentColumns$;


  }

  
  
    toggleColumnVisibility(column: Column){
     // column.visible = !column.visible;
  
     this.planDataService.toggleColumnVisibilityx(column.key);
  
      this.cdr.detectChanges();
  
    }
  
    get visibleColumns$(): Observable<Column[]> {
      return this.columns$.pipe(
        map((columns: Column[]) => columns.filter((col: { visible: any; key: string; }) => col.visible || col.key === 'name'))
      );
    }
  
    get hiddenColumns$(): Observable<Column[]> {
      return this.columns$.pipe(
        map((columns: Column[]) => columns.filter((col: { visible: any; }) => !col.visible))
      );
    }
  
  
  toggleHideDropwon(){
    this.isDropdownHideOpen = !this.isDropdownHideOpen;
  }
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  closeDropdown() {
    this.isDropdownOpen = false;
  }
  
  
  
  


  addView(){
    const modalRef = this.modal.open(NewViewModalComponent, {
      centered: true,
      size: 'md',
      windowClass: 'redondo'
    });
  }

}
