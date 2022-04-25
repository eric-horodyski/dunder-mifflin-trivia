import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../core/authentication.service';
import { SessionVaultService } from '../core/session-vault.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  canBeRemembered: boolean;

  constructor(
    private auth: AuthenticationService,
    private nav: NavController
  ) {}

  async ionViewDidEnter() {
    const isAuthenticated = await this.auth.isAuthenticated();
    if (isAuthenticated) {
      this.nav.navigateRoot(['/tabs']);
    }
  }

  async login() {
    await this.auth.login();
    this.nav.navigateRoot(['/tabs']);
  }
}
