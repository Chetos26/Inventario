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
import { CategoriesComponent } from './categories/categories.component';
import { GeneradorQrComponent } from './generador-qr/generador-qr.component';

const routes: Routes = [
  {path:"pages", /*canActivate:[AuthGuard],*/ component: PagesComponent,
  children:[
    {path: "", component: DashboardComponent},
    {path:"hardware", /*canActivate:[AuthGuard],*/ component: HardwareComponent},
    {path:"hardware-register", /*canActivate:[AuthGuard],*/ component: RegisterHardwareComponent},
    {path: "categories", /*canActivate:[AuthGuard],*/component: CategoriesComponent},
    {path:"users", /*canActivate:[AuthGuard],*/ component: UsersComponent},
    {path:"users/:id_u", /*canActivate:[AuthGuard],*/ component: UsersComponent},
    {path:"users-register", /*canActivate:[AuthGuard],*/ component: UsersRegisterComponent},
    {path:"qr-generator", /*canActivate:[AuthGuard],*/ component: GeneradorQrComponent},
  ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
