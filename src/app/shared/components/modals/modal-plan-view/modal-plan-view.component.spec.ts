import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlanViewComponent } from './modal-plan-view.component';

describe('ModalPlanViewComponent', () => {
  let component: ModalPlanViewComponent;
  let fixture: ComponentFixture<ModalPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPlanViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
