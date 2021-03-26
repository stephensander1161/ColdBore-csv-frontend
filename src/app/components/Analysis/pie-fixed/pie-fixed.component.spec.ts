import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieFixedComponent } from './pie-fixed.component';

describe('PieFixedComponent', () => {
  let component: PieFixedComponent;
  let fixture: ComponentFixture<PieFixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieFixedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
