import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KamraCardComponent } from './kamra-card.component';

describe('KamraCardComponent', () => {
  let component: KamraCardComponent;
  let fixture: ComponentFixture<KamraCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KamraCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KamraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
