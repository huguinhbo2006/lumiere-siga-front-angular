import { Injectable, computed, signal } from '@angular/core';

import { CurrentUserModel } from '../models/auth/current-user.model';
import { LoginRequestModel } from '../models/auth/login-request.model';
import { LoginResponseModel } from '../models/auth/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly STORAGE_KEY = 'nova-user';

  private currentUserSignal =
    signal<CurrentUserModel | null>(null);

  readonly currentUser =
    this.currentUserSignal.asReadonly();

  readonly isAuthenticated =
    computed(() => this.currentUserSignal() !== null);

  constructor() {
    this.loadUser();
  }

  login(data: LoginRequestModel): void {

    console.log('Login request', data);

  }

  setSession(response: LoginResponseModel): void {

    this.currentUserSignal.set(response.user);

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(response.user)
    );

  }

  logout(): void {

    this.currentUserSignal.set(null);

    localStorage.removeItem(this.STORAGE_KEY);

  }

  private loadUser(): void {

    const storedUser =
      localStorage.getItem(this.STORAGE_KEY);

    if (!storedUser) {
      return;
    }

    this.currentUserSignal.set(
      JSON.parse(storedUser)
    );

  }

}