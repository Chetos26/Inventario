import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HardwareComponent } from './hardware/hardware.component';
import { RegisterHardwareComponent } from './register-hardware/register-hardware.component';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path:"pages", canActivate:[AuthGuard], component: PagesComponent,
  children:[
    {path:"hardware", canActivate:[AuthGuard], component: HardwareComponent},
    {path:"hardware-register", canActivate:[AuthGuard], component: RegisterHardwareComponent},
    {path:"users", canActivate:[AuthGuard], component: UsersComponent},
    {path:"users-register", canActivate:[AuthGuard], component: UsersRegisterComponent},
  ]
}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PagesRoutingModule { }
