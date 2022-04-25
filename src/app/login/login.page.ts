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
    private nav: NavController,
    private sessionVault: SessionVaultService
  ) {}

  async ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.canBeRemembered = await this.sessionVault.isHardwareSecurityEnabled();
  }

  async login() {
    await this.auth.login();
    this.nav.navigateRoot(['/tabs']);
  }
}
