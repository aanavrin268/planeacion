import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewViewModalComponent } from './new-view-modal.component';

describe('NewViewModalComponent', () => {
  let component: NewViewModalComponent;
  let fixture: ComponentFixture<NewViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewViewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
