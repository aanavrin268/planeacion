import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeValueModalComponent } from './change-value-modal.component';

describe('ChangeValueModalComponent', () => {
  let component: ChangeValueModalComponent;
  let fixture: ComponentFixture<ChangeValueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeValueModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeValueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
