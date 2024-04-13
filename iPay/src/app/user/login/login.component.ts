import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const user = this.loginForm.value;

    this.userService.login(user).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('token', res.jwt);
        this.router.navigate(['/account']);
      } else {
        throw new Error('Invalid credentials');
      }
    }, (error: any) => {
      console.error(error);
    });
  }
}
