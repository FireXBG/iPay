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

  constructor(private accountService: AccountService) {
  }

  sendBalance() {
    const data = {email: this.email, amount: this.amount, currency: this.currency};
    console.log(this.currency)
    this.accountService.sendBalance(data).subscribe((response: any) => {
      console.log(response);
    });
  }
}
