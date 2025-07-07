import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { map, take, switchMap, catchError } from 'rxjs';
import { of } from 'rxjs';
import {ProfileService} from '../../profiles/services/profile.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const profileService = inject(ProfileService);
  const router = inject(Router);

  return authService.isSignedIn.pipe(
    take(1),
    switchMap(isSignedIn => {
      if (!isSignedIn) {
        router.navigate(['/login']);
        return of(false);
      }

      // If user is signed in, check if they have a profile
      const token = localStorage.getItem('token');
      if (!token) {
        router.navigate(['/login']);
        return of(false);
      }

      return profileService.hasProfile(token).pipe(
        map(response => {
          if (!response.hasProfile) {
            // User doesn't have a profile, redirect to create profile
            router.navigate(['/create-profile']);
            return false;
          }
          return true;
        }),
        catchError(() => {
          // If there's an error checking profile, still allow access
          // This could be improved with better error handling
          return of(true);
        })
      );
    })
  );
};

// For routes that shouldn't check profile (like create-profile itself)
export const simpleAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.isSignedIn.pipe(
    take(1),
    map(isSignedIn => {
      if (isSignedIn) return true;
      else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
