import { inject, Injectable } from '@angular/core';
import { Profile } from '../../domain/models/profile.model';
import {ProfileHttpService} from '../../insfrastructure/services/profile-http.service';

@Injectable({ providedIn: 'root' })
export class CreateProfileUseCase {
  private profileHttp = inject(ProfileHttpService);

  execute(profile: Profile, token: string) {
    return this.profileHttp.createProfile(profile, token);
  }
}
