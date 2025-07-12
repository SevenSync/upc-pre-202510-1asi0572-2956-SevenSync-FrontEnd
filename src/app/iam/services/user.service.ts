import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChangePasswordRequest } from '../model/change-password.request';
import { ChangePasswordResponse } from '../model/change-password.response';
import { DeleteUserResponse } from '../model/delete-user.response';
import { UserResponse } from '../model/user.response';

@Injectable({ providedIn: 'root' })
export class UserService {
  private basePath = `${environment.serverBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  getUserById(uid: string, token: string): Observable<UserResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<UserResponse>(`${this.basePath}/${uid}`, { headers });
  }

  changePassword(newPassword: string, token: string): Observable<ChangePasswordResponse> {
    const headers = this.getAuthHeaders(token);
    const request = new ChangePasswordRequest(newPassword);
    return this.http.post<ChangePasswordResponse>(`${this.basePath}/me/password`, request, { headers });
  }

  deleteAccount(token: string): Observable<DeleteUserResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.delete<DeleteUserResponse>(`${this.basePath}/me`, { headers });
  }

  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
