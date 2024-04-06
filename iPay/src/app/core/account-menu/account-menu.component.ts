import { Component } from '@angular/core';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent {

    constructor(private userService: UserService) {}
    logout(): void {
        this.userService.logout();
    }
}
