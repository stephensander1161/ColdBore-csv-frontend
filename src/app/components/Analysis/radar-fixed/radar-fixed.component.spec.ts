import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarFixedComponent } from './radar-fixed.component';

describe('RadarFixedComponent', () => {
  let component: RadarFixedComponent;
  let fixture: ComponentFixture<RadarFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarFixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
