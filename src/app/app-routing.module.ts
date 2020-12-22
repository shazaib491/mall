import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RumyCardComponent } from './rumy-card/rumy-card.component';

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

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
