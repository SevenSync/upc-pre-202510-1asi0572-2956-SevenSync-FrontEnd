import { inject, Injectable } from '@angular/core';
import {ProfileHttpService} from '../../insfrastructure/services/profile-http.service';
import {Profile} from '../../domain/models/profile.model';

@Injectable({ providedIn: 'root' })
export class GetProfileUseCase {
  private service = inject(ProfileHttpService);
  execute(token: string) {
    return this.service.getProfile(token);
  }
}

// application/usecases/get-user-email.usecase.ts
@Injectable({ providedIn: 'root' })
export class GetUserEmailUseCase {
  private service = inject(ProfileHttpService);
  execute(uid: string, token: string) {
    return this.service.getUserEmail(uid, token);
  }
}

// application/usecases/update-profile.usecase.ts
@Injectable({ providedIn: 'root' })
export class UpdateProfileUseCase {
  private service = inject(ProfileHttpService);
  execute(profile: Profile, token: string) {
    return this.service.updateProfile(profile, token);
  }
}

// application/usecases/sign-out.usecase.ts
@Injectable({ providedIn: 'root' })
export class SignOutUseCase {
  private service = inject(ProfileHttpService);
  execute(token: string) {
    return this.service.signOut(token);
  }
}

// application/usecases/change-password.usecase.ts
@Injectable({ providedIn: 'root' })
export class ChangePasswordUseCase {
  private service = inject(ProfileHttpService);
  execute(newPassword: string, token: string) {
    return this.service.changePassword(newPassword, token);
  }
}

// application/usecases/delete-account.usecase.ts
@Injectable({ providedIn: 'root' })
export class DeleteAccountUseCase {
  private service = inject(ProfileHttpService);
  execute(token: string) {
    return this.service.deleteAccount(token);
  }
}
