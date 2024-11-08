import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserService } from '../service/data.service';
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

  username: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
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
      this.username = this.loginForm.value.username;
      this.password = this.loginForm.value.password;

      // Usar el servicio para autenticar al usuario
      this.user.authenticate(this.username, this.password).subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.authService.setLogin(true);
          this.router.navigate(['/home']);
        } else {
          // Si las credenciales son incorrectas, puedes mostrar un mensaje de error
          alert('Credenciales incorrectas');
        }
      });

      this.loginForm.reset();
    }
  }
}
