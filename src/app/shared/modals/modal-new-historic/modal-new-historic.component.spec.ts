import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewHistoricComponent } from './modal-new-historic.component';

describe('ModalNewHistoricComponent', () => {
  let component: ModalNewHistoricComponent;
  let fixture: ComponentFixture<ModalNewHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewHistoricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
