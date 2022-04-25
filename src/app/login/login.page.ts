import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    private auth: AuthenticationService,
    private nav: NavController
  ) {}

  async ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  async login() {
    await this.auth.login();
    this.nav.navigateRoot(['/tabs']);
  }
}
