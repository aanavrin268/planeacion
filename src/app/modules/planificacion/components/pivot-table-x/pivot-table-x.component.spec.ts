import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTableXComponent } from './pivot-table-x.component';

describe('PivotTableXComponent', () => {
  let component: PivotTableXComponent;
  let fixture: ComponentFixture<PivotTableXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PivotTableXComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PivotTableXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
