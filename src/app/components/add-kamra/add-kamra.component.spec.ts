import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKamraComponent } from './add-kamra.component';

describe('AddKamraComponent', () => {
  let component: AddKamraComponent;
  let fixture: ComponentFixture<AddKamraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKamraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKamraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
