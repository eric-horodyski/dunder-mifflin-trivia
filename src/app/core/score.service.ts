import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  score = 0;

  constructor(private auth: AuthenticationService) {}

  async getScoreKey(): Promise<string> {
    const email = await this.auth.getUsername();
    return `${email}-score`;
  }

  async loadScore(): Promise<void> {
    const scoreKey = await this.getScoreKey();
    const { value } = await Storage.get({ key: scoreKey });
    const score = parseInt(value || '0', 10);
    this.score = score;
  }

  async incrementScore(): Promise<void> {
    const scoreKey = await this.getScoreKey();
    this.score++;
    await Storage.set({ key: scoreKey, value: this.score.toString() });
  }

  async clearScore(): Promise<void> {
    const scoreKey = await this.getScoreKey();
    await Storage.set({ key: scoreKey, value: '0' });
    this.score = 0;
  }
}
