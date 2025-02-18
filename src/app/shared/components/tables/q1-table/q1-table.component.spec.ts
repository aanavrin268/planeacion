import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q1TableComponent } from './q1-table.component';

describe('Q1TableComponent', () => {
  let component: Q1TableComponent;
  let fixture: ComponentFixture<Q1TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Q1TableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Q1TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
