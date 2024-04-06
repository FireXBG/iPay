import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import {UserService} from "../user/user.service";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AccountMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AccountMenuComponent
  ],
  providers: [UserService]
})
export class CoreModule { }
