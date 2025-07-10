import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ToolbarComponent} from '../../../shared/components/toolbar/toolbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Profile} from '../../model/profile.entity';
import {ProfileService} from '../../services/profile.service';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {UserService} from '../../../iam/services/user.service';
import {Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UpdateProfileRequest} from '../../model/update-profile.request';
import {ChangePasswordDialogComponent} from '../../components/change-password-dialog/change-password-dialog';
import {DeleteAccountDialogComponent} from '../../components/delete-account-dialog/delete-account-dialog';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ProfileFormComponent} from '../../components/profile-form/profile-form.component';
import {Subscription} from '../../../subscriptions/model/subscription.entity';
import {SubscriptionPlanType, SubscriptionStatus} from '../../../subscriptions/model/subscription.entity';
import {SubscriptionService} from '../../../subscriptions/services/subscription.service';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSlideToggleModule,
    RouterLink,
    ToolbarComponent,
    ProfileFormComponent,
    TranslateModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;
  email = '';
  currentSubscription: Subscription | null = null;
  isEditingProfile = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadUserEmail();
    this.loadSubscriptionStatus();
  }

  loadProfile(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.profileService.getMyProfile(token).subscribe({
      next: (profileData) => {
        this.isLoading = false;
        this.profile = new Profile(
          profileData.id,
          profileData.fullName,
          profileData.streetAddress,
          profileData.phoneNumber
        );
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading profile:', error);
        this.errorMessage = 'Error al cargar el perfil';
      }
    });
  }

  loadUserEmail(): void {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('userId');
    if (!uid || !token) return;

    this.userService.getUserById(uid, token).subscribe({
      next: (user) => {
        this.email = user.email;
      },
      error: (error) => {
        console.error('Error loading user email:', error);
      }
    });
  }

  loadSubscriptionStatus(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.subscriptionService.getMySubscription(token).subscribe({
      next: (response) => {
        if (response.isPremium && response.subscription) {
          const subData = response.subscription;
          // ✅ CORREGIR: Usar constructor con parámetros opcionales
          this.currentSubscription = new Subscription(
            subData.id,
            subData.uid,
            subData.subscriptionId,
            subData.planType as SubscriptionPlanType,
            subData.status as SubscriptionStatus,
            new Date(subData.startDate),
            subData.endDate ? new Date(subData.endDate) : undefined,
            subData.cancelledAt ? new Date(subData.cancelledAt) : undefined
          );
        }
      },
      error: (error) => {
        console.error('Error loading subscription status:', error);
      }
    });
  }

  get isPremiumUser(): boolean {
    return this.currentSubscription?.isPremium ?? false;
  }

  enableProfileEditing(): void {
    this.isEditingProfile = true;
  }

  cancelEditing(): void {
    this.isEditingProfile = false;
    this.loadProfile();
  }

  updateProfile(request: UpdateProfileRequest): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.isLoading = true;
    this.profileService.updateProfile(request, token).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.updated) {
          this.isEditingProfile = false;
          this.loadProfile();
          this.errorMessage = '';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error updating profile:', error);
        this.errorMessage = 'Error al actualizar el perfil';
      }
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordDialogComponent);
  }

  openDeleteAccountDialog(): void {
    this.dialog.open(DeleteAccountDialogComponent);
  }
}
