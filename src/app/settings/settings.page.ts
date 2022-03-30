import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../core/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(private settings: SettingsService) {}

  ngOnInit() {}

  async clearScore() {
    await this.settings.clearScore();
  }
}
