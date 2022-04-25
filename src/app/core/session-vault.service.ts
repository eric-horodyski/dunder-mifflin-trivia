import { Injectable, NgZone } from '@angular/core';
import {
  BrowserVault,
  Device,
  DeviceSecurityType,
  IdentityVaultConfig,
  Vault,
  VaultType,
} from '@ionic-enterprise/identity-vault';
import { isPlatform, NavController } from '@ionic/angular';

const config: IdentityVaultConfig = {
  key: 'dunder.mifflin.trivia',
  type: VaultType.DeviceSecurity,
  deviceSecurityType: DeviceSecurityType.Both,
  unlockVaultOnLoad: false,
  lockAfterBackgrounded: 5000,
  shouldClearVaultAfterTooManyFailedAttempts: true,
};

@Injectable({ providedIn: 'root' })
export class SessionVaultService {
  vault: Vault | BrowserVault;

  constructor(private nav: NavController, private ngZone: NgZone) {
    this.vault = isPlatform('capacitor')
      ? new Vault(config)
      : new BrowserVault(config);
    this.initializeVault();
  }

  private async initializeVault(): Promise<void> {
    this.vault.onLock(() =>
      this.ngZone.run(() => this.nav.navigateRoot(['/login']))
    );
  }
}
