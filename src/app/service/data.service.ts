// user.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  username: string = '';
  password: string = '';

  // Método de autenticación simulado (en un caso real harías una llamada HTTP a tu API)
  authenticate(username: string, password: string): Observable<boolean> {
    // Aquí simplemente verificamos si las credenciales coinciden con algo, por ejemplo:
    if (username === 'user' && password === 'password') {
      return of(true); // Simulamos una autenticación exitosa
    } else {
      return of(false); // Simulamos un fallo de autenticación
    }
  }
}
