import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';

@NgModule({
  declarations: [ManagerHomeComponent, ManagerComponent, UserManagerComponent, ReceiptLookupComponent],
  imports: [CommonModule, ManagerRoutingModule, MaterialModule],
})
export class ManagerModule {}
