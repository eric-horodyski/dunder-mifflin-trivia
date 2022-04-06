import { Injectable } from '@angular/core';
import { IonicAuth } from '@ionic-enterprise/auth';
import { isPlatform } from '@ionic/angular';
import { environment as env } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends IonicAuth {
  constructor() {
    const platform = isPlatform('capacitor') ? 'capacitor' : 'web';
    const host = isPlatform('capacitor') ? env.hosts.app : env.hosts.web;
    super({
      ...env.auth,
      platform,
      redirectUri: `${host}login`,
      logoutUrl: `${host}login`,
    });
  }

  async getUsername(): Promise<string> {
    const token = await super.getIdToken();
    return token.email;
  }
}
