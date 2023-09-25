import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../app-material.module';
import { LogoutComponent } from './logout/logout.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { UserMaterialModule } from './user-material.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ProfileComponent, LogoutComponent, NavigationMenuComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserMaterialModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
