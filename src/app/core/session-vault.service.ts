import { Injectable } from '@angular/core';
import {
  BrowserVault,
  IdentityVaultConfig,
  Vault,
  VaultType,
} from '@ionic-enterprise/identity-vault';
import { isPlatform, NavController } from '@ionic/angular';

const config: IdentityVaultConfig = {
  key: 'dunder.mifflin.trivia.session',
  type: VaultType.InMemory,
  lockAfterBackgrounded: 5000,
  shouldClearVaultAfterTooManyFailedAttempts: true,
};

@Injectable({ providedIn: 'root' })
export class SessionVaultService {
  vault: Vault | BrowserVault;

  constructor(private nav: NavController) {
    this.vault = isPlatform('capacitor')
      ? new Vault(config)
      : new BrowserVault(config);
    this.initializeVault();
  }

  private async initializeVault(): Promise<void> {
    this.vault.onLock(() => this.nav.navigateRoot(['/login']));
  }
}
