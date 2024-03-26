import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountLayoutComponent } from "./account-layout/account-layout.component";
import { BalanceComponent } from "./balance/balance.component";

const routes: Routes = [
  { 
    path: 'account', 
    component: AccountLayoutComponent, 
    children: [
      { path: 'balance', component: BalanceComponent },
      // Other account routes here
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }