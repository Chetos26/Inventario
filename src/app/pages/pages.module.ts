import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterHardwareComponent } from './register-hardware/register-hardware.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
import { HardwareComponent } from './hardware/hardware.component';
import { UsersComponent } from './users/users.component';
=======
import { HardwareComponent } from './hardware/hardware.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
>>>>>>> 49bfff6baf44fce42422b1d3864a4a407b9f54f9



@NgModule({
  declarations: [
<<<<<<< HEAD
    DashboardComponent,
    RegisterHardwareComponent,
    UsersRegisterComponent,
    HardwareComponent,
    UsersComponent,
=======
    PagesComponent,
    HardwareComponent,
    UsersComponent,
    RegisterHardwareComponent,
    UsersRegisterComponent,
>>>>>>> 49bfff6baf44fce42422b1d3864a4a407b9f54f9
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    SharedModule,
  ]
})
export class PagesModule { }
