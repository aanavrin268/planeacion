import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorProductsComponent } from './proveedor-products.component';

describe('ProveedorProductsComponent', () => {
  let component: ProveedorProductsComponent;
  let fixture: ComponentFixture<ProveedorProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
