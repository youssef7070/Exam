import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreataNewPassword } from './creata-new-password';

describe('CreataNewPassword', () => {
  let component: CreataNewPassword;
  let fixture: ComponentFixture<CreataNewPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreataNewPassword],
    }).compileComponents();

    fixture = TestBed.createComponent(CreataNewPassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
