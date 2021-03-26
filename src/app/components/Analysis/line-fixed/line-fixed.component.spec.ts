import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineFixedComponent } from './line-fixed.component';

describe('LineFixedComponent', () => {
  let component: LineFixedComponent;
  let fixture: ComponentFixture<LineFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineFixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
