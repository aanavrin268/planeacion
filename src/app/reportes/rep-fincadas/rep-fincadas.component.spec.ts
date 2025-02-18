import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepFincadasComponent } from './rep-fincadas.component';

describe('RepFincadasComponent', () => {
  let component: RepFincadasComponent;
  let fixture: ComponentFixture<RepFincadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepFincadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepFincadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
