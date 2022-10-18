import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentManageComponent } from './attachment-manage.component';

describe('AttachmentManageComponent', () => {
  let component: AttachmentManageComponent;
  let fixture: ComponentFixture<AttachmentManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
