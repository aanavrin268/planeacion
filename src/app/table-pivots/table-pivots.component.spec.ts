import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePivotsComponent } from './table-pivots.component';

describe('TablePivotsComponent', () => {
  let component: TablePivotsComponent;
  let fixture: ComponentFixture<TablePivotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePivotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePivotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
