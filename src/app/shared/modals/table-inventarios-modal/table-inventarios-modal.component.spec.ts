import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInventariosModalComponent } from './table-inventarios-modal.component';

describe('TableInventariosModalComponent', () => {
  let component: TableInventariosModalComponent;
  let fixture: ComponentFixture<TableInventariosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInventariosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableInventariosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
