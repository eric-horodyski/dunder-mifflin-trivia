/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import {
  BrowserVault,
  DeviceSecurityType,
  IdentityVaultConfig,
  Vault,
  VaultType,
} from '@ionic-enterprise/identity-vault';
import { isPlatform, NavController } from '@ionic/angular';

const createVault = (config: IdentityVaultConfig): BrowserVault | Vault =>
  isPlatform('capacitor') ? new Vault(config) : new BrowserVault(config);

@Injectable({ providedIn: 'root' })
export class SessionVaultService {
  vault: Vault | BrowserVault;
  private _rememberMe = false;

  constructor(private nav: NavController) {
    this.vault = createVault({
      key: 'me.horodyski.dmt.session',
      type: VaultType.InMemory,
      lockAfterBackgrounded: 5000,
      shouldClearVaultAfterTooManyFailedAttempts: true,
      unlockVaultOnLoad: false,
    });

    this.vault.onLock(() => this.nav.navigateRoot(['/login']));

    this._rememberMe = this.vault.config.type === VaultType.DeviceSecurity;
  }

  public get rememberMe() {
    return this._rememberMe;
  }

  async canUnlock(): Promise<boolean> {
    if (!(await this.vault.isEmpty()) && (await this.vault.isLocked())) {
      return true;
    }
    return false;
  }

  async toggleRememberMe(): Promise<void> {
    if (this.rememberMe) {
      this.vault.updateConfig({
        type: VaultType.InMemory,
        deviceSecurityType: DeviceSecurityType.None,
        ...this.vault.config,
      });
      this._rememberMe = false;
    } else {
      this.vault.updateConfig({
        type: VaultType.DeviceSecurity,
        deviceSecurityType: DeviceSecurityType.Both,
        ...this.vault.config,
      });
      this._rememberMe = true;
    }
  }
}
