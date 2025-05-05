import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverwriteHistoricModalComponent } from './overwrite-historic-modal.component';

describe('OverwriteHistoricModalComponent', () => {
  let component: OverwriteHistoricModalComponent;
  let fixture: ComponentFixture<OverwriteHistoricModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverwriteHistoricModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverwriteHistoricModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
