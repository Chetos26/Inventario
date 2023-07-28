import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { SharedComponent } from './shared/shared.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UsersComponent } from './pages/users/users.component';
import { HardwareComponent } from './pages/hardware/hardware.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { CategorySearchPipe } from './pipe/category-search.pipe';
import { FormsModule } from '@angular/forms';
import { GeneradorQrComponent } from './pages/generador-qr/generador-qr.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorySearchPipe, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthRoutingModule,
    PagesRoutingModule,
    AuthModule,
    PagesModule,
    AppRoutingModule
  ],
  providers: [/*CookieService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
