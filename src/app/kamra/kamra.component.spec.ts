import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KamraComponent } from './kamra.component';

describe('KamraComponent', () => {
  let component: KamraComponent;
  let fixture: ComponentFixture<KamraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KamraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KamraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
