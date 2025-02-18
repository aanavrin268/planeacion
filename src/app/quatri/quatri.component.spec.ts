import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuatriComponent } from './quatri.component';

describe('QuatriComponent', () => {
  let component: QuatriComponent;
  let fixture: ComponentFixture<QuatriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuatriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuatriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
