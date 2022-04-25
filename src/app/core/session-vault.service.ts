/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import {
  BrowserVault,
  IdentityVaultConfig,
  Vault,
  VaultType,
} from '@ionic-enterprise/identity-vault';
import { isPlatform, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';

const config: IdentityVaultConfig = {
  key: 'dunder.mifflin.trivia.session',
  type: VaultType.InMemory,
  lockAfterBackgrounded: 5000,
  shouldClearVaultAfterTooManyFailedAttempts: true,
};

@Injectable({ providedIn: 'root' })
export class SessionVaultService {
  private rememberMe: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private rememberMeKey = 'remember-me';

  vault: Vault | BrowserVault;
  rememberMe$ = this.rememberMe.asObservable();

  constructor(private nav: NavController) {
    this.vault = isPlatform('capacitor')
      ? new Vault(config)
      : new BrowserVault(config);
    this.initializeVaultEvents();
  }

  private async initializeVaultEvents(): Promise<void> {
    this.vault.onLock(() => this.nav.navigateRoot(['/login']));
  }
}
