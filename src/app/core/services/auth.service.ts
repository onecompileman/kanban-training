import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserInfo } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserDataService } from '../data-services/user.data-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private auth: AngularFireAuth,
    private userDataService: UserDataService,
    private router: Router
  ) {}

  getActiveUser(user: UserInfo): Observable<User> {
    return new Observable<User>((observer) => {
      this.userDataService
        .getAllUser(null, { email: user.email })
        .subscribe((users: User[]) => {
          if (users.length) {
            observer.next(users[0]);
            observer.complete();
          } else {
            const userToCreate: User = {
              authId: user.uid,
              email: user.email,
              imageURL: user.photoURL,
              name: user.displayName,
            };
            this.userDataService
              .createUser(userToCreate)
              .subscribe((user: User) => {
                observer.next(user);
                observer.complete();
              });
          }
        });
    }).pipe(
      tap((user: User) => {
        this.user$.next(user);
      })
    );
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.user$.next(null);
    this.router.navigate(['/login']);
  }
}
