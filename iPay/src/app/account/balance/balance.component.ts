import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  BGN: Number = 0;
  EUR: Number = 0;
  USD: Number = 0;
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getBalance().subscribe((assets: any) => {
      this.BGN = assets.BGN;
      this.EUR = assets.EUR;
      this.USD = assets.USD;
    });
  }
}
