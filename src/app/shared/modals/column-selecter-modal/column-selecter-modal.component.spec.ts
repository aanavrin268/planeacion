import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSelecterModalComponent } from './column-selecter-modal.component';

describe('ColumnSelecterModalComponent', () => {
  let component: ColumnSelecterModalComponent;
  let fixture: ComponentFixture<ColumnSelecterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnSelecterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnSelecterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
