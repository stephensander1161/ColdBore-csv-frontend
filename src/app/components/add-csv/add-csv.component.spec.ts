import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCsvComponent } from './add-csv.component';

describe('AddCsvComponent', () => {
  let component: AddCsvComponent;
  let fixture: ComponentFixture<AddCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
