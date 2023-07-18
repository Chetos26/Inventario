import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRegisterComponent } from './users-register.component';

describe('UsersRegisterComponent', () => {
  let component: UsersRegisterComponent;
  let fixture: ComponentFixture<UsersRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersRegisterComponent]
    });
    fixture = TestBed.createComponent(UsersRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
