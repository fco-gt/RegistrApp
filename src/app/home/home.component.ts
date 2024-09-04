import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  username: string = 'Usuario'; // Puedes reemplazar esto con el valor real
  qrCodeData: string = '';

  constructor() {}

  generateQRCode(): void {
    this.qrCodeData = `Datos para QR generados por ${
      this.username
    } en ${new Date().toISOString()}`;
  }
}
