import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // Include the HTML template here
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    const user = {email: this.email, password: this.password};

    this.userService.login(user).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('token', res.jwt);
        this.router.navigate(['/account']);
      } else {
        throw new Error('Invalid credentials');
      }
    }), (error: any) => {
      console.error(error);
    }
  }
}
