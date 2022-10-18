import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSectorComponent } from './business-sector.component';

describe('BusinessSectorComponent', () => {
  let component: BusinessSectorComponent;
  let fixture: ComponentFixture<BusinessSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
