import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../app-material.module';
import { AuthGuard } from '../auth/auth-guard.service';
import { AuthService } from '../auth/auth.service';
import { SharedComponentModule } from '../shared-components.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserTableComponent } from './user-table/user-table.component';

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    UserManagerComponent,
    ReceiptLookupComponent,
    UserTableComponent,
  ],
  imports: [CommonModule, ManagerRoutingModule, MaterialModule, SharedComponentModule],
  providers: [AuthService, AuthGuard],
})
export class ManagerModule {}
