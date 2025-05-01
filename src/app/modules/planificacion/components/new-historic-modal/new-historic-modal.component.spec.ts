import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHistoricModalComponent } from './new-historic-modal.component';

describe('NewHistoricModalComponent', () => {
  let component: NewHistoricModalComponent;
  let fixture: ComponentFixture<NewHistoricModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHistoricModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHistoricModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
