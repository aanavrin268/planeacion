import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProductossComponent } from './dash-productoss.component';

describe('DashProductossComponent', () => {
  let component: DashProductossComponent;
  let fixture: ComponentFixture<DashProductossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashProductossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashProductossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
