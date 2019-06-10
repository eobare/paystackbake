import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentNewComponent } from './payment-new/payment-new.component';
import { PaymentTransfersComponent } from './payment-transfers/payment-transfers.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'payment/new',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'payment/new',
    component: PaymentNewComponent
  },
  {
    path: 'payment/transfers',
    component: PaymentTransfersComponent
  },
  {
    path: 'vendor/add',
    component: VendorAddComponent
  },
  {
    path: 'vendor/list',
    component: VendorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
