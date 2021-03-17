import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBitcoinComponent } from './add-bitcoin.component';

describe('AddBitcoinComponent', () => {
  let component: AddBitcoinComponent;
  let fixture: ComponentFixture<AddBitcoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBitcoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
