import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KamraDetailsComponent } from './kamra-details.component';

describe('KamraDetailsComponent', () => {
  let component: KamraDetailsComponent;
  let fixture: ComponentFixture<KamraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KamraDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KamraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
