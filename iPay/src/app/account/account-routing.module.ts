import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountLayoutComponent } from "./account-layout/account-layout.component";
import { BalanceComponent } from "./balance/balance.component";
import { AddMoneyComponent } from "./add-money/add-money.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { SendComponent } from "./send/send.component";
import { SettingsComponent } from "./settings/settings.component";
import {AuthGuard} from "../user/guards/auth.guard";

const routes: Routes = [
  {
    path: 'account',
    component: AccountLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'balance', component: BalanceComponent, canActivate: [AuthGuard] },
      { path: 'add', component: AddMoneyComponent, canActivate: [AuthGuard] },
      { path: 'send', component: SendComponent, canActivate: [AuthGuard] },
      { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
