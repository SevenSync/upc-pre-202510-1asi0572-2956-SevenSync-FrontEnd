import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../../profiles/services/profile.service';
import { SignInRequest } from '../../model/sign-in.request';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SignInComponent,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  translate : TranslateService= inject(TranslateService);
  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  onSignIn(signInRequest: SignInRequest): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.signIn(signInRequest).subscribe({
      next: (response) => {
        this.authService.handleSuccessfulSignIn(response, signInRequest.email);
        this.checkUserProfile(response.token);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        this.errorMessage = this.translate.instant('LOGIN.ERROR.INVALID_CREDENTIALS');
      }
    });
  }

  private checkUserProfile(token: string): void {
    this.profileService.hasProfile(token).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.hasProfile) {
          this.router.navigate(['/pots']);
        } else {
          this.router.navigate(['/create-profile']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error checking profile:', error);
        this.router.navigate(['/create-profile']);
      }
    });
  }
}
