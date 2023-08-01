import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneradorQrComponent } from './generador-qr.component';

describe('GeneradorQrComponent', () => {
  let component: GeneradorQrComponent;
  let fixture: ComponentFixture<GeneradorQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneradorQrComponent]
    });
    fixture = TestBed.createComponent(GeneradorQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
