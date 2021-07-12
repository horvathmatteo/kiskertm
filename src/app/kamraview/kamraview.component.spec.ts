import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KamraviewComponent } from './kamraview.component';

describe('KamraviewComponent', () => {
  let component: KamraviewComponent;
  let fixture: ComponentFixture<KamraviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KamraviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KamraviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
