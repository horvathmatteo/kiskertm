import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamOrderComponent } from './jam-order.component';

describe('JamOrderComponent', () => {
  let component: JamOrderComponent;
  let fixture: ComponentFixture<JamOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JamOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JamOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
