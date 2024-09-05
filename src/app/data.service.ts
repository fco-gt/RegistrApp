import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _username: string = '';
  private _password: string = '';

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  set username(value: string) {
    this._username = value;
  }

  set password(value: string) {
    this._password = value;
  }
}
