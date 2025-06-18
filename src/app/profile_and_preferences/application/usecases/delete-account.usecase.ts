import { inject, Injectable } from '@angular/core';
import {ProfileHttpService} from '../../insfrastructure/services/profile-http.service';

@Injectable({ providedIn: 'root' })
export class DeleteAccountUseCase {
  private service = inject(ProfileHttpService);

  execute(token: string) {
    return this.service.deleteAccount(token);
  }
}
