import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPlanComponent } from './dash-plan.component';

describe('DashPlanComponent', () => {
  let component: DashPlanComponent;
  let fixture: ComponentFixture<DashPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
