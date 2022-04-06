import { IonicAuthOptions } from '@ionic-enterprise/auth';

export interface Environment {
  production: boolean;
  apiBaseUrl: string;
  hosts: {
    web: string;
    app: string;
  };
  auth: IonicAuthOptions;
}
