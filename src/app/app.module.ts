import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { CategorySearchPipe } from './pipe/category-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CategorySearchPipe
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
