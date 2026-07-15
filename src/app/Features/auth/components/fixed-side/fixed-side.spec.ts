import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSide } from './fixed-side';

describe('FixedSide', () => {
  let component: FixedSide;
  let fixture: ComponentFixture<FixedSide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedSide],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedSide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
