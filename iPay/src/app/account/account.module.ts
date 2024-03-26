import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance/balance.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AccountLayoutComponent } from './account-layout/account-layout.component';



@NgModule({
  declarations: [
    BalanceComponent,
    AccountLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ]
})
export class AccountModule { }
