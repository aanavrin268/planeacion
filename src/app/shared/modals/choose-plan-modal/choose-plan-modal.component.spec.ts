import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePlanModalComponent } from './choose-plan-modal.component';

describe('ChoosePlanModalComponent', () => {
  let component: ChoosePlanModalComponent;
  let fixture: ComponentFixture<ChoosePlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosePlanModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
