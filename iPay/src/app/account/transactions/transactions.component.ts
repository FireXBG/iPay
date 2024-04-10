import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any = [];
  isLoaded = false;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.getTransactions().subscribe((response: any) => {
      setTimeout(() => {
        this.transactions = response.reverse();
        this.isLoaded = true;
      }, 1200)
    })
  }

}
