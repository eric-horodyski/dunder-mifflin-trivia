import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core/authentication.service';
import { SessionVaultService } from '../core/session-vault.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  rememberMe: Observable<boolean>;

  constructor(
    private auth: AuthenticationService,
    private nav: NavController,
    private sessionVault: SessionVaultService
  ) {}

  async ngOnInit(): Promise<void> {
    this.rememberMe = this.sessionVault.rememberMe$;
  }

  async login() {
    await this.auth.login();
    this.nav.navigateRoot(['/tabs']);
  }
}
