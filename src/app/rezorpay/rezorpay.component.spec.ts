import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezorpayComponent } from './rezorpay.component';

describe('RezorpayComponent', () => {
  let component: RezorpayComponent;
  let fixture: ComponentFixture<RezorpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezorpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezorpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
