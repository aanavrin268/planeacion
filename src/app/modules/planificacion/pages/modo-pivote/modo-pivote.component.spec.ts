import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoPivoteComponent } from './modo-pivote.component';

describe('ModoPivoteComponent', () => {
  let component: ModoPivoteComponent;
  let fixture: ComponentFixture<ModoPivoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModoPivoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModoPivoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
