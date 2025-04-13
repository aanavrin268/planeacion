import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComparativaComponent } from './main-comparativa.component';

describe('MainComparativaComponent', () => {
  let component: MainComparativaComponent;
  let fixture: ComponentFixture<MainComparativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComparativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComparativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
