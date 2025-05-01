import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonInformationComponent } from './ribbon-information.component';

describe('RibbonInformationComponent', () => {
  let component: RibbonInformationComponent;
  let fixture: ComponentFixture<RibbonInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RibbonInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RibbonInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
