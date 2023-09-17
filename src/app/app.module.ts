import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
