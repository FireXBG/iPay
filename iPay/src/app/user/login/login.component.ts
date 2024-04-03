import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {
  }

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user)
    .then((data: any) => {
    console.log('Logged in successfully!')
  })
  .catch((error: any) => {
    console.log('Error logging in!');
  });
  }
}
