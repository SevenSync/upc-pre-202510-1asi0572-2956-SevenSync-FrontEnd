import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import {CreateProfileRequest} from '../model/create-profile.request';
import {Profile} from '../model/profile.entity';
import {HasProfileResponse, ProfileResponse, UserCreatedResponse, UserUpdatedResponse} from '../model/profile.response';
import {UpdateProfileRequest} from '../model/update-profile.request';

@Injectable({ providedIn: 'root' })
export class ProfileService extends BaseService<Profile> {
  protected resourceEndpoint = '/profiles';

  createProfile(request: CreateProfileRequest, token: string): Observable<UserCreatedResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.post<UserCreatedResponse>(this.resourcePath(), request, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  getMyProfile(token: string): Observable<ProfileResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<ProfileResponse>(`${this.resourcePath()}/me`, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  hasProfile(token: string): Observable<HasProfileResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.request<HasProfileResponse>('HEAD', `${this.resourcePath()}/me`, {
      headers,
      observe: 'body'
    }).pipe(retry(2), catchError(this.handleError));
  }

  updateProfile(request: UpdateProfileRequest, token: string): Observable<UserUpdatedResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.put<UserUpdatedResponse>(`${this.resourcePath()}/me`, request, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }
}
