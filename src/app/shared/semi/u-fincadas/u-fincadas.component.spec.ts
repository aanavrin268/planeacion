import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UFincadasComponent } from './u-fincadas.component';

describe('UFincadasComponent', () => {
  let component: UFincadasComponent;
  let fixture: ComponentFixture<UFincadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UFincadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UFincadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
