import { Component } from '@angular/core';
import { UserService } from '../service/data.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  qrCodeData: string = '';

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  generateQRCode(): void {
    this.qrCodeData = 'http://localhost:8100/user/' + this.userService.username;
  }

  logOut() {
    this.authService.setLogin(false);
    this.router.navigate(['/login']);
  }

  irAListaAlumnos() {
    this.router.navigate(['/lista-alumnos']); // Navegar a la ruta lista-alumnos
  }

}
