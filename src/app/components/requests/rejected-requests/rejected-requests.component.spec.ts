import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedRequestsComponent } from './rejected-requests.component';

describe('RejectedRequestsComponent', () => {
  let component: RejectedRequestsComponent;
  let fixture: ComponentFixture<RejectedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
