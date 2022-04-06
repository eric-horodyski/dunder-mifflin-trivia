import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../core/authentication.service';
import { SettingsService } from '../core/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private nav: NavController,
    private settings: SettingsService
  ) {}

  ngOnInit() {}

  async clearScore() {
    await this.settings.clearScore();
  }

  async logout() {
    await this.auth.logout();
    this.nav.navigateRoot(['/login']);
  }
}
