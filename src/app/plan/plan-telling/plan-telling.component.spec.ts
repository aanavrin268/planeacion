import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTellingComponent } from './plan-telling.component';

describe('PlanTellingComponent', () => {
  let component: PlanTellingComponent;
  let fixture: ComponentFixture<PlanTellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanTellingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanTellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
