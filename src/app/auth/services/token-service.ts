import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'jwt_token';

  private jwtHelper = new JwtHelperService();

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {

    const token = this.getToken();

    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {

    const token = this.getToken();

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return false;
    }

    try {

      const payload: any = this.jwtHelper.decodeToken(token);

      return payload.role === 'ROLE_ADMIN';

    } catch (error) {

      console.error('Impossible de lire le rôle du token', error);

      return false;
    }
  }
}