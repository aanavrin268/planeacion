import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanicasComponent } from './canicas.component';

describe('CanicasComponent', () => {
  let component: CanicasComponent;
  let fixture: ComponentFixture<CanicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanicasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
