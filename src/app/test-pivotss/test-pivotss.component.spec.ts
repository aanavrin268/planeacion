import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPivotssComponent } from './test-pivotss.component';

describe('TestPivotssComponent', () => {
  let component: TestPivotssComponent;
  let fixture: ComponentFixture<TestPivotssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPivotssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPivotssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
