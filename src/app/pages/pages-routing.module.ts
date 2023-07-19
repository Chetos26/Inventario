import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HardwareComponent } from './hardware/hardware.component';
import { RegisterHardwareComponent } from './register-hardware/register-hardware.component';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { UsersRegisterComponent } from './users-register/users-register.component';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"pages", /*canActivate:[AuthGuard],*/ component: PagesComponent,
  children:[
<<<<<<< HEAD
    {path:"", component: DashboardComponent},
    {path:"hardware", canActivate:[AuthGuard], component: HardwareComponent},
    {path:"hardware-register", canActivate:[AuthGuard], component: RegisterHardwareComponent},
    {path:"users", canActivate:[AuthGuard], component: UsersRegisterComponent},
    {path:"users-register", canActivate:[AuthGuard], component: UsersRegisterComponent},
=======
    {path: "", component: DashboardComponent},
    {path:"hardware", /*canActivate:[AuthGuard],*/ component: HardwareComponent},
    {path:"hardware-register", /*canActivate:[AuthGuard],*/ component: RegisterHardwareComponent},
    {path:"users", /*canActivate:[AuthGuard],*/ component: UsersComponent},
    {path:"users-register", /*canActivate:[AuthGuard],*/ component: UsersRegisterComponent},
>>>>>>> 49bfff6baf44fce42422b1d3864a4a407b9f54f9
  ]
}
]

@NgModule({
<<<<<<< HEAD
  declarations: [],
=======
>>>>>>> 49bfff6baf44fce42422b1d3864a4a407b9f54f9
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
