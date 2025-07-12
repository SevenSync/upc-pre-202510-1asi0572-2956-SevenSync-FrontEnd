import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SignUpRequest } from '../model/sign-up.request';
import { SignUpResponse } from '../model/sign-up.response';
import { SignInRequest } from '../model/sign-in.request';
import { SignInResponse } from '../model/sign-in.response';
import { PasswordResetRequest } from '../model/password-reset.request';
import { PasswordRecoveryResponse } from '../model/password-recovery.response';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private basePath = `${environment.serverBaseUrl}/auth`;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInUserEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    // Check if user is already signed in
    this.checkAuthState();
  }

  get isSignedIn(): Observable<boolean> {
    return this.signedIn.asObservable();
  }

  get currentUserId(): Observable<string> {
    return this.signedInUserId.asObservable();
  }

  get currentUserEmail(): Observable<string> {
    return this.signedInUserEmail.asObservable();
  }

  private checkAuthState(): void {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');

    if (token && uid && email) {
      this.signedIn.next(true);
      this.signedInUserId.next(uid);
      this.signedInUserEmail.next(email);
    }
  }

  signUp(request: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.basePath}/register`, request, this.httpOptions);
  }

  signIn(request: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.basePath}/login`, request, this.httpOptions);
  }

  handleSuccessfulSignIn(response: SignInResponse, email: string): void {
    this.signedIn.next(true);
    this.signedInUserId.next(response.uid);
    this.signedInUserEmail.next(email);

    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.uid);
    localStorage.setItem('userEmail', email);
  }

  logout(): Observable<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.clearAuthState();
      return new Observable(observer => observer.complete());
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<void>(`${this.basePath}/logout`, {}, { headers });
  }

  requestPasswordReset(request: PasswordResetRequest): Observable<PasswordRecoveryResponse> {
    return this.http.patch<PasswordRecoveryResponse>(`${this.basePath}/password-reset/request`, request, this.httpOptions);
  }

  signOut(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.logout().subscribe({
        next: () => {
          this.clearAuthState();
          this.router.navigate(['/login']);
        },
        error: () => {
          // Even if logout fails on server, clear local state
          this.clearAuthState();
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.clearAuthState();
      this.router.navigate(['/login']);
    }
  }

  private clearAuthState(): void {
    this.signedIn.next(false);
    this.signedInUserId.next('');
    this.signedInUserEmail.next('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
  }
}
