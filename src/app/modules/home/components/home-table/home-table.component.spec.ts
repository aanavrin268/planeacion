import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTableComponent } from './home-table.component';

describe('HomeTableComponent', () => {
  let component: HomeTableComponent;
  let fixture: ComponentFixture<HomeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
