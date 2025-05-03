import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonColumnsComponent } from './ribbon-columns.component';

describe('RibbonColumnsComponent', () => {
  let component: RibbonColumnsComponent;
  let fixture: ComponentFixture<RibbonColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonColumnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
