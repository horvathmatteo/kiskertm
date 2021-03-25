import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsviewComponent } from './plantsview.component';

describe('PlantsviewComponent', () => {
  let component: PlantsviewComponent;
  let fixture: ComponentFixture<PlantsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
