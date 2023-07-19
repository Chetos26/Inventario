import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterHardwareComponent } from './register-hardware/register-hardware.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HardwareComponent } from './hardware/hardware.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    DashboardComponent,
    RegisterHardwareComponent,
    UsersRegisterComponent,
    HardwareComponent,
    UsersComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
