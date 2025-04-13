import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiComparativaComponent } from './multi-comparativa.component';

describe('MultiComparativaComponent', () => {
  let component: MultiComparativaComponent;
  let fixture: ComponentFixture<MultiComparativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiComparativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiComparativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
