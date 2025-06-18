import { inject, Injectable } from '@angular/core';
import {AuthHttpService} from '../../insfrastructure/services/auth-http.service';
import {RegisterRequest} from '../../domain/models/register-request.model';


@Injectable({ providedIn: 'root' })
export class RegisterUserUseCase {
  private authHttp = inject(AuthHttpService);

  execute(data: RegisterRequest) {
    return this.authHttp.registerUser(data);
  }
}
