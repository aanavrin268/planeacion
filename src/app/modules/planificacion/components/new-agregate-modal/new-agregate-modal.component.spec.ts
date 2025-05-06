import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgregateModalComponent } from './new-agregate-modal.component';

describe('NewAgregateModalComponent', () => {
  let component: NewAgregateModalComponent;
  let fixture: ComponentFixture<NewAgregateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAgregateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAgregateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
