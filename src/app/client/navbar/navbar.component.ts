import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'kt-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  user: User;

  isLoggingOut: boolean;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getActiveUser();
  }

  async logout() {
    if (this.isLoggingOut) return;
    
    this.isLoggingOut = true;
    await this.authService.logout();
    this.isLoggingOut =false;
  }

  private getActiveUser() {
    this.authService.user$.subscribe(user => this.user = user);
  }
}
