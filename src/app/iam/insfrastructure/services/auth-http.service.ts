import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../domain/models/register-request.model';
import { Observable } from 'rxjs';
import {LoginRequest} from '../../domain/models/login-request.model';
import {RecoveryRequest} from '../../domain/models/recovery-request.model';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  private readonly url = 'https://macetech.azurewebsites.net/api/users/sign-up';

  constructor(private http: HttpClient) {}

  //REGISTER
  registerUser(payload: RegisterRequest): Observable<{ created: boolean }> {
    return this.http.post<{ created: boolean }>(this.url, payload);
  }

  // LOGIN:
  login(payload: LoginRequest): Observable<{ uid: string; token: string }> {
    return this.http.post<{ uid: string; token: string }>(
      'https://macetech.azurewebsites.net/api/users/sign-in',
      payload
    );
  }

  checkUserProfile(token: string): Observable<{ hasProfile: boolean }> {
    return this.http.get<{ hasProfile: boolean }>(
      'https://macetech.azurewebsites.net/api/profiles/has-profile',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  // Password Recovery
  sendPasswordRecoveryLink(payload: RecoveryRequest): Observable<{ sent: boolean }> {
    return this.http.patch<{ sent: boolean }>(
      'https://macetech.azurewebsites.net/api/users/password-recovery',
      payload
    );
  }


}
