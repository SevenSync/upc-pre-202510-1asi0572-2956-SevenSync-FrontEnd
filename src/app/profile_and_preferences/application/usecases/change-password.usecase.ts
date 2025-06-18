import { inject, Injectable } from '@angular/core';
import {ProfileHttpService} from '../../insfrastructure/services/profile-http.service';

@Injectable({ providedIn: 'root' })
export class ChangePasswordUseCase {
  private service = inject(ProfileHttpService);

  execute(newPassword: string, token: string) {
    return this.service.changePassword(newPassword, token);
  }
}
