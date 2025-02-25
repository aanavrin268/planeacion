import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashReportsComponent } from './dash-reports.component';

describe('DashReportsComponent', () => {
  let component: DashReportsComponent;
  let fixture: ComponentFixture<DashReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
