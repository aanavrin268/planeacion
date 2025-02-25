import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddNewPlanComponent } from './modal-add-new-plan.component';

describe('ModalAddNewPlanComponent', () => {
  let component: ModalAddNewPlanComponent;
  let fixture: ComponentFixture<ModalAddNewPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddNewPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddNewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
