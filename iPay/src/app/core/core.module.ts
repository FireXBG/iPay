import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AccountMenuComponent } from './account-menu/account-menu.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AccountMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AccountMenuComponent
  ]
})
export class CoreModule { }
