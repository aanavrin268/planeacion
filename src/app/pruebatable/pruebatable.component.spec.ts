import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebatableComponent } from './pruebatable.component';

describe('PruebatableComponent', () => {
  let component: PruebatableComponent;
  let fixture: ComponentFixture<PruebatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
