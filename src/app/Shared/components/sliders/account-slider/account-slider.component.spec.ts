import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSliderComponent } from './account-slider.component';

describe('AccountSliderComponent', () => {
  let component: AccountSliderComponent;
  let fixture: ComponentFixture<AccountSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSliderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
