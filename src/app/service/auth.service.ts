import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;

  setLogin(status: boolean){
    this.isLogin = status;
  }

  // Método para iniciar sesión (solo un ejemplo)
  login(token: string): void {
    localStorage.setItem('token', token); // Guardamos el token
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Eliminamos el token
  }
}
