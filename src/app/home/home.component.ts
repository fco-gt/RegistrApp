import { Component } from '@angular/core';
import { UserService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  qrCodeData: string = '';

  constructor(public userService: UserService) {}

  generateQRCode(): void {
    this.qrCodeData = 'http://localhost:8100/user/' + this.userService.username;
  }
}
