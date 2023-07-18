import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHardwareComponent } from './register-hardware.component';

describe('RegisterHardwareComponent', () => {
  let component: RegisterHardwareComponent;
  let fixture: ComponentFixture<RegisterHardwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterHardwareComponent]
    });
    fixture = TestBed.createComponent(RegisterHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
