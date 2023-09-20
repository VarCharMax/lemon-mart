import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../auth/auth-guard.service';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    UserManagerComponent,
    ReceiptLookupComponent,
  ],
  imports: [CommonModule, ManagerRoutingModule, MaterialModule],
  providers: [AuthService, AuthGuard],
})
export class ManagerModule {}
