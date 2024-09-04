import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Lógica de autenticación aquí
    if (this.username && this.password) {
      // Suponiendo autenticación exitosa
      this.router.navigate(['/home']);
    } else {
      // Manejar errores de autenticación
      alert('Por favor, ingresa un usuario y contraseña válidos.');
    }
  }
}
