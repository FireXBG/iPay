import {Component} from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent {
  currency: string = '';
  amount: number = 0;
  message: string = '';

  constructor(private accountService: AccountService) {
  }

  addMoney() {
    const data = {currency: this.currency, amount: this.amount}
    if (!this.currency || !this.amount) {
      this.message = 'Please fill in all fields!';
      setTimeout(() => {
        this.message = '';
      }, 3000)
      return;
    }

    if (this.amount <= 0) {
      this.message = 'Amount must be greater than 0!';
      setTimeout(() => {
        this.message = '';
      }, 3000)
      return;
    }

    this.accountService.addBalance(data).subscribe((res: any) => {
      if (res.message) {
        this.message = res.message;
        setTimeout(() => {
          this.message = '';
        }, 3000)
      } else {
        this.message = 'There was an error!';
      }
    });
  }
}
