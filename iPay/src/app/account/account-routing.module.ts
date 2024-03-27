import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountLayoutComponent } from "./account-layout/account-layout.component";
import { BalanceComponent } from "./balance/balance.component";
import { AddMoneyComponent } from "./add-money/add-money.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { SendComponent } from "./send/send.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
  { 
    path: 'account', 
    component: AccountLayoutComponent, 
    children: [
      { path: 'balance', component: BalanceComponent },
      { path: 'add', component: AddMoneyComponent },
      { path: 'send', component: SendComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'settings', component: SettingsComponent },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }