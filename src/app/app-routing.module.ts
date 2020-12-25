import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { RumyCardComponent } from './rumy-card/rumy-card.component';
import {WalletComponent} from './wallet/wallet.component';
import {BankCardComponent} from './bank-card/bank-card.component';
import { Card2Component } from './card2/card2.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AddressComponent } from './address/address.component';
import { NewAddressComponent } from './new-address/new-address.component';
import { NumberCardComponent } from './number-card/number-card.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'pays', loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule) },
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"rumy",
    component:RumyCardComponent

  },
  {
    path:'pcenter',
    component:PersonalCenterComponent
  },
  {
    path:"wallet",
    component:WalletComponent
  },
  {
    path:"cards",
    component:BankCardComponent
  },
  {
    path:"card2",
    component:Card2Component
  },
  {
    path:"myOrder",
    component:MyOrderComponent
  },
  {
    path:"address",
    component:AddressComponent
  },
  {
    path:"newAddress",
    component:NewAddressComponent
  },
  {
    path:"number",
    component:NumberCardComponent
  },
  {
    path:"bankDetail",
    component:BankDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
