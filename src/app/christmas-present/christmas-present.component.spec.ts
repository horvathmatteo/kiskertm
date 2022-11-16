import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChristmasPresentComponent } from './christmas-present.component';

describe('ChristmasPresentComponent', () => {
  let component: ChristmasPresentComponent;
  let fixture: ComponentFixture<ChristmasPresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChristmasPresentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChristmasPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
