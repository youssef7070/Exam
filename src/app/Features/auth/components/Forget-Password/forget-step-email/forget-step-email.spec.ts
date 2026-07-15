import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetStepEmail } from './forget-step-email';

describe('ForgetStepEmail', () => {
  let component: ForgetStepEmail;
  let fixture: ComponentFixture<ForgetStepEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetStepEmail],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetStepEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
