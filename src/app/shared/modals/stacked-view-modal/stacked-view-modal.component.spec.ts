import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedViewModalComponent } from './stacked-view-modal.component';

describe('StackedViewModalComponent', () => {
  let component: StackedViewModalComponent;
  let fixture: ComponentFixture<StackedViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedViewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
