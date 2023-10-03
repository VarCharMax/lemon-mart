import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { Role } from '../auth/role.enum';
import { UserResolve } from '../user/user.resolve';
import { ViewUserComponent } from '../user/view-user/view-user.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerComponent } from './manager.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      { path: '', redirectTo: '/manager/home', pathMatch: 'full' },
      {
        path: 'home',
        component: ManagerHomeComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: Role.Manager },
      },
      {
        path: 'users',
        component: UserManagerComponent,
        children: [
          { path: '', component: UserTableComponent, outlet: 'master' },
          {
            path: 'user',
            component: ViewUserComponent,
            outlet: 'detail',
            resolve: { user: UserResolve },
          },
        ],
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
        data: { expectedRole: Role.Manager },
      },
      {
        path: 'receipts',
        component: ReceiptLookupComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: Role.Manager },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
