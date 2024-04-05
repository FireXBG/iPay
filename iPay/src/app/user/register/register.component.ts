import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  constructor(private userService: UserService, private router: Router) {}

  register() {
    const user = { name: this.name, id: this.id, email: this.email, password: this.password, rePassword: this.rePassword };

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
