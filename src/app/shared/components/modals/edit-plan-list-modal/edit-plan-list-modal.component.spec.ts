import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanListModalComponent } from './edit-plan-list-modal.component';

describe('EditPlanListModalComponent', () => {
  let component: EditPlanListModalComponent;
  let fixture: ComponentFixture<EditPlanListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlanListModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlanListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
