import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { AuthService } from './auth/auth.service';
import { SimpleDialogComponent } from './common/simple-dialog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SimpleDialogComponent,
    NavigationMenuComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
