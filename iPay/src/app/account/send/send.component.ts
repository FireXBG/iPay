import {Component} from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent {
  email: string = '';
  amount: number = 0;
  currency: string = '';
  message: string = '';

  constructor(private accountService: AccountService) {
  }

  sendBalance() {
    const data = {email: this.email, amount: this.amount, currency: this.currency};

    if (!this.email || !this.amount || !this.currency) {
      this.message = 'Please fill all the fields.';
      setTimeout(() => {
        this.message = '';
      }, 3000);
      return;
    }

    this.accountService.sendBalance(data).subscribe((res: any) => {
      if (res.message) {
        this.message = res.message;
        setTimeout(() => {
          this.message = res.message;
        }, 3000)
      } else {
        this.message = res.error;
        setTimeout(() => {
          this.message = 'Something went wrong! Please try again.'
        }, 3000)
      }
    });
  }
}
