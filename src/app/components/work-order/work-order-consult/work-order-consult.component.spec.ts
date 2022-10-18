import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderConsultComponent } from './work-order-consult.component';

describe('WorkOrderConsultComponent', () => {
  let component: WorkOrderConsultComponent;
  let fixture: ComponentFixture<WorkOrderConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderConsultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkOrderConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
