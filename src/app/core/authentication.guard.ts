import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private nav: NavController
  ) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.auth.isAuthenticated();
    if (isAuthenticated) {
      return true;
    } else {
      this.nav.navigateRoot(['/login']);
      return false;
    }
  }
}
