import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashInventarioComponent } from './dash-inventario.component';

describe('DashInventarioComponent', () => {
  let component: DashInventarioComponent;
  let fixture: ComponentFixture<DashInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
