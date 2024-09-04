import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor() {}

  onSubmit(): void {
    // Lógica de cambio de contraseña aquí
    if (this.username && this.password && this.confirmPassword) {
      if (this.password === this.confirmPassword) {
        // Suponiendo cambio de contraseña exitoso
        alert('Contraseña cambiada exitosamente.');
      } else {
        // Manejar errores de contraseña no coincidente
        alert('Las contraseñas no coinciden.');
      }
    } else {
      // Manejar errores de datos faltantes
      alert('Por favor, ingresa todos los campos.');
    }
  }
}
