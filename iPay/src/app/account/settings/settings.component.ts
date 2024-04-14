import {Component} from '@angular/core';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent {
  currentPassword: string = '';
  password: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(private userService: UserService) {
  }

  changePassword() {
    if (this.password !== this.newPassword) {
      this.message = 'Passwords do not match.';
      setTimeout(() => {
        this.message = '';
      }, 3000);
      return;
    }

    const data = {currentPassword: this.currentPassword, password: this.newPassword, newPassword: this.newPassword};
    this.userService.changePassword(data).subscribe({
      next: (res: any) => {
        this.message = res.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: (error: any) => {
        this.message = error.error.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    })
  }
}
