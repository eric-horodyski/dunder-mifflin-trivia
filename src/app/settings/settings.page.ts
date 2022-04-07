import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../core/authentication.service';
import { ScoreService } from '../core/score.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private nav: NavController,
    private settings: ScoreService
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
