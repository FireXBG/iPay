import { Component } from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent {
  currency: string = '';
  amount: number = 0;

  constructor(private accountService: AccountService) { }
  addMoney() {
    const data =  { currency: this.currency, amount: this.amount }
    this.accountService.addBalance(data)
  }
}
