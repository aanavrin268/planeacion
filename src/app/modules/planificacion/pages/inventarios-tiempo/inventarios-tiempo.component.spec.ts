import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosTiempoComponent } from './inventarios-tiempo.component';

describe('InventariosTiempoComponent', () => {
  let component: InventariosTiempoComponent;
  let fixture: ComponentFixture<InventariosTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventariosTiempoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
