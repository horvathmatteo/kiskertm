import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KamraListComponent } from './kamra-list.component';

describe('KamraListComponent', () => {
  let component: KamraListComponent;
  let fixture: ComponentFixture<KamraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KamraListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KamraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
