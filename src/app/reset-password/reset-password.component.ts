import { Component } from '@angular/core';
import { UserService } from '../data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService) {}

  resetPassword(password: string): void {
    this.userService.password = password;
  }

  onSubmit(): void {
    this.userService.password = this.confirmPassword;
    this.resetPassword(this.password);
  }
}
