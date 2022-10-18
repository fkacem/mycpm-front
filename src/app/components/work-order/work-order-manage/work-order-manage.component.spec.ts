import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderManageComponent } from './work-order-manage.component';

describe('WorkOrderManageComponent', () => {
  let component: WorkOrderManageComponent;
  let fixture: ComponentFixture<WorkOrderManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkOrderManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
