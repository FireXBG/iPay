import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from "@angular/router";
import {NgForm} from '@angular/forms';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  id: string = '';
  email: string = '';
  password: string = '';
  rePassword: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  register(form: NgForm) {
    if (!this.name || !this.id || !this.email || !this.password || !this.rePassword) {
      this.message = 'Please fill all the fields.';
      setTimeout(() => {
        this.message = '';
      }, 3000);
      return;
    }

    if (form.invalid) {
      return;
    }

    const user = {name: this.name, id: this.id, email: this.email, password: this.password};

    this.userService.register(user).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => new Error('Invalid credentials'));
      })
    ).subscribe((res: any) => {
      if (res.success) {
        this.router.navigate(['/login']);
      } else {
        throw new Error('Invalid credentials');
      }
    });
  }
}
