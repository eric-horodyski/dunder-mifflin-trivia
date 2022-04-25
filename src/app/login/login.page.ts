import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  rememberMe: Observable<boolean>;

  constructor(
    private auth: AuthenticationService,
    private nav: NavController
  ) {}

  async login() {
    await this.auth.login();
    this.nav.navigateRoot(['/tabs']);
  }
}
