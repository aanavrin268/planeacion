import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManyModalsComponent } from './edit-many-modals.component';

describe('EditManyModalsComponent', () => {
  let component: EditManyModalsComponent;
  let fixture: ComponentFixture<EditManyModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditManyModalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditManyModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
