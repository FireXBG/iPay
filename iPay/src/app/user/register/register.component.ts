import { Component } from '@angular/core';
import { UserService } from '../user.service';

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
  constructor(private userService: UserService) {}

  register() {
    const user = { name: this.name, id: this.id, email: this.email, password: this.password, rePassword: this.rePassword };
    this.userService.register(user).then((data: any) => {
      console.log('Registered successfully!')
    }).catch((error:any) => {
      console.log('Error registering!')
    })
  }
}
