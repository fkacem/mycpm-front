import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionComponent } from './profession.component';

describe('ProfessionComponent', () => {
  let component: ProfessionComponent;
  let fixture: ComponentFixture<ProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
