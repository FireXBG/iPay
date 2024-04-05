import { Component } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private userService: UserService, private router: Router) {}

  login() {
    const user = { email: this.email, password: this.password };

    this.userService.login(user).subscribe((res: any) => {
      if(res.success) {
        localStorage.setItem('token', res.jwt);
        this.router.navigate(['/account']);
      } else {
        throw new Error('Invalid credentials');
      }
    }),
      (error: any) => {
      console.error(error);
      }
  }

}
