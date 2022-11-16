import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KamraOrderComponent } from './kamra-order.component';

describe('KamraOrderComponent', () => {
  let component: KamraOrderComponent;
  let fixture: ComponentFixture<KamraOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KamraOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KamraOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
