import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../domain/models/login-request.model';
import {AuthHttpService} from '../../insfrastructure/services/auth-http.service';

@Injectable({ providedIn: 'root' })
export class SignInUserUseCase {
  private authHttp = inject(AuthHttpService);

  execute(data: LoginRequest) {
    return this.authHttp.login(data);
  }

  checkProfile(token: string) {
    return this.authHttp.checkUserProfile(token);
  }
}
