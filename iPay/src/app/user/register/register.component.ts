import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', [Validators.required, this.idLengthValidator]],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.value.password !== this.registerForm.value.rePassword) {
      this.registerForm.get('rePassword')?.setErrors({notSame: true});
      return;
    }

    const user = this.registerForm.value;

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

  // Custom Validators
  idLengthValidator(control: any) {
    if (control.value && (control.value.length !== 10)) {
      return {idLength: true};
    }
    return null;
  }

  emailValidator(control: any) {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}/;
    if (control.value && !emailRegex.test(control.value)) {
      return {invalidEmail: true};
    }
    return null;
  }
}
