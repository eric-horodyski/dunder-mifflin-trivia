import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  score = 0;
  private scoreKey = 'score';

  constructor() {}

  async loadScore(): Promise<void> {
    const { value } = await Storage.get({ key: this.scoreKey });
    const score = parseInt(value || '0', 10);
    this.score = score;
  }

  async incrementScore(): Promise<void> {
    this.score++;
    await Storage.set({ key: this.scoreKey, value: this.score.toString() });
  }

  async clearScore(): Promise<void> {
    await Storage.set({ key: this.scoreKey, value: '0' });
    this.score = 0;
  }
}
