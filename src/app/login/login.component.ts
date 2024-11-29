import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [
    trigger('formAnimation', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('hidden => visible', animate('300ms ease-out')),
    ]),
    trigger('logoAnimation', [
      state(
        'normal',
        style({
          transform: 'scale(1)',
        })
      ),
      state(
        'zoomed',
        style({
          transform: 'scale(1.1)',
        })
      ),
      transition('normal <=> zoomed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formState = 'hidden';
  logoState = 'normal';

  email: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.formState = 'visible';
      this.logoState = 'zoomed';
      setTimeout(() => (this.logoState = 'normal'), 300);
    }, 100);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.email = this.loginForm.value.email;
      this.password = this.loginForm.value.password;

      const loginData = { email: this.email, password: this.password };
      let endpoint = '';
      let isStudent = false;

      // Verificar si el usuario es un estudiante o un profesor
      if (this.email.includes('@estudiante.com')) {
        endpoint = 'students/login';
        isStudent = true;
      } else if (this.email.includes('@profesor.com')) {
        endpoint = 'teachers/login';
      }

      this.authService.login(endpoint, loginData).subscribe(
        (response) => {
    
          // Guardar datos del usuario en localStorage
          const user = isStudent ? response.student : response.teacher;
          user.isStudent = isStudent;

          localStorage.setItem('userData', JSON.stringify(user));

          // Redirigir al usuario
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      );
      
      this.loginForm.reset();
    }
  }
}
