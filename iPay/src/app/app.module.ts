import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { UserRoutingModule } from './user/user-routing.module';
import { AccountModule } from './account/account.module';
import { AccountRoutingModule } from './account/account-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    RouterModule,
    UserRoutingModule,
    UserModule,
    AccountModule,
    AccountRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
