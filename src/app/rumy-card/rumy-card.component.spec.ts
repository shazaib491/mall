import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RumyCardComponent } from './rumy-card.component';

describe('RumyCardComponent', () => {
  let component: RumyCardComponent;
  let fixture: ComponentFixture<RumyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RumyCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RumyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
