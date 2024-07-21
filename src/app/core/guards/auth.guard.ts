import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuardResult> {
    return new Observable((observer) => {
      this.auth.authState.pipe(take(1)).subscribe((user) => {
        if (user) {
          this.authService.getActiveUser(user).subscribe((user) => {
            observer.next(true);
            observer.complete();
          });
        } else {
          this.router.navigate(['/login']);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
