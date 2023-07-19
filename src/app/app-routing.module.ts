import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { NoFoundPagesComponent } from './no-found-pages/no-found-pages.component';

const routes: Routes = [
  {path:'', redirectTo: 'pages',pathMatch: 'full'},
  {path:'**', component: NoFoundPagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
