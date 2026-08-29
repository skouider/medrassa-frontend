import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenService } from './token-service';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/login-request';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);

  private tokenService = inject(TokenService);

  private api = environment.apiUrl + '/auth';

  login(dto: LoginRequest): Observable<LoginResponse> {
          
    return this.http.post<LoginResponse>(
      this.api + '/login',
      dto
    ).pipe(

      tap(response => {
       
        
        this.tokenService.saveToken(response.token);

      })

    );

  }

  logout(): void {

    this.tokenService.removeToken();

  }

}
