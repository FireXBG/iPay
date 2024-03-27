import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance/balance.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { SendComponent } from './send/send.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
    BalanceComponent,
    AccountLayoutComponent,
    AddMoneyComponent,
    SendComponent,
    TransactionsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ]
})
export class AccountModule { }
