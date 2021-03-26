import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarFixedComponent } from './polar-fixed.component';

describe('PolarFixedComponent', () => {
  let component: PolarFixedComponent;
  let fixture: ComponentFixture<PolarFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolarFixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
