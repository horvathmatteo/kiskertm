import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegetableBoxComponent } from './vegetable-box.component';

describe('VegetableBoxComponent', () => {
  let component: VegetableBoxComponent;
  let fixture: ComponentFixture<VegetableBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegetableBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VegetableBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
