import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMultiEditssComponent } from './modal-multi-editss.component';

describe('ModalMultiEditssComponent', () => {
  let component: ModalMultiEditssComponent;
  let fixture: ComponentFixture<ModalMultiEditssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMultiEditssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMultiEditssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
