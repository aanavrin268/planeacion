import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonDataComponent } from './ribbon-data.component';

describe('RibbonDataComponent', () => {
  let component: RibbonDataComponent;
  let fixture: ComponentFixture<RibbonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
