import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseHistoricsComponent } from './choose-historics.component';

describe('ChooseHistoricsComponent', () => {
  let component: ChooseHistoricsComponent;
  let fixture: ComponentFixture<ChooseHistoricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseHistoricsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseHistoricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
