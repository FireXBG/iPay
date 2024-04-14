import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {email: '', password: ''};
  message: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  login() {
    console.log('Login form submitted')

    if (!this.user.email || !this.user.password) {
      this.message = 'Email and password are required.';
      return;
    }

    this.userService.login(this.user).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('token', res.jwt);
        this.router.navigate(['/account']);
      } else {
        this.message = res.message;
        console.log(res.message)
      }
    }, (error: any) => {
      this.message = error.error.message;
      console.log(error)
    });
  }
}
