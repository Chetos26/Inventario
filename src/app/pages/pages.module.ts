import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterHardwareComponent } from './register-hardware/register-hardware.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { HardwareComponent } from './hardware/hardware.component';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PagesComponent,
    HardwareComponent,
    UsersComponent,
    RegisterHardwareComponent,
    UsersRegisterComponent,
    DashboardComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PagesModule { }
