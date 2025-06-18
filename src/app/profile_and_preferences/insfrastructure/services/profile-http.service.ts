import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Profile, ProfileResponse} from '../../domain/models/profile.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileHttpService {
  private readonly url = 'https://macetech.azurewebsites.net/api/profiles/create';

  constructor(private http: HttpClient) {}

  createProfile(profile: Profile, token: string): Observable<{ created: boolean }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<{ created: boolean }>(this.url, profile, { headers });
  }

  getProfile(token: string): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>('https://macetech.azurewebsites.net/api/profiles/get', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getUserEmail(uid: string, token: string): Observable<{ email: string }> {
    return this.http.get<{ email: string }>(`https://macetech.azurewebsites.net/api/users/${uid}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateProfile(profile: Profile, token: string): Observable<any> {
    return this.http.put('https://macetech.azurewebsites.net/api/profiles/update', profile, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  signOut(token: string): Observable<any> {
    return this.http.post('https://macetech.azurewebsites.net/api/users/sign-out', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  //DIALOGS

  changePassword(newPassword: string, token: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>('https://macetech.azurewebsites.net/api/users/change-password', {
      newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deleteAccount(token: string): Observable<any> {
    return this.http.delete('https://macetech.azurewebsites.net/api/users/delete-account', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }





}
