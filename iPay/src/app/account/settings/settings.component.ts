import {Component} from '@angular/core';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  password: string = '';
  newPassword: string = '';

  constructor(private userService: UserService) {
  }


  changePassword() {
    const data = {password: this.password, newPassword: this.newPassword};
    this.userService.changePassword(data).subscribe({
      next: (res) => {
        return res
      },
      error: (error) => {
        return error
      }
    })
  }
}
