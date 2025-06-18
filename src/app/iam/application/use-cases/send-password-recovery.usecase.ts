import { inject, Injectable } from '@angular/core';
import { RecoveryRequest } from '../../domain/models/recovery-request.model';
import {AuthHttpService} from '../../insfrastructure/services/auth-http.service';

@Injectable({ providedIn: 'root' })
export class SendPasswordRecoveryUseCase {
  private authHttp = inject(AuthHttpService);

  execute(payload: RecoveryRequest) {
    return this.authHttp.sendPasswordRecoveryLink(payload);
  }
}
