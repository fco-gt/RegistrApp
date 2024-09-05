import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
      console.log('Login submitted', this.loginForm.value);
    }
  }
}
