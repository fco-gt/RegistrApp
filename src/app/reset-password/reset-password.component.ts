import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
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
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  formState = 'hidden';
  logoState = 'normal';

  username: string = '';
  password: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetPasswordForm = this.fb.group({
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
    if (this.resetPasswordForm.valid) {
      this.username = this.resetPasswordForm.value.username;
      this.password = this.resetPasswordForm.value.password;
      this.redirectToHomePage();

      this.resetPasswordForm.reset();
    }
  }

  redirectToHomePage() {
    this.router.navigate(['/home']);
  }
}
