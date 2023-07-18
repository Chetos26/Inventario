import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterHardwareComponent } from './register-hardware/register-hardware.component';
import { UsersRegisterComponent } from './users-register/users-register.component';



@NgModule({
  declarations: [
    RegisterHardwareComponent,
    UsersRegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
