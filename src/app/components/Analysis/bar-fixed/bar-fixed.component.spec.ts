import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarFixedComponent } from './bar-fixed.component';

describe('BarFixedComponent', () => {
  let component: BarFixedComponent;
  let fixture: ComponentFixture<BarFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarFixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
