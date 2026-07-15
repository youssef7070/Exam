import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetMessageResetPassword } from './forget-message-reset-password';

describe('ForgetMessageResetPassword', () => {
  let component: ForgetMessageResetPassword;
  let fixture: ComponentFixture<ForgetMessageResetPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetMessageResetPassword],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetMessageResetPassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
