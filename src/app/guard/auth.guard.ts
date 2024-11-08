import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el router

  if (authService.isLogin) {
    return true; // Si el usuario está autenticado, permite la activación
  } else {
    router.navigate(['/login']); // Si el usuario no está autenticado, redirige al login
    return false; // No permite la activación
  }
};

